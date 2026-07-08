"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface PasswordInputProps {
  value: string;
  disabled?: boolean;
  error?: string;
  autoComplete?: string;
  label?:string;
  onChange: (value: string) => void;
}

export default function PasswordInput({
  value,
  disabled,
  error,
  autoComplete,
  label="Password",
  onChange,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium">
        {label}
      </label>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder=""
          value={value}
          autoComplete={autoComplete}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-md border px-3 py-2 pr-12 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="button"
          className="absolute right-3 top-2 text-sm cursor-pointer"
          onClick={() => setShowPassword((v) => !v)}
        >
          {showPassword ? <EyeOff /> : <Eye />}
        </button>
      </div>

      {error && (
        <p className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}