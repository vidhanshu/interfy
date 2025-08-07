"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { User } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const UserProfileLink = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex gap-x-2">
        <Skeleton className="size-10 rounded-full" />
        <div className="flex flex-col gap-2">
          <Skeleton className="w-16 h-4" />
          <Skeleton className="w-22 h-4" />
        </div>
      </div>
    );
  }
  return (
    <Link href="/profile">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
          <User className="h-5 w-5 text-white" />
        </div>
        <div className="hidden md:block">
          <p
            className="text-sm font-medium text-gray-900 max-w-32 truncate"
            title={session?.user.name || session?.user.email}
          >
            {session?.user.name || session?.user.email}
          </p>
          <p
            className="text-xs text-gray-500 truncate max-w-32"
            title={session?.user.email}
          >
            {session?.user.email}
          </p>
        </div>
      </div>
    </Link>
  );
};

const NavBar = () => {
  const { data: session, status } = useSession();

  return (
    <nav className="bg-background shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl px-4 mx-auto">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link
              href={session ? "/" : "/landing"}
              className="flex items-center space-x-3"
            >
              <Image
                src="/logo.svg"
                width={134}
                height={40}
                alt="logo"
                className="mx-auto"
              />
            </Link>
          </div>
          {status === "loading" || status === "authenticated" ? (
            <UserProfileLink />
          ) : (
            <div className="flex items-center space-x-4">
              <Link href="/auth/sign-in">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/auth/sign-up">
                <Button>Get Started</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
