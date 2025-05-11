import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "./screens/SignIn";
import { useIsSignedIn, useIsSignedOut } from "./hooks/useIsSigned";
import Home from "./screens/Home";

const RootStack = createNativeStackNavigator({
    groups: {
        SignedOut: {
            if: useIsSignedOut,
            screens: {
                SignIn,
            },
            screenOptions: {
                headerShadowVisible: false,
            },
        },
        SignedIn: {
            if: useIsSignedIn,
            screens: {
                Home,
            },
        },
    },
});

const Navigation = createStaticNavigation(RootStack);
export default Navigation;
