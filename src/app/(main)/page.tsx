"use client";

import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="space-y-4">
      <pre>{JSON.stringify(session, null, 2)}</pre>

      <div className="space-x-4">
        {!session?.user && (
          <Button onClick={() => signIn("credentials")}>Login</Button>
        )}
        <Button
          onClick={() =>
            signOut({
              callbackUrl: "/auth/sign-in",
            })
          }
        >
          LogOut
        </Button>
      </div>
    </div>
  );
}
