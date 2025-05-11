import * as SecureStore from "expo-secure-store";
import { useEffect, useMemo, useReducer } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Navigation from "./Router";
import { AuthContext } from "./contexts/AuthContext";
import { SignInContext } from "./contexts/SignInContext";
import { login, UserData } from "./services/userApi";
import { deleteToken, setToken } from "./services/api";

export default function App() {
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
            async signIn(credintials: UserData) {
                const { data } = await login(credintials);
                await setToken(data);
                dispatch({
                    type: "SIGN_IN",
                    token: data,
                });
            },
            async signOut() {
                await deleteToken();
                dispatch({ type: "SIGN_OUT" });
            },
        }),
        [],
    );

    if (state.isLoading) return null;

    const isSignedIn = state.userToken != null;

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <AuthContext.Provider value={authContext}>
                <SignInContext.Provider value={isSignedIn}>
                    <Navigation />
                </SignInContext.Provider>
            </AuthContext.Provider>
        </GestureHandlerRootView>
    );
}
