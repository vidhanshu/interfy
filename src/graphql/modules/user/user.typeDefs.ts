import gql from "graphql-tag";

export const userTypeDefs = gql`
  scalar DateTime

  type User {
    id: ID!
    name: String
    email: String!
    createdAt: DateTime
    updatedAt: DateTime
  }

  type Query {
    me: User
  }

  type Mutation {
    createUser(email: String!, password: String!): User
  }
`;
