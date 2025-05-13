import { PropsWithChildren } from "react";
import useField from "./hooks/useField";
import Text from "./Text";

interface LabelProps {
    passive?: boolean;
}

function Label({ children, ...props }: PropsWithChildren<LabelProps>) {
    const { disabled } = useField();

    return (
        <Text
            variant="label"
            color="secondary"
        >
            {children}
        </Text>
    );
}

export { Label };
