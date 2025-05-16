import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getToken } from "./api";

const httpLink = createHttpLink({
    uri: "http://127.0.0.1:8000" + "/graphql/",
    headers: {
        "Content-Type": "application/json",
    },
});

const authLink = setContext(async (_, { headers }) => {
    const token = await getToken();
    return {
        headers: {
            ...headers,
            Authorization: token ? `Bearer ${token.access}` : "",
        },
    };
});

const graphql = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});

export default graphql;
