import { TextInput } from "react-native";
import useField from "./hooks/useField";

interface InputProps {
    value?: string;
    onChange?(text: string): void;
}

function Input(props: InputProps) {
    const { disabled } = useField();
    return (
        <TextInput
            value={props.value}
            editable={!disabled}
            onChangeText={props.onChange}
        />
    );
}

export { Input };
