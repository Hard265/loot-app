import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "./screens/SignIn";
import { useIsSignedOut } from "./hooks/useIsSigned";

const RootStack = createNativeStackNavigator({
    groups: {
        SignedOut: {
            if: useIsSignedOut,
            screens: {
                SignIn,
            },
        },
    },
});

const Navigation = createStaticNavigation(RootStack);
export default Navigation;
