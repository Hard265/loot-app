import { PropsWithChildren } from "react";
import { Text } from "react-native";
import useField from "./hooks/useField";

interface LabelProps {
    passive?: boolean;
}

function Label({ children, ...props }: PropsWithChildren<LabelProps>) {
    const { disabled } = useField();

    return <Text>{children}</Text>;
}

export { Label };
