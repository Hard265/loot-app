import "./global.css";

import { DarkTheme, DefaultTheme, Theme } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SecureStore from "expo-secure-store";
import { useEffect, useMemo, useReducer } from "react";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Navigation from "./Router";
import { AuthContext, authData } from "./contexts/AuthContext";
import { SignInContext } from "./contexts/SignInContext";
import store from "./stores";
import { setBackgroundColorAsync } from "expo-system-ui";
import colors from "tailwindcss/colors";
import { ApolloProvider } from "@apollo/client";
import graphql from "./services/graphql";

export default function App() {
    const colorScheme = useColorScheme();
    const [fontsLoaded, fontsErr] = useFonts({
        RoobertBold: require("./assets/fonts/Roobert-Bold.otf"),
        MontrealRegular: require("./assets/fonts/NeueMontreal-Regular.otf"),
        MontrealMedium: require("./assets/fonts/NeueMontreal-Medium.otf"),
    });

    useEffect(() => {
        const bootstrapAsync = async () => {
            await setBackgroundColorAsync(
                getTheme(colorScheme === "dark").colors.background,
            );
        };
        bootstrapAsync();
    }, [colorScheme]);

    const [state, dispatch] = useReducer(
        (prevState, action) => {
            switch (action.type) {
                case "RESTORE_TOKEN":
                    return {
                        ...prevState,
                        userToken: action.token,
                        isLoading: false,
                    };
                case "SIGN_IN":
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: action.token,
                    };
                case "SIGN_OUT":
                    return {
                        ...prevState,
                        isSignout: true,
                        userToken: null,
                    };
                default:
                    return prevState;
            }
        },
        {
            isLoading: true,
            isSignout: false,
            userToken: null,
        },
    );

    useEffect(() => {
        const bootstrapAsync = async () => {
            let userToken;
            try {
                userToken = await SecureStore.getItemAsync("token");
            } catch (err) {
                console.log(err);
            }
            dispatch({ type: "RESTORE_TOKEN", token: userToken });
        };
        bootstrapAsync();
    }, []);

    const authContext = useMemo(
        () => ({
            async setUser(authData: authData) {
                await store.authStore.setUser(authData.payload);
                await SecureStore.setItemAsync("token", authData.token);
                dispatch({
                    type: "SIGN_IN",
                    token: authData.token,
                });
            },
            async deleteUser() {
                await SecureStore.deleteItemAsync("token");
                dispatch({ type: "SIGN_OUT" });
            },
        }),
        [],
    );

    if (state.isLoading) return null;

    const isSignedIn = state.userToken != null;

    if (!fontsLoaded || fontsErr) {
        return null;
    }

    return (
        <ApolloProvider client={graphql}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <AuthContext.Provider value={authContext}>
                    <SignInContext.Provider value={isSignedIn}>
                        <Navigation theme={getTheme(colorScheme === "dark")} />
                    </SignInContext.Provider>
                </AuthContext.Provider>
            </GestureHandlerRootView>
        </ApolloProvider>
    );
}

function getTheme(dark: boolean): Theme {
    return dark
        ? {
              ...DarkTheme,
              colors: {
                  ...DarkTheme.colors,
                  background: colors.black,
                  card: colors.black,
              },
          }
        : {
              ...DefaultTheme,
              colors: { ...DefaultTheme.colors, background: colors.white },
          };
}
