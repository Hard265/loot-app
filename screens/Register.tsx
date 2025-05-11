import { Button } from "@/components/Button";
import { Field } from "@/components/Field";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import { ScrollView, View } from "react-native";

export default function Register() {
    return (
        <ScrollView>
            <Field>
                <Label>Email address</Label>
                <Input />
            </Field>
            <View>
                <Field>
                    <Label>Password</Label>
                    <Input />
                </Field>
                <Field>
                    <Label>Password</Label>
                    <Input />
                </Field>
            </View>
            <Button>Sign In</Button>
        </ScrollView>
    );
}
