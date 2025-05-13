import { createContext, PropsWithChildren } from "react";
import { View } from "react-native";
import Text from "./Text";
import { ExclamationCircleIcon } from "react-native-heroicons/mini";
import { useTheme } from "@react-navigation/native";

const FieldContext = createContext({
    disabled: false,
});

interface FieldProps extends PropsWithChildren {
    disabled?: boolean;
    errors?: string[];
}

const Field = ({ children, ...props }: FieldProps) => {
    const { colors } = useTheme();
    return (
        <FieldContext.Provider value={{ disabled: !!props.disabled }}>
            <View className="p-2">
                {children}
                {props.errors?.map((err, index) => (
                    <View
                        key={index}
                        className="mt-1 flex-row items-center gap-1"
                    >
                        {/* <ExclamationCircleIcon
                            size={14}
                            color={colors.notification}
                        /> */}
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
