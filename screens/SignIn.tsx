import Alert from "@/components/Alert";
import { Button, ButtonOutlined } from "@/components/Button";
import { Field } from "@/components/Field";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import Text from "@/components/Text";
import useAuth from "@/hooks/useAuth";
import { useMutation } from "@apollo/client";
import { Link } from "@react-navigation/native";
import { useState } from "react";
import { ScrollView, View } from "react-native";

import { GetTokenDocument } from "@/__generated__/schema/graphql";

export default function SignIn() {
    const { setUser } = useAuth();
    const [formState, setFormState] = useState({
        email: "",
        password: "",
    });

    const [getToken, { loading, error, reset }] = useMutation(
        GetTokenDocument,
        {
            variables: formState,
            onCompleted(data) {
                if ("tokenAuth" in data) setUser(data.tokenAuth!);
            },
            fetchPolicy: "no-cache",
        },
    );

    const onChangeProxy =
        (field: keyof typeof formState) => (value: string) => {
            setFormState((prevState) => ({
                ...prevState,
                [field]: value,
            }));
            if (error) reset();
        };

    return (
        <ScrollView
            className="bg-background"
            contentContainerClassName="flex flex-col"
        >
            <View className="mb-12 p-2">
                <Text
                    variant="largeTitle"
                    color="secondary"
                >
                    Sign In
                </Text>
                {error && <Alert variant="error">{error.message}</Alert>}
            </View>
            <Field disabled={loading}>
                <Label>Email address</Label>
                <Input
                    value={formState.email}
                    onChange={onChangeProxy("email")}
                    type="email-address"
                />
            </Field>
            <Field disabled={loading}>
                <Label>Password</Label>
                <Input
                    value={formState.password}
                    onChange={onChangeProxy("password")}
                    password
                />
            </Field>
            <View className="my-2 flex flex-row p-2">
                <Button
                    loading={loading}
                    disabled={loading}
                    onPress={() => getToken()}
                >
                    Sign In
                </Button>
            </View>
            <View className="flex flex-col gap-4 p-2">
                <Link
                    screen="Register"
                    params={{}}
                >
                    <Text color="primary">Sign in with SSO</Text>
                </Link>
                <Text
                    variant="body"
                    color="secondary"
                >
                    Need an account?{" "}
                    <Link
                        screen="Register"
                        params={{}}
                    >
                        <Text color="primary">Sign up</Text>
                    </Link>
                </Text>
                <Text
                    variant="body"
                    color="secondary"
                >
                    Forgot your password?{" "}
                    <Link
                        screen="PasswordReset"
                        params={{ email: formState.email }}
                    >
                        <Text color="primary">Reset it</Text>
                    </Link>
                </Text>
                <View className="flex flex-row">
                    <ButtonOutlined>Sign In with Google</ButtonOutlined>
                </View>
            </View>
        </ScrollView>
    );
}
