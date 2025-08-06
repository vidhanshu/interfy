import { hashPassword } from "@/lib/auth";
import { Resolvers } from "@/types/generated/graphql";
import { GraphQLError } from "graphql";

export const userResolvers: Resolvers = {
  Query: {
    me: async (_, __, ctx) => {
      if (!ctx.session?.user?.id) return null;
      return ctx.prisma.user.findUnique({
        where: { id: ctx.session.user.id },
      });
    },
  },
  Mutation: {
    createUser: async (_, args, ctx) => {
      const { email, password } = args;
      const doesExists = await ctx.prisma.user.findUnique({ where: { email } });
      if (doesExists) throw new GraphQLError("User with email already exists");
      const hash = await hashPassword(password);
      const user = await ctx.prisma.user.create({ data: { email, hash } });
      return user;
    },
    updateUser: async (_, args, ctx) => {
      const id = ctx.session?.user.id;
      if (!id) throw new GraphQLError("Unauthorized");

      const { email, name } = args;
      const data: any = {};
      if (email) data.email = email;
      if (name) data.name = name;

      if (Object.keys(data).length === 0)
        throw new GraphQLError(
          "At least one of email, name field should be supplied"
        );

      if (email) {
        const doesExists = await ctx.prisma.user.findUnique({
          where: { email },
        });
        if (doesExists)
          throw new GraphQLError("User with email already exists");
      }

      return ctx.prisma.user.update({ where: { id }, data });
    },
    deleteUser: async (_, __, ctx) => {
      const id = ctx.session?.user.id;
      if (!id) throw new GraphQLError("Unauthorized");

      await ctx.prisma.user.delete({ where: { id } });
      return true;
    },
  },
};
