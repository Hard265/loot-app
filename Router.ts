import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useIsSignedIn, useIsSignedOut } from "./hooks/useIsSigned";
import ItemContextLayout from "./layouts/ItemContextLayout";
import PlusFabLayout from "./layouts/PlusFabLayout";
import SignedOutHeaderRight from "./partials/SignedOutHeaderRight";
import OptionsProvider from "./providers/OptionsProvider";
import Folder from "./screens/Folder";
import Home from "./screens/Home";
import PasswordReset from "./screens/PasswordReset";
import Register from "./screens/Register";
import ShareScreen from "./screens/Share";
import SignIn from "./screens/SignIn";
import User from "./screens/User";

type RootStackT = {
    SignIn: undefined;
    Home: undefined;
    Folder: { id: string };
    Info: {
        id: string;
        data: any;
        type: "file" | "folder";
    };
    User: undefined;
    Register: undefined;
    ResetPassword: {
        email?: string;
    };
    Share: undefined;
};

const RootStack = createNativeStackNavigator({
    groups: {
        SignedOut: {
            if: useIsSignedOut,
            screens: {
                SignIn: SignIn,
                Register: Register,
                ResetPassword: PasswordReset,
            },
            screenOptions: {
                headerShadowVisible: false,
                animation: "slide_from_right",
                headerRight: SignedOutHeaderRight,
                title: "",
            },
        },
        SignedIn: {
            if: useIsSignedIn,
            screens: {
                Home: Home,
                Folder: Folder,
                User: User,
                Share: ShareScreen,
            },
            screenOptions: {
                headerShadowVisible: false,
                animation: "slide_from_right",
            },
        },
    },
    layout: (props) =>
        OptionsProvider({
            children: ItemContextLayout({ children: PlusFabLayout(props) }),
        }),
});

const Navigation = createStaticNavigation(RootStack);
export { Navigation as default, type RootStackT };
