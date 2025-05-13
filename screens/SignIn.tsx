import { Button, ButtonOutlined } from "@/components/Button";
import { Field } from "@/components/Field";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";
import { ScrollView, Text } from "react-native";

export default function SignIn() {
    const { signIn } = useAuth();
    const [pending, setPending] = useState(false);
    const [formState, setFormState] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        detail: "",
    });

    const handleSignin = async () => {
        setPending(true);
        try {
            signIn(formState);
        } catch (err) {
            console.log(err);
        } finally {
            setPending(false);
        }
    };

    const allowSubmit =
        [formState.email, formState.password].every(Boolean) && !pending;

    return (
        <ScrollView>
            <Field>
                <Label>Email address</Label>
                <Input
                    value={formState.email}
                    onChange={(email) =>
                        setFormState((prevState) => ({ ...prevState, email }))
                    }
                />
            </Field>
            <Field>
                <Label>Password</Label>
                <Input
                    value={formState.password}
                    onChange={(password) =>
                        setFormState((prevState) => ({
                            ...prevState,
                            password,
                        }))
                    }
                />
            </Field>
            <Button
                loading={pending}
                disabled={!allowSubmit}
                onPress={handleSignin}
            >
                Sign In
            </Button>
            <Text>Need an account? Sign up</Text>
            <Text>Forgot your password Reset it</Text>
            <ButtonOutlined>Sign In with Google</ButtonOutlined>
        </ScrollView>
    );
}
