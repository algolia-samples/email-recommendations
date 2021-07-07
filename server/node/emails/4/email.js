import fetch from "node-fetch";

const email = {
  name: "Re-engagement: Personalization based recommendations",
  template: "pre_order.html",
  title: "We miss you.",
  intro: "Here are some products we think you might like.",
  recommendations: [
    async (algoliaIndex, recommendClient) => {
      // Get the customer's affinities profile
      // https://www.algolia.com/doc/rest-api/personalization/#get-a-usertoken-profile
      const userToken = 'anonymous-ad05f6ef-3c8f-466f-bdb1-f9ef40f5f473';
      const res = await fetch(
        `https://recommendation.eu.algolia.com/1/profiles/personalization/${userToken}`,
        {
          headers: {
            "X-Algolia-API-Key": process.env.ALGOLIA_RECOMMENDATION_API_KEY,
            "X-Algolia-Application-Id": process.env.ALGOLIA_APP_ID
          }
        }
      );
      const { scores } = await res.json();
      // Transform the top customer affinities into a list of `facetFilters`
      let facetFilters = [];
      for (const key in scores) {
        const score = scores[key];
        let values = [];
        for (const valueKey in score) {
          values.push([ valueKey, score[valueKey] ]);
        };
        values.sort((kv1, kv2) => kv2[1] - kv1[1]);
        facetFilters.push(`${[key]}:${values[0][0]}`);
      };
      // Get the top-rated products matching the top-scoring customer profile facets
      const { hits: [topHit,] } = await algoliaIndex.search("", { facetFilters, hitsPerPage: 6 });
      // Get the related items matching the top-reated product
      const { results: [ { hits }, ]} = await recommendClient.getRecommendations([{
        indexName: process.env.ALGOLIA_INDEX_NAME,
        objectID: topHit.objectID,
        model: "related-products",
        maxRecommendations: 3
      }]);
      return {
        label: "Recommended just for you",
        hits,
      }
    }
  ]
}

export { email };
