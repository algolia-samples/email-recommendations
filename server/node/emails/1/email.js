const email = {
  name: "Post-order: ML based recommendations (FBT model)",
  template: "post_order.html",
  title: "Thank you for your order.",
  intro: `We will let you know by e-mail when the items of your order are dispatched.
  You can track the status of your order or change it in Your Orders`,
  recommendations: [
    async (_, recommendClient) => {
      // The customer just bought a women jean.
      const orderContent = ["D04445-2757-6370"];
      // Get the similar items for this item.
      const { results: [ { hits }, ]} = await recommendClient.getRecommendations([{
        indexName: process.env.ALGOLIA_INDEX_NAME,
        objectID: orderContent[0],
        model: "bought-together",
        maxRecommendations: 3,
      }]);
      return {
        label: "Customers who bought items from your order also bought",
        hits
      }
    }
  ]
};

export { email };