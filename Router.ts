import {createStaticNavigation} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useIsSignedIn, useIsSignedOut} from "./hooks/useIsSigned";
import {SignedInLayout} from "./layouts";
import SignedOutHeaderRight from "./partials/SignedOutHeaderRight";
import Folder from "./screens/Folder";
import Home from "./screens/Home";
import PasswordReset from "./screens/PasswordReset";
import Register from "./screens/Register";
import SignIn from "./screens/SignIn";

type RootStackT = {
    SignIn: undefined;
    Home: undefined;
    Folder: { id: string };
    User: undefined;
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
                headerRight: (props) => SignedOutHeaderRight(props),
                title: "",
            },
        },
        SignedIn: {
            if: useIsSignedIn,
            screens: {
                Home,
                Folder,
            },
            screenOptions: {
                headerShadowVisible: false,
                animation: "slide_from_right",
            },
        },
    },
    layout(props) {
        return SignedInLayout(props);
    },
    screenListeners(props) {
        return {
            focus(e) {
                // console.log(e.target, e.data);
            },
        };
    },
});

const Navigation = createStaticNavigation(RootStack);
export {Navigation as default, RootStackT};

