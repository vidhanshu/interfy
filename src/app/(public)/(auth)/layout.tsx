import Image from "next/image";
import Link from "next/link";
import React, { PropsWithChildren } from "react";

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-[calc(100vh-70px)] flex items-center justify-center bg-primary/5 p-4">
      <div className="w-full max-w-md space-y-4">
        <div>
          <Link href="/landing">
            <Image
              src="/logo.svg"
              width={172}
              height={50}
              alt="logo"
              className="mx-auto"
            />
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
