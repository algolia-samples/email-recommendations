# Emails recommendations

This sample app is showcasing various ways to implement recommendations in transactionnal emails, leveraging different Algolia products. 

## Features

This sample app uses the following features:

- Rock-solid base email template with [Cerberus](https://tedgoas.github.io/Cerberus/)
- A rich and powerful templating language with [Nunjucks](https://mozilla.github.io/nunjucks/)
- Three different kind of email templates, matching different moment of the customer's journey (pre-order, post-order, re-engagement).
- Various exemples of how to offer great recommendations, all leveraging Algolia!

## Demo (Try it yourself!)

[Access the demo](https://emails-recommendations.herokuapp.com/)

## How to run this sample app locally

This sample app implements one server in the following programming language:

- [Node.js/JavaScript](server/node)

The [client](client) is a single HTML page.

### 1. Clone this repository

```
git clone https://github.com/algolia-samples/email-recommendations
```

Copy the file `.env.example` to the directory of the server you want to use and rename it to `.env`. For example, to use the Node implementation:

```bash
cp .env.example server/node/.env
```

### 2. Set up Algolia

To use this sample app, you need an Algolia account. If you don't have one already, [create an account for free](https://www.algolia.com/users/sign-up). Note your [Application ID](https://deploy-preview-5789--algolia-docs.netlify.app/doc/guides/sending-and-managing-data/send-and-update-your-data/how-to/importing-with-the-api/#application-id).

In the `.env` file, set the environment variables `ALGOLIA_APP_ID`:

```bash
ALGOLIA_APP_ID=<replace-with-your-algolia-app-id>
```

### 3. Create your Algolia index and upload data

After you set up your Algolia account and Algolia application, [create and populate an index](https://www.algolia.com/doc/guides/sending-and-managing-data/prepare-your-data/).

To upload your data, you can use the [Algolia dashboard](https://www.algolia.com/doc/guides/sending-and-managing-data/send-and-update-your-data/how-to/importing-from-the-dashboard/) or use on of Algolia's [API clients](https://www.algolia.com/developers/#integrations).

After creating the index and uploading the data, set the environment variables `ALGOLIA_INDEX_NAME` and `ALGOLIA_API_KEY` in the `.env` file:

```bash
ALGOLIA_INDEX_NAME=<replace-with-your-algolia-index-name>
ALGOLIA_API_KEY=<replace-with-your-algolia-api-key>
```

### 4. (Optional) Configure an email sending provider

With this sample app, you can send the preview to your email address.
We provide a minimal working example with [SendGrid](https://sendgrid.com/) as email provider.

In order to use SendGrid, you need to set the environment variables `SENDGRID_API_KEY` and `SENDGRID_FROM_EMAIL` in the `.env` file:

```bash
SENDGRID_API_KEY=<replace-with-your-sendgrid-api-key>
SENDGRID_FROM_EMAIL=<replace-with-sendgrid-from-email>
```

### 5. Follow the instructions in the server directory

Each server directory has a file with instructions:

- [Node.js](server/node/README)

For example, to run the Node implementation of the server, follow these steps:

```bash
cd server/node # there's a README in this folder with instructions
npm install
npm start
```

## Contributing

This sample app is open source and welcomes contributions. All contributions are subject to our [Code of Conduct](https://github.com/algolia-samples/.github/blob/master/CODE_OF_CONDUCT.md).

## Authors

- [@cdenoix](https://twitter.com/cdenoix)
