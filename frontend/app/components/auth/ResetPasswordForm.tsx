"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import AuthCard from "./AuthCard";
import PasswordInput from "./PasswordInput";
import SubmitButton from "./SubmitButton";
import TextInput from "./TextInput";

import AlertMessage from "./Alert";

import {
  resetForgottenPassword,
  getAuthErrorMessage,
} from "@/lib/auth";

import {
  validateConfirmationCode,
  validatePassword,
  validateConfirmPassword,
} from "@/lib/validators";

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") ?? "";

  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [codeError, setCodeError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] =
    useState("");

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

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
    let valid = true;

    setCodeError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setError("");

    const codeValidation =
      validateConfirmationCode(code);

    if (codeValidation) {
      setCodeError(codeValidation);
      valid = false;
    }

    const passwordValidation =
      validatePassword(password);

    if (passwordValidation) {
      setPasswordError(passwordValidation);
      valid = false;
    }

    const confirmValidation =
      validateConfirmPassword(
        password,
        confirmPassword
      );

    if (confirmValidation) {
      setConfirmPasswordError(confirmValidation);
      valid = false;
    }

    return valid;
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (loading) return;

    if (!validate()) return;

    setLoading(true);

    try {
      await resetForgottenPassword(
        email,
        code,
        password
      );

      setSuccess(
        "Password updated successfully. Redirecting to login..."
      );

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

  return (
    <AuthCard
      title="Reset Password"
      subtitle={`Reset password for ${email}`}
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

        <PasswordInput
          label="New Password"
          value={password}
          autoComplete="new-password"
          error={passwordError}
          disabled={loading || !!success}
          onChange={(value) =>
            handleFieldChange(
              value,
              setPassword,
              setPasswordError
            )
          }
        />

        <PasswordInput
          label="Confirm Password"
          value={confirmPassword}
          autoComplete="new-password"
          error={confirmPasswordError}
          disabled={loading || !!success}
          onChange={(value) =>
            handleFieldChange(
              value,
              setConfirmPassword,
              setConfirmPasswordError
            )
          }
        />

        <AlertMessage
          title="Success"
          message={success}
          variant="success"
        />

        <AlertMessage
          title="Reset Failed"
          message={error}
          variant="error"
        />

        <SubmitButton
          loading={loading || !!success}
        >
          Reset Password
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