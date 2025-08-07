// src/app/api/graphql/route.ts
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServer } from "@apollo/server";
import { resolvers, typeDefs } from "@/graphql";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

const server = new ApolloServer({
  schema: makeExecutableSchema({
    typeDefs,
    resolvers,
  }),
});

export const GET = startServerAndCreateNextHandler(server, {
  context: async (req, res) => {
    const session = await getServerSession(authOptions);
    return { session, prisma };
  },
});

export const POST = GET;
