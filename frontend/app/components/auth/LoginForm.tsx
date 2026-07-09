"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

import { getAuthErrorMessage, isAuthenticated, login } from "@/lib/auth";

import TextInput from "./TextInput";
import PasswordInput from "./PasswordInput";
import SubmitButton from "./SubmitButton";
import AuthCard from "./AuthCard";
import { validateEmail, validatePassword } from "@/lib/validators";
import AlertMessage from "./Alert";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

function validate() {
  let valid = true;

  setEmailError("");
  setPasswordError("");
  setError("");

  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);

  if (emailError) {
    setEmailError(emailError);
    emailRef.current?.focus();
    valid = false;
  }

  if (passwordError) {
    setPasswordError(passwordError);

    if (!emailError) {
      passwordRef.current?.focus();
    }

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
      const authenticated = await isAuthenticated();
      
      if (authenticated) {
            router.replace("/dashboard");
            return;
      }  
      const result = await login(email.trim(), password);

      if (!result.isSignedIn) {
        throw new Error(result.nextStep.signInStep);
      }

      router.replace("/dashboard");
    } catch (err) {
        setError(getAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  function handleEmailChange(value: string) {
    setEmail(value);

    setEmailError("");
    setError("");
    }

    function handlePasswordChange(value: string) {
        setPassword(value);

        setPasswordError("");
        setError("");
    }

  return (
    
      <AuthCard title="Contact Book" subtitle="Welcome back. Sign in to continue.">
      <form
        className="space-y-5"
        onSubmit={handleSubmit}
      >
        <TextInput
          label="Email"
          type="email"
          value={email}
          placeholder="john@example.com"
          autoFocus
          autoComplete="email"
          error={emailError}
          disabled={loading}
          onChange={handleEmailChange}
        />

        <PasswordInput
          value={password}
          error={passwordError}
          disabled={loading}
          autoComplete="current-password"
          onChange={handlePasswordChange}
        />

        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <AlertMessage variant="error" message={error}   title="Sign In Failed"/>

        <SubmitButton loading={loading}>
          Sign In
        </SubmitButton>
      </form>
      <div className="mt-8 border-t pt-6 text-center text-sm">
        Don't have an account?{" "}
        <Link
          href="/register"
          className="font-medium text-blue-600 hover:underline"
        >
          Create account
        </Link>
      </div>
      </AuthCard>
    
  );
}