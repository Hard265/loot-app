import React, { PropsWithChildren } from "react";
import Animated, {
    FadeInDown,
    FadeOutDown,
    LinearTransition,
} from "react-native-reanimated";
import Text from "./Text";

interface AlertProps {
    variant?: "error" | "success" | "warn" | "primary";
}

const variantStyles: Record<string, string> = {
    error: "border-l-8 border-error bg-error/50",
    success: "border-l-8 border-green-600 bg-green-100",
    warn: "border-l-8 border-yellow-600 bg-yellow-100",
    primary: "border-l-8 border-primary bg-primary/50",
};

const Alert: React.FC<PropsWithChildren<AlertProps>> = ({
    children,
    variant = "primary",
}) => {
    return (
        <Animated.View
            entering={FadeInDown}
            exiting={FadeOutDown}
            layout={LinearTransition}
            className={`${variantStyles[variant]} p-2`}
        >
            <Text>{children}</Text>
        </Animated.View>
    );
};

export default Alert;
