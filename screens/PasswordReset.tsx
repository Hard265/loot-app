import { Field } from "@/components/Field";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import Text from "@/components/Text";
import { ScrollView, View } from "react-native";
import { useState } from "react";
import { Button } from "@/components/Button";

export default function PasswordReset() {
    const [email, setEmail] = useState("");

    return (
        <ScrollView className="bg-background dark:bg-black">
            <View className="mb-12 flex flex-col gap-2 p-2">
                <Text
                    variant="largeTitle"
                    color="secondary"
                >
                    Reset your password
                </Text>
                <Text
                    variant="body"
                    color="secondary"
                >
                    Enter your email address for the account your want to reset,
                    we will send a reset lint
                </Text>
            </View>
            <Field>
                <Label>Email address</Label>
                <Input
                    value={email}
                    onChange={setEmail}
                    type="email-address"
                />
            </Field>
            <View className="flex flex-row p-2">
                <Button disabled={!email}>Request</Button>
            </View>
        </ScrollView>
    );
}
