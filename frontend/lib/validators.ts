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

export function validatePhone(phone: string): string | null {
  const value = phone.trim();

  if (!value) {
    return "Phone number is required.";
  }

  if (!/^\d{10}$/.test(value)) {
    return "Please enter a valid 10-digit phone number.";
  }

  return null;
}

export function validateName(
  name: string
): string | null {
  const value = name.trim();

  if (!value) {
    return "Name is required.";
  }

  if (value.length < 2) {
    return "Name must be at least 2 characters.";
  }

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

export type PasswordChecks = {
  minLength: boolean;
  uppercase: boolean;
  lowercase: boolean;
  number: boolean;
  special: boolean;
};

export function validatePasswordCharacters(password: string): PasswordChecks {
  return {
    minLength: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };
}

export function isPasswordValid(password: string) {
  const checks = validatePasswordCharacters(password);

  return Object.values(checks).every(Boolean);
}