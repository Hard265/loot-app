import { createContext, PropsWithChildren } from "react";
import { View } from "react-native";

const FieldContext = createContext({
    disabled: false,
});

interface FieldProps extends PropsWithChildren {
    disabled?: boolean;
}

const Field = ({ children, ...props }: FieldProps) => {
    return (
        <FieldContext.Provider value={{ disabled: !!props.disabled }}>
            <View>{children}</View>
        </FieldContext.Provider>
    );
};

export { Field, FieldContext };
