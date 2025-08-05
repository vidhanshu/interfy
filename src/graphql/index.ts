import { userResolvers } from "@/graphql/modules/user/user.resolvers";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { userTypeDefs } from "./modules/user/user.typeDefs";

export const typeDefs = mergeTypeDefs([userTypeDefs]);
export const resolvers = mergeResolvers([userResolvers]);
