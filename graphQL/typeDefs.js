const gql = require("graphql-tag");

module.exports = gql`
  type Merchant {
    id: ID!
    username: String!
    createdAt: String
    contact: String
    address: String
  }
  type Query {
    getMerchants: [Merchant]!
    getMerchant(merchantId: ID!): Merchant
  }
`;
