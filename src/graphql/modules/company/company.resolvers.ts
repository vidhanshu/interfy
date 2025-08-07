import { Resolvers } from "@/types/generated/graphql";
import { Prisma } from "@prisma/client";
import { GraphQLError } from "graphql";

export const companyResolvers: Resolvers = {
  Query: {
    company: (_, args, ctx) => {
      return ctx.prisma.company.findUnique({
        where: { id: args.id },
        include: { createdBy: true },
      });
    },
    companies: async (_, args, ctx) => {
      const { limit = 10, page = 1, search } = args;
      const skip = (page - 1) * limit;

      const where: Prisma.CompanyWhereInput = {};

      if (search) {
        where.name = { contains: search, mode: "insensitive" };
      }

      const [companies, total] = await Promise.all([
        ctx.prisma.company.findMany({
          where,
          skip,
          take: limit,
          include: { createdBy: true },
          orderBy: {
            createdAt: "desc",
          },
        }),
        ctx.prisma.company.count(),
      ]);

      return {
        companies: companies,
        limit,
        page,
        total,
      };
    },
  },
  Mutation: {
    createCompany: (_, args, ctx) => {
      if (!ctx.session?.user.id) throw new GraphQLError("Unauthorized");

      const { input } = args;
      const {
        foundedIn,
        name,
        size,
        description,
        hq,
        industry,
        mission,
        website,
      } = input;

      return ctx.prisma.company.create({
        data: {
          foundedIn,
          name,
          createdById: ctx.session?.user.id,
          size,
          description,
          hq,
          industry: industry ?? "other",
          mission,
          website,
        },
        include: { createdBy: true },
      });
    },
  },
};
