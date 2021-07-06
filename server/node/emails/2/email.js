const email = {
  name: "Post-order: ML based recommendations (related model)",
  template: "post_order.html",
  title: "Thank you for your order.",
  intro: `We will let you know by e-mail when the items of your order are dispatched.
  You can track the status of your order or change it in Your Orders`,
  recommendations: [
    async (_, recommendClient) => {
      // The customer just bought a women jean.
      const orderContent = ["D04445-2757-6370"];
      // Get the related product for the bought product.
      const { results: [ { hits }, ]} = await recommendClient.getRecommendations([{
        indexName: process.env.ALGOLIA_INDEX_NAME,
        objectID: orderContent[0],
        model: "related-products",
        maxRecommendations: 3,
        fallbackParameters: {facetFilters:["category:Women - Jeans"]}
      }]);
      return {
        label: "Related products for your order",
        hits
      }
    }
  ]
};

export { email };