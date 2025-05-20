import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useIsSignedIn, useIsSignedOut } from "./hooks/useIsSigned";
import SignedOutHeaderRight from "./partials/SignedOutHeaderRight";
import Folder from "./screens/Folder";
import Home from "./screens/Home";
import PasswordReset from "./screens/PasswordReset";
import Register from "./screens/Register";
import SignIn from "./screens/SignIn";
import PlusFabLayout from "./layouts/PlusFabLayout";
import User from "./screens/User";
import ItemContextLayout from "./layouts/ItemContextLayout";
import ShareScreen from "./screens/Share";

enum entity {
    file = "file",
    folder = "folder",
}

type RootStackT = {
    SignIn: undefined;
    Home: undefined;
    Folder: { id: string };
    Info: {
        id: string;
        data: any;
        type: entity;
    };
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
                User,
                ShareScreen,
            },
            // screenLayout: (props) => ItemContextLayout(props),
            screenOptions: {
                headerShadowVisible: false,
                animation: "slide_from_right",
            },
        },
    },
    layout: (props) => ItemContextLayout({ children: PlusFabLayout(props) }),
});

const Navigation = createStaticNavigation(RootStack);
export { Navigation as default, RootStackT };
