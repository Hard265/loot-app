import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useIsSignedIn, useIsSignedOut } from "./hooks/useIsSigned";
import ItemContextLayout from "./layouts/ItemContextLayout";
import PlusFabLayout from "./layouts/PlusFabLayout";
import OptionsManagerLayout from "./layouts/OptionsManagerLayout";
import Folder from "./screens/Folder";
import Home from "./screens/Home";
import PasswordReset from "./screens/PasswordReset";
import Register from "./screens/Register";
import ShareScreen from "./screens/Share";
import SignIn from "./screens/SignIn";
import User from "./screens/User";
import SignedOutHeaderRight from "./components/ui/SignedOutHeaderRight";
import ShareManage from "./screens/ShareManage";
import ShareScreenLayout from "./layouts/ShareScreenLayout";
import { UserSettings } from "./screens/UserSettings";

type RootStackT = {
    SignIn: undefined;
    Home: undefined;
    Folder: { id: string };
    User: undefined;
    UserSettings: undefined;
    Register: undefined;
    ResetPassword: {
        email?: string;
    };
    Share: {
        type: "FileType" | "FolderType";
        id: string;
    };
    ShareManage: {
        id: string;
    };
};

const RootStack = createNativeStackNavigator({
    screenOptions: {
        headerTitleStyle: {
            fontFamily: "RoobertMedium",
        },
    },
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
                UserSettings: {
                    screen: UserSettings,
                    options: { title: "Account settings" },
                },
                Share: {
                    screen: ShareScreen,
                    layout(props) {
                        return ShareScreenLayout({ children: props.children });
                    },
                },
                Manage: {
                    screen: ShareManage,
                    options: { title: "Manage access" },
                },
            },
            screenOptions: {
                headerShadowVisible: false,
                animation: "slide_from_right",
            },
        },
    },
    //@ts-ignore
    layout: (props) => {
        return OptionsManagerLayout({
            //@ts-ignore
            children: ItemContextLayout({ children: PlusFabLayout(props) }),
        });
    },
});

const Navigation = createStaticNavigation(RootStack);
export { Navigation as default, type RootStackT };
