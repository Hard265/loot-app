import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import * as SecureStore from "expo-secure-store";

const httpLink = createHttpLink({
    uri: process.env.EXPO_PUBLIC_URL_API + "/graphql/",
    headers: {
        "Content-Type": "application/json",
    },
});

const authLink = setContext(async (_, { headers }) => {
    const token = await SecureStore.getItemAsync("token");
    return {
        headers: {
            ...headers,
            Authorization: token ? `JWT ${token}` : "",
        },
    };
});

const graphql = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default graphql;
