import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = new HttpLink({
  uri: "/api/graphql", // relative path (works client & server)
  credentials: "include", // send cookies with every request
});

// Optional: attach auth header if needed
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      // Example: Authorization: `Bearer ${token}`,
    },
  };
});

export const makeApolloClient = () =>
  new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
