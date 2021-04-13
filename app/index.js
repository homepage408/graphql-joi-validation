const express = require("express");
const port = process.env.PORT || 3000;
const { ApolloServer, AuthenticationError } = require("apollo-server-express");
const { typeDefs } = require("./schema/user");
const { resolvers } = require("./resolvers/user");
const db = require("./db/models");
const router = express.Router();
const app = express();

app.use(express.json());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // const auth = req.headers.authorization;
    // if (!auth) throw new AuthenticationError("You must be logged in");
    // const result = verifyJwt(auth);
    // db.payload = {
    //   result: result,
    // };
    return {
      db,
    };
  },
  playground: {
    settings: {
      "editor.theme": "dark",
    },
  },
  introspection: true,
});
server.applyMiddleware({ app });

app.get("/", (req, res) => {
  return res.json({
    message: `Welcome to Graphql Joi Validation`,
  });
});

app.listen(port, () => {
  console.log(`Server started on port http://localhost:${port}`);
});
