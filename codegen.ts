import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    "src/graphql/**/*.typeDefs.ts", // parse gql from TS
  ],
  documents: "src/frontend/gql/**/*.{gql,graphql}",
  generates: {
    "src/types/generated/graphql.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        contextType: "@/graphql/context#Context",
      },
    },
    "src/frontend/gql/generated.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: { withHooks: true },
    },
  },
  // This is the trick
  pluckConfig: {
    modules: [
      {
        name: "graphql-tag",
        identifier: "gql",
      },
    ],
  },
};

export default config;
