import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function createContext({ req, res }: any) {
  const session = await getServerSession(req, res, authOptions);
  return { prisma, session };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
