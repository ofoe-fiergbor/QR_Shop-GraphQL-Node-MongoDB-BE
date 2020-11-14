const gql = require("graphql-tag");

module.exports = gql`
  type Merchant {
    id: ID!
    username: String!
    createdAt: String!
    name:String!
    email: String!
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
    createMerchant(name:String! address:String!): Merchant!
    deleteMerchant(merchantId:ID!): String!
    updateMerchant(name:String! address:String! merchantId:ID!): Merchant!
  }
`;
