const gql = require("graphql-tag");

module.exports = gql`
  type Merchant {
    id: ID!
    username: String!
    createdAt: String!
    contact: String!
    address: String!
  }
  input RegisterInput {
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    createdAt: String!
    token: String!
  }

  type Query {
    getMerchants: [Merchant]!
    getMerchant(merchantId: ID!): Merchant
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
  }
`;
