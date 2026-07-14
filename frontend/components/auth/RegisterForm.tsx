"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { register, getAuthErrorMessage } from "@/lib/auth";

import AuthCard from "./AuthCard";
import PasswordInput from "./PasswordInput";
import SubmitButton from "./SubmitButton";
import TextInput from "./TextInput";

import {
  validateEmail,
  validateName,
  validatePassword,
  validateConfirmPassword,
} from "@/lib/validators";

import AlertMessage from "@/components/common/AlertMessage";

export default function RegisterForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [
    showContinueVerification,
    setShowContinueVerification,
  ] = useState(false);

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] =
    useState("");
  const [
    confirmPasswordError,
    setConfirmPasswordError,
  ] = useState("");

  function validate() {
    let valid = true;

    setError("");

    setNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    const nameValidation = validateName(name);

    if (nameValidation) {
      setNameError(nameValidation);
      valid = false;
    }

    const emailValidation = validateEmail(email);

    if (emailValidation) {
      setEmailError(emailValidation);
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

    setError("");
    setShowContinueVerification(false);

    try {
      const result = await register(
        name.trim(),
        email.trim(),
        password
      );

      if (!result.nextStep.signUpStep) {
        throw new Error(
          "Unexpected sign up response."
        );
      }

      router.push(
        `/confirm-registration?email=${encodeURIComponent(
          email.trim()
        )}`
      );
    } catch (err) {      

      setError(getAuthErrorMessage(err));

      if (
        typeof err === "object" &&
        err !== null &&
        "name" in err &&
        (err as { name: string }).name ===
          "UsernameExistsException"
      ) {
        setShowContinueVerification(true);
      }
    } finally {
      setLoading(false);
    }
  }

  function handleFieldChange(
    value: string,
    setValue: React.Dispatch<
      React.SetStateAction<string>
    >,
    clearError?: React.Dispatch<
      React.SetStateAction<string>
    >
  ) {
    setValue(value);

    clearError?.("");

    setError("");
    setShowContinueVerification(false);
  }

  return (
    <AuthCard
      subtitle="Create your Contact Book account."
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <TextInput
          label="Full Name"
          value={name}
          autoComplete="name"
          autoFocus
          error={nameError}
          disabled={loading}
          onChange={(value) =>
            handleFieldChange(
              value,
              setName,
              setNameError
            )
          }
        />

        <TextInput
          label="Email"
          type="email"
          value={email}
          autoComplete="email"
          error={emailError}
          disabled={loading}
          onChange={(value) =>
            handleFieldChange(
              value,
              setEmail,
              setEmailError
            )
          }
        />

        <PasswordInput
          label="Password"
          value={password}
          autoComplete="new-password"
          error={passwordError}
          disabled={loading}
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
          disabled={loading}
          onChange={(value) =>
            handleFieldChange(
              value,
              setConfirmPassword,
              setConfirmPasswordError
            )
          }
        />

        <AlertMessage
          title="Registration Failed"
          variant="error"
          message={error}
        />

        {showContinueVerification && (
          <div className="text-center">
            <button
              type="button"
              onClick={() =>
                router.push(
                  `/confirm-registration?email=${encodeURIComponent(
                    email.trim()
                  )}`
                )
              }
              className="font-medium text-blue-600 hover:underline"
            >
              Continue Verification
            </button>
          </div>
        )}

        <SubmitButton
          loading={loading}
          loadingText="Creating Account..."
        >
          Create Account
        </SubmitButton>
      </form>

      <div className="mt-6 border-t pt-6 text-center text-sm">
        Already have an account?{" "}
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