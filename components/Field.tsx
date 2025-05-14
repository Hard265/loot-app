import { useTheme } from "@react-navigation/native";
import { createContext, PropsWithChildren } from "react";
import { View } from "react-native";
import Text from "./Text";

const FieldContext = createContext({
    disabled: false,
    errors: [] as string[],
});

interface FieldProps extends PropsWithChildren {
    disabled?: boolean;
    errors?: string[];
}

const Field = ({ children, errors = [], ...props }: FieldProps) => {
    return (
        <FieldContext.Provider
            value={{ disabled: !!props.disabled, errors: errors }}
        >
            <View className="p-2">
                {children}
                {errors.map((err, index) => (
                    <View
                        key={index}
                        className="mt-1 flex-row items-center gap-1"
                    >
                        <Text
                            color="error"
                            variant="footnote"
                        >
                            {err}
                        </Text>
                    </View>
                ))}
            </View>
        </FieldContext.Provider>
    );
};

export { Field, FieldContext };
