import { Button } from "@/components/Button";
import { Field } from "@/components/Field";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import Text from "@/components/Text";
import useAuth from "@/hooks/useAuth";
import { Link } from "@react-navigation/native";
import { useState } from "react";
import { ScrollView, View } from "react-native";

export default function Register() {
    const { signUp } = useAuth();
    const [pending, setPending] = useState(false);
    const [formState, setFormState] = useState({
        email: "",
        password: "",
        password2: "",
    });

    const [errs, setErrs] = useState({
        email: [] as string[],
        password: [] as string[],
        password2: [] as string[],
    });

    // Proxy to reset errors for the changed field
    const onChangeProxy = (field: keyof typeof formState, value: string) => {
        setFormState((prevState) => ({
            ...prevState,
            [field]: value,
        }));
        setErrs((prevErrs) => ({
            ...prevErrs,
            [field]: [],
        }));
    };

    const handleSignin = async () => {
        if (formState) {
            if (formState.password !== formState.password2) {
                setErrs((prevErrs) => ({
                    ...prevErrs,
                    password2: ["Passwords do not match"],
                }));
                return;
            }
        }
        setPending(true);
        try {
            await signUp(formState);
        } catch (err: any) {
            if (err.response && err.response.status === 400)
                setErrs(err.response.data);
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
                    Create an account
                </Text>
            </View>
            <Field errors={errs.email}>
                <Label>Email address</Label>
                <Input
                    value={formState.email}
                    onChange={(email) => onChangeProxy("email", email)}
                    type="email-address"
                />
            </Field>
            <View className="flex flex-row gap-2">
                <View className="flex flex-1">
                    <Field errors={errs.password}>
                        <Label>Password</Label>
                        <Input
                            value={formState.password}
                            onChange={(password) =>
                                onChangeProxy("password", password)
                            }
                            password
                        />
                    </Field>
                </View>
                <View className="flex flex-1">
                    <Field errors={errs.password2}>
                        <Label>Confirm password</Label>
                        <Input
                            value={formState.password2}
                            onChange={(password2) =>
                                onChangeProxy("password2", password2)
                            }
                            password
                        />
                    </Field>
                </View>
            </View>
            {/* <Text>{toRGBString(colors.red[400])}</Text> */}
            <View className="my-2 flex flex-row items-start p-2">
                <Button
                    loading={pending}
                    disabled={!allowSubmit}
                    onPress={handleSignin}
                >
                    Register
                </Button>
            </View>
            <View className="flex flex-col gap-2 p-2">
                <Text
                    variant="body"
                    color="secondary"
                >
                    Have an account?{" "}
                    <Link
                        screen="SignIn"
                        params={{}}
                    >
                        <Text color="primary">Sign in</Text>
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
            </View>
        </ScrollView>
    );
}
