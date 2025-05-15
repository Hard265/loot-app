import { ReactNode } from "react";
import { RectButton } from "react-native-gesture-handler";
import { cssInterop } from "nativewind";
import Text from "./Text";

cssInterop(RectButton, { className: "style" });

export default function ListItem(props: {
    title: string;
    icon?: ReactNode;
    onTap?(): void;
}) {
    return (
        <RectButton
            onPress={props.onTap}
            className="flex flex-row items-center gap-2 p-2"
        >
            {props.icon}
            <Text variant="label">{props.title}</Text>
        </RectButton>
    );
}
