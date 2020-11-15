const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const { MONGODB } = require("./config");

const typeDefs = require("./graphQL/typeDefs");
const resolvers = require("./graphQL/resolvers");

const PORT = process.env.PORT || 5000;

const server = new ApolloServer({
  cors:true,
  resolvers,
  typeDefs,
  context:({req})=> ({req}),

});

mongoose
  .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected!");
    return server.listen({ port: PORT });
  })
  .then((res) => console.log(`Server running at ${res.url}`))
  .catch((err) => console.log(err));
