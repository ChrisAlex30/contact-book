"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import AuthCard from "./AuthCard";
import AlertMessage from "@/components/common/AlertMessage";
import SubmitButton from "./SubmitButton";
import TextInput from "./TextInput";

import {
  forgotPassword,
  getAuthErrorMessage,
} from "@/lib/auth";

import {
  validateEmail,
} from "@/lib/validators";

export default function ForgotPasswordForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");

  const [emailError, setEmailError] = useState("");

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [loading, setLoading] = useState(false);

  function handleFieldChange(
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    clearError?: React.Dispatch<React.SetStateAction<string>>
  ) {
    setValue(value);

    clearError?.("");

    setError("");
  }

  function validate() {
    setEmailError("");
    setError("");

    const validation = validateEmail(email);

    if (validation) {
      setEmailError(validation);
      return false;
    }

    return true;
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (loading) return;

    if (!validate()) return;

    setLoading(true);

    try {
      await forgotPassword(email);
      setSuccess(
        "We've sent a verification code to your email."
      );

      setTimeout(() => {
        router.push(
          `/reset-password?email=${encodeURIComponent(
            email.trim()
          )}`
        );
      }, 1200);
    } catch (err) {
      console.error(err);

      setError(getAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard      
      subtitle="Enter your email to reset your password."
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <TextInput
          label="Email"
          type="email"
          value={email}
          autoFocus
          autoComplete="email"
          error={emailError}
          disabled={loading || !!success}
          onChange={(value) =>
            handleFieldChange(
              value,
              setEmail,
              setEmailError
            )
          }
        />

        <AlertMessage
          variant="success"
          title="Email Sent"
          message={success}
        />

        <AlertMessage
          variant="error"
          title="Unable to Send Email"
          message={error}
        />

        <SubmitButton
          loading={loading || !!success}
          loadingText="Sending Code..."
        >
          Send Verification Code
        </SubmitButton>
      </form>

      <div className="mt-6 border-t pt-6 text-center text-sm">
        Remembered your password?{" "}
        <Link
          href="/login"
          className="font-medium text-blue-600 hover:underline"
        >
          Sign In
        </Link>
      </div>
    </AuthCard>
  );
}