export function validateEmail(email: string): string | null {
  const value = email.trim();

  if (!value) {
    return "Email is required.";
  }

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
    return "Please enter a valid email address.";
  }

  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) {
    return "Password is required.";
  }

  return null;
}

export function validateName(name: string) {
    if (!name.trim())
        return "Name is required.";

    return null;
}

export function validateConfirmPassword(
    password: string,
    confirmPassword: string
) {
    if (!confirmPassword)
        return "Please confirm your password.";

    if (password !== confirmPassword)
        return "Passwords do not match.";

    return null;
}

export function validateConfirmationCode(
    code: string
): string | null {

    if (!code.trim())
        return "Verification code is required.";

    if (!/^\d{6}$/.test(code))
        return "Enter a valid 6-digit code.";

    return null;
}