import { TextInput, TextInputProps } from "react-native";
import useField from "./hooks/useField";

interface InputProps {
    value?: string;
    onChange?(text: string): void;
    password?: boolean;
    type?: TextInputProps["keyboardType"];
}

function Input(props: InputProps) {
    const { disabled } = useField();

    return (
        <TextInput
            value={props.value}
            editable={!disabled}
            onChangeText={props.onChange}
            secureTextEntry={props.password}
            keyboardType={props.type}
            className="flex flex-row border border-text/50 bg-background p-3 font-[MontrealRegular] text-base shadow color-text focus:border-2 focus:border-primary dark:border-text/50"
        />
    );
}

export { Input };
