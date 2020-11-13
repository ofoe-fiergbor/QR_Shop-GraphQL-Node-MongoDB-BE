const gql = require("graphql-tag");

module.exports = gql`
  type Merchant {
    id: ID!
    username: String!
    createdAt: String!
    name:String!
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
    login(email:String! password:String!):User!
    createMerchant(name:String! contact:String! address:String!): Merchant!
  }
`;
