const email = {
  name: "Pre-order: Content based recommendations (best rated)",
  template: "pre_order.html",
  title: "Recommended for you.",
  intro: "We have new recommendations based on your navigation history.",
  recommendations: [
    async (algoliaIndex, _) => {
      // The customer browsed the Men / Tee-shirt category
      const facetFilters = ["category:Men - T-Shirts"];
      // Get the top-rated products from the category
      const { hits } = await algoliaIndex.search("", { facetFilters, hitsPerPage: 6 });
      return {
        label: "Best rated products in the \"Men tee-shirts\" category",
        hits,
      }
    }
  ]
}

export { email };
