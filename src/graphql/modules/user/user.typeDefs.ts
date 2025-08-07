import gql from "graphql-tag";

export const userTypeDefs = gql`
  type User {
    id: ID!
    name: String
    email: String!
    createdAt: DateTime
    updatedAt: DateTime
  }

  extend type Query {
    me: User
  }

  extend type Mutation {
    createUser(email: String!, password: String!): User
    updateUser(name: String, email: String): User
    deleteUser: Boolean
  }
`;
