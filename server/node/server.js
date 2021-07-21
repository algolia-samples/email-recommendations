
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

import dotenv from "dotenv"
import express from "express";
import nunjucks from "nunjucks";
import showdown from "showdown";
import sendgrid from "@sendgrid/mail";

import algoliaearch from "algoliasearch";
import algoliarecommend from "@algolia/recommend";

import sendEmail from "./sendgrid.js";

// Load env variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envFilePath = path.resolve(__dirname, './.env');
dotenv.config({ path: envFilePath });

// Setup Express, markdown renderer and Algolia clients.
const app = express();
const converter = new showdown.Converter();
const algoliaClient = algoliaearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY)
const recommendClient = algoliarecommend(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY);
const algoliaIndex = algoliaClient.initIndex(process.env.ALGOLIA_INDEX_NAME);

// Setup email delivery
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

// Email templates rendering engine
// https://mozilla.github.io/nunjucks/
nunjucks.configure('templates', {
    autoescape: true,
    express: app
});

app.use(express.static(process.env.STATIC_DIR));
app.use(express.json());

const loadEmails = async () => {
    const EmailBaseDir = "./emails";
    const emailDirs = await fs.promises.readdir(EmailBaseDir);
    const emails = [];
    for(const emailDir of emailDirs) {
        const emailDirPath = path.join(EmailBaseDir, emailDir);
        const explanationFile = await fs.promises.readFile(path.join(emailDirPath, "README.md"), "utf8");
        const explanation = converter.makeHtml(explanationFile);
        const { email } = await import(`./${path.join(emailDirPath, "email.js")}`);
        emails.push({
            ...email,
            explanation,
        });
    };
    return emails;
};

const renderEmail = async (email) => {
    // Load all products recommendations to populate the email template.
    const recommendations = await Promise.all(
        email.recommendations.map(f => f(algoliaIndex, recommendClient))
    );
    return nunjucks.render(email.template, {
        ...email,
        recommendations: recommendations,
    });
}


// Home page
app.get("/", (req, res) => {
    const indexPath = path.resolve(process.env.STATIC_DIR + "/index.html");
    res.sendFile(indexPath);
});

// List of the available emails
app.get("/emails", async (req, res) => {
    const emails = await loadEmails();
    const emailTemplates = emails.map(email => {
        return {
            ...email,
            recommendations: null
        }
    });
    res.json(emailTemplates);
});

// Render a given email, identified by his index
app.get("/render/:emailIndex", async (req, res) => {
    const { emailIndex } = req.params;
    const emails = await loadEmails();
    const email = emails[emailIndex];
    const renderedEmail = await renderEmail(email);

    res.json({
        'explanation': email.explanation,
        'html': renderedEmail
    });
});

// Send a given email, identified by its index
app.post("/send/:emailIndex", async (req, res) => {
    const { emailIndex } = req.params;
    const emails = await loadEmails();
    const email = emails[emailIndex];
    const renderedEmail = await renderEmail(email);

    const { toEmail } = req.body;
    await sendEmail(toEmail, email.title, "test", renderedEmail);
    
    res.status(200);
});

app.listen(4242, () => console.log(`Node server listening on port ${4242}!`));
