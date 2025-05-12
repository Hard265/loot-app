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
            className="flex flex-row border focus:border-primary p-3"
        />
    );
}

export { Input };
