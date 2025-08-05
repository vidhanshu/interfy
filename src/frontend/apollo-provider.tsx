"use client";

import { makeApolloClient } from "@/lib/apollo-client";
import { ApolloProvider } from "@apollo/client";
import { ReactNode } from "react";

const client = makeApolloClient();

export function ApolloWrapper({ children }: { children: ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
