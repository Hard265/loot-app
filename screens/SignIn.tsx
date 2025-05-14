import Alert from "@/components/Alert";
import { Button, ButtonOutlined } from "@/components/Button";
import { Field } from "@/components/Field";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import Text from "@/components/Text";
import useAuth from "@/hooks/useAuth";
import { Link } from "@react-navigation/native";
import { useState } from "react";
import { ScrollView, View } from "react-native";

export default function SignIn() {
    const { signIn } = useAuth();
    const [pending, setPending] = useState(false);
    const [formState, setFormState] = useState({
        email: "",
        password: "",
    });

    const [err, setErr] = useState({
        detail: "",
    });

    // Reset error when input changes
    const onChangeProxy =
        (field: keyof typeof formState) => (value: string) => {
            setFormState((prevState) => ({
                ...prevState,
                [field]: value,
            }));
            setErr({ detail: "" });
        };

    const handleSignin = async () => {
        setPending(true);
        try {
            await signIn(formState);
        } catch (err: any) {
            if ("response" in err && err.response.status === 401) {
                setErr(err.response.data);
            }
        } finally {
            setPending(false);
        }
    };

    const allowSubmit =
        [formState.email, formState.password].every(Boolean) && !pending;

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
                {err.detail && <Alert variant="error">{err.detail}</Alert>}
            </View>
            <Field>
                <Label>Email address</Label>
                <Input
                    value={formState.email}
                    onChange={onChangeProxy("email")}
                    type="email-address"
                />
            </Field>
            <Field>
                <Label>Password</Label>
                <Input
                    value={formState.password}
                    onChange={onChangeProxy("password")}
                    password
                />
            </Field>
            <View className="my-2 flex flex-row p-2">
                <Button
                    loading={pending}
                    disabled={!allowSubmit}
                    onPress={handleSignin}
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
                {/* <Text>{toRgb(colors.gray[300], { format: "css" })}</Text> */}
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
