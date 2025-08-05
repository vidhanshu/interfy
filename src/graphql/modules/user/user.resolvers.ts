import { hashPassword } from "@/lib/auth";
import { Resolvers } from "@/types/generated/graphql";
import { GraphQLError } from "graphql";

export const userResolvers: Resolvers = {
  Query: {
    me: async (_, __, ctx) => {
      console.log(ctx.session);
      if (!ctx.session?.user?.email) return null;
      return ctx.prisma.user.findUnique({
        where: { email: ctx.session.user.email },
      });
    },
  },
  Mutation: {
    createUser: async (_, args, ctx) => {
      console.log("[reached here]", args);
      const { email, password } = args;
      const doesExists = await ctx.prisma.user.findUnique({ where: { email } });
      if (doesExists) throw new GraphQLError("User with email already exists");
      const hash = await hashPassword(password);
      const user = await ctx.prisma.user.create({ data: { email, hash } });
      return user;
    },
  },
};
