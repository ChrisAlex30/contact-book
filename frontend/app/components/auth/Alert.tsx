import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Info,
} from "lucide-react";

interface AlertProps {
  title?: string;
  message: string;
  variant?: "success" | "error" | "warning" | "info";
}

const variants = {
  success: {
    icon: CheckCircle2,
    container: "border-green-200 bg-green-50",
    iconColor: "text-green-600",
    titleColor: "text-green-800",
    messageColor: "text-green-700",
  },
  error: {
    icon: AlertCircle,
    container: "border-red-200 bg-red-50",
    iconColor: "text-red-600",
    titleColor: "text-red-800",
    messageColor: "text-red-700",
  },
  warning: {
    icon: AlertTriangle,
    container: "border-yellow-200 bg-yellow-50",
    iconColor: "text-yellow-600",
    titleColor: "text-yellow-800",
    messageColor: "text-yellow-700",
  },
  info: {
    icon: Info,
    container: "border-blue-200 bg-blue-50",
    iconColor: "text-blue-600",
    titleColor: "text-blue-800",
    messageColor: "text-blue-700",
  },
};

export default function Alert({
  title,
  message,
  variant = "error",
}: AlertProps) {
  if (!message) return null;

  const style = variants[variant];
  const Icon = style.icon;

  return (
    <div
      role="alert"
      className={`rounded-lg border p-4 ${style.container}`}
    >
      <div className="flex items-start gap-3">
        <Icon
          size={20}
          className={`mt-0.5 shrink-0 ${style.iconColor}`}
        />

        <div className="flex-1">
          {title && (
            <h3
              className={`font-semibold ${style.titleColor}`}
            >
              {title}
            </h3>
          )}

          <p
            className={`${style.messageColor} ${
              title ? "mt-1" : ""
            }`}
          >
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}