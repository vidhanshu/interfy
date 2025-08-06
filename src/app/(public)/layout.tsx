import NavBar from "@/components/common/nav-bar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

const PublicLayout = async ({ children }: PropsWithChildren) => {
  const session = await getServerSession();

  if (session) return redirect("/");
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};

export default PublicLayout;
