import gql from "graphql-tag";

export const companyTypeDefs = gql`
  type Company {
    id: String!
    name: String!
    website: String
    industry: String
    size: String
    description: String
    verified: Boolean!
    hq: String
    mission: String
    foundedIn: DateTime
    createdBy: User!
    createdById: String!
    createdAt: DateTime
    updatedAt: DateTime
  }

  extend type Mutation {
    createCompany(input: CreateCompanyInput!): Company!
  }

  extend type Query {
    company(id: String!): Company
    companies(
      page: Int = 1
      limit: Int = 10
      search: String
    ): PaginatedCompanies!
  }

  input CreateCompanyInput {
    name: String!
    website: String
    industry: String
    size: String
    description: String
    hq: String
    mission: String
    foundedIn: DateTime!
  }

  type PaginatedCompanies {
    companies: [Company!]!
    total: Int!
    page: Int!
    limit: Int!
  }
`;
