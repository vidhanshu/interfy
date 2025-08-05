import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

const MainLayout = async ({ children }: PropsWithChildren) => {
  const session = await getServerSession();

  if (!session?.user) return redirect("/auth/sign-in");
  return children;
};

export default MainLayout;
