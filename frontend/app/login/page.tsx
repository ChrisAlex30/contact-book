"use client";

import { useState } from "react";
import { login,logout } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { getAccessToken, currentUser } from "@/lib/auth";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
            await logout();

        const result = await login(email, password);

        console.log(result);

        const user = await currentUser();
        console.log(user);

        const token = await getAccessToken();
        console.log(token);

        router.push("/dashboard");
    } catch (err) {
        console.error(err);
        setError("Invalid email or password");
    } finally {
        setLoading(false);
    }
}

  return (
    <main className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="flex w-full max-w-sm flex-col gap-4 rounded border p-6 shadow">
        <h1 className="text-2xl font-bold">Contact Book</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded border p-2"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded border p-2"
        />

        {error && (
            <p className="text-sm text-red-600">
                {error}
            </p>
            )}
        <button
            type="submit"
            disabled={loading}
            className="rounded bg-blue-600 p-2 text-white disabled:opacity-50"
            >
            {loading ? "Signing In..." : "Login"}
            </button>
      </form>
    </main>
  );
}