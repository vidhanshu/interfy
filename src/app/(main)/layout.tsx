import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";
import NavBar from "@/components/common/nav-bar";

const MainLayout = async ({ children }: PropsWithChildren) => {
  const session = await getServerSession();

  if (!session?.user) return redirect("/landing");

  return (
    <div className="min-h-screen">
      <NavBar />
      <main className="pt-0">{children}</main>
    </div>
  );
};

export default MainLayout;
