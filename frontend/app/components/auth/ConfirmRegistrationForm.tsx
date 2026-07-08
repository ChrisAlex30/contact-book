"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import {
    confirmRegistration,
    resendConfirmationCode,
    getAuthErrorMessage,
} from "@/lib/auth";

import {
    validateConfirmationCode,
} from "@/lib/validators";

import AuthCard from "./AuthCard";
import SubmitButton from "./SubmitButton";
import TextInput from "./TextInput";
import Alert from "./Alert";

export default function ConfirmRegistrationForm() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const email = searchParams.get("email") ?? "";

    const [code, setCode] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [codeError, setCodeError] = useState("");

    const [countdown, setCountdown] = useState(30);

    const [success, setSuccess] = useState("");

    function handleFieldChange(
        value: string,
        setValue: React.Dispatch<React.SetStateAction<string>>,
        clearError?: React.Dispatch<React.SetStateAction<string>>
    ) {
        setValue(value);

        clearError?.("");

        setError("");
    }

    useEffect(() => {
        if (countdown === 0)
            return;

        const timer = setTimeout(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        return () => clearTimeout(timer);

    }, [countdown]);

    function validate() {
        setCodeError("");
        setError("");

        const validation = validateConfirmationCode(code);

        if (validation) {
            setCodeError(validation);
            return false;
        }

        return true;
    }

    async function handleSubmit(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        if (loading)
            return;

        if (!validate())
            return;

        setLoading(true);

        try {

            const result = await confirmRegistration(
                email,
                code.trim()
            );

            if (result.nextStep.signUpStep !== "DONE") {
                throw new Error(
                    "Unexpected confirmation response."
                );
            }

            setSuccess("Email verified successfully! Redirecting to login...");

            setTimeout(() => {
            router.replace("/login");
            }, 2000);

        } catch (err) {

            console.error(err);

            setError(getAuthErrorMessage(err));

        } finally {

            setLoading(false);

        }
    }

    async function handleResend() {

        try {

            await resendConfirmationCode(email);

            setCountdown(30);

        } catch (err) {

            setError(getAuthErrorMessage(err));

        }
    }

    return (
        <AuthCard
            title="Verify Email"
            subtitle={`Enter the verification code sent to ${email}`}
        >
            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >

                <TextInput
                    label="Verification Code"
                    value={code}
                    placeholder="123456"
                    autoFocus
                    error={codeError}
                    disabled={loading || !!success}
                    onChange={(value) =>
                        handleFieldChange(
                            value,
                            setCode,
                            setCodeError
                        )
                    }
                />
                <Alert variant="success" title="Success" message={success}/>
                <Alert variant="error" title="Verification Failed" message={error}/>

                <SubmitButton
                    loading={loading || !!success}
                >
                    Verify Email
                </SubmitButton>

            </form>

            <div className="mt-6 border-t pt-6 text-center text-sm space-y-3">

                <button
                    type="button"
                    disabled={countdown > 0 || loading || !!success}
                    onClick={handleResend}
                    className="text-blue-600 hover:underline disabled:text-gray-400"
                >
                    {countdown > 0
                        ? `Resend Code (${countdown})`
                        : "Resend Code"}
                </button>

                <div>

                    <Link
                        href="/register"
                        className="text-blue-600 hover:underline"
                    >
                        Change Email
                    </Link>

                </div>

            </div>

        </AuthCard>
    );
}