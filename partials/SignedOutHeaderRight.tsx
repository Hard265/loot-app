import { RectButton } from "react-native-gesture-handler";
import { QuestionMarkCircleIcon } from "react-native-heroicons/outline";

export default function SignedOutHeaderRight(props: any) {
    return (
        <RectButton>
            <QuestionMarkCircleIcon
                size={24}
                color={props.tintColor}
            />
        </RectButton>
    );
}
