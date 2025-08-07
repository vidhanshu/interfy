import { userResolvers } from "@/graphql/modules/user/user.resolvers";
import { mergeResolvers } from "@graphql-tools/merge";
import { userTypeDefs } from "./modules/user/user.typeDefs";
import { companyTypeDefs } from "./modules/company/company.typeDefs";
import { companyResolvers } from "./modules/company/company.resolvers";
import { graphqlTypeDefs } from "./graphql.typeDefs";

export const typeDefs = [graphqlTypeDefs, userTypeDefs, companyTypeDefs];
export const resolvers = mergeResolvers([userResolvers, companyResolvers]);
