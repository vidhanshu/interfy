import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React, { PropsWithChildren } from "react";

const AuthLayout = async ({ children }: PropsWithChildren) => {
  const session = await getServerSession();

  if (session) return redirect("/");
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      {children}
    </div>
  );
};

export default AuthLayout;
