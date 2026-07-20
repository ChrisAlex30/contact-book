import { Check, X } from "lucide-react";

import { validatePasswordCharacters } from "@/lib/validators";

type Props = {
  password: string;
};

export default function PasswordRequirements({
  password,
}: Props) {
  const checks = validatePasswordCharacters(password);

  const items = [
    {
      label: "At least 8 characters",
      valid: checks.minLength,
    },
    {
      label: "One uppercase letter",
      valid: checks.uppercase,
    },
    {
      label: "One lowercase letter",
      valid: checks.lowercase,
    },
    {
      label: "One number",
      valid: checks.number,
    },
    {
      label: "One special character",
      valid: checks.special,
    },
  ];

  return (
    <div className="mt-2 space-y-1 text-sm">
      {items.map((item) => (
        <div
          key={item.label}
          className={`flex items-center gap-2 ${
            item.valid ? "text-green-600" : "text-gray-500"
          }`}
        >
          {item.valid ? (
            <Check className="h-4 w-4" />
          ) : (
            <X className="h-4 w-4" />
          )}

          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}