import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "./screens/SignIn";
import { useIsSignedIn, useIsSignedOut } from "./hooks/useIsSigned";
import Home from "./screens/Home";
import Register from "./screens/Register";
import PasswordReset from "./screens/PasswordReset";
import PlusFabLayout from "./layouts/PlusFabLayout";

type RootStackT = {
    SignIn: undefined;
    Home: undefined;
    Register: undefined;
    ResetPassword: {
        email?: string;
    };
};

const RootStack = createNativeStackNavigator({
    groups: {
        SignedOut: {
            if: useIsSignedOut,
            screens: { SignIn, Register, PasswordReset },
            screenOptions: {
                headerShadowVisible: false,
                animation: "slide_from_right",
                title: "",
            },
        },
        SignedIn: {
            if: useIsSignedIn,
            screens: {
                Home,
            },
        },
    },
    layout(props) {
        return PlusFabLayout(props);
    },
    screenListeners(props) {
        return {
            focus(e) {
                console.log(e.target, e.data);
            },
        };
    },
});

const Navigation = createStaticNavigation(RootStack);
export { Navigation as default, RootStackT };
