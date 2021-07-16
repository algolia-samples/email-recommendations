# Email recommendations

This sample app shows how to leverage Algolia Search and Algolia Recommend to display product recommendations in emails.
Showing recommendations is a great way to engage your customers at various stages of their journey before and after visiting your site.

This sample app comes with the following recommendation models:

- A customer browsed in a category: recommend **best rated** products from that category. This recommendation model uses Algolia's [Faceting](/doc/guides/managing-results/refine-results/faceting/) feature.
- A customer just bought a product: recommend products that are **frequently bought together**. This recommendation model uses [Algolia Recommend](/doc/guides/algolia-ai/recommend/) to train a machine-learning algorithm based on which products users often buy together.
- A customer just bought a product: recommend **related products**. This model also leverages Algolia Recommend to train a machine-learning algorithm to find products that similar.
- A customer has an existing user profile: recommend products that match their _affinities_. This model uses Algolia Recommend and [Personalization](/doc/guides/personalization/what-is-personalization/).

## Features

This sample app comes with the following features:

- A rock-solid base email template with [Cerberus](https://tedgoas.github.io/Cerberus/)
- A rich and powerful templating language with [Nunjucks](https://mozilla.github.io/nunjucks/)
- Three different email templates for different moments of the customer's journey (pre-order, post-order, re-engagement)
- Four different models for recommended products with Algolia Recommend and faceting

## Demo (Try it yourself!)

[Run the demo](https://d8nd8.sse.codesandbox.io/)

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

### 6. Follow the instructions in the server directory

The server directory has a file with instructions:

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
- [kai687](https://github.com/kai687)
