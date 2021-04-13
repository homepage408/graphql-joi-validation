const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    findAllUser: [User]
  }

  type User {
    fullname: String
    username: String
    email: String
    password: String
    salt: String
    role: String
  }

  type Mutation {
    createUser(
      fullname: String
      username: String
      email: String
      password: String
      role: String
    ): User
  }
`;
module.exports = {
  typeDefs,
};
