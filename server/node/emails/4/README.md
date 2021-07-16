### Re-engagement personalization based recommendations

#### Customer Story 

The customer have a existing [user profile](https://www.algolia.com/doc/guides/personalization/personalizing-results/in-depth/configuring-personalization/#inspecting-user-affinity-profiles).

We send an email featuring some products matching the customer's affinities.

#### Recommendations recipe

1. Get the customer's affinities [using his user token](https://www.algolia.com/doc/rest-api/personalization/#get-a-usertoken-profile).
2. Get the top product matching best scoring customer's affinities.
3. Get the related products for the top product using Algolia Recommend.

#### Resources

<a href="https://github.com/algolia-samples/email-recommendations/tree/master/server/node/emails/4/email.js" target="_blank">Recommendations source code</a>

<a href="https://github.com/algolia-samples/email-recommendations/tree/master/server/node/templates/re-engagement.html" target="_blank">Email template</a>