import "./amplify";
import {
  signIn,
  signOut,
  fetchAuthSession,
  getCurrentUser,
  signUp,
  confirmSignUp,
  resendSignUpCode,
  resetPassword,confirmResetPassword
} from "aws-amplify/auth";

export async function login(email: string, password: string) {
  const result = await signIn({
    username: email.trim().toLowerCase(),
    password,
  });

  return result;
}

export async function logout() {
  return signOut();
}

export async function currentUser() {
  return getCurrentUser();
}

export async function getAccessToken() {
  const session = await fetchAuthSession();

  return session.tokens?.accessToken?.toString() ?? null;
}

export async function getIdToken() {
  const session = await fetchAuthSession();

  return session.tokens?.idToken?.toString() ?? null;
}

export async function isAuthenticated() {
  try {
    await getCurrentUser();
    return true;
  } catch {
    return false;
  }
}

export function getAuthErrorMessage(error: unknown): string {
  if (
    typeof error === "object" &&
    error !== null &&
    "name" in error
  ) {
    switch ((error as { name: string }).name) {
      case "NotAuthorizedException":
        return "Invalid email or password.";

      case "UserNotFoundException":
        return "Account not found.";

      case "UserNotConfirmedException":
        return "Your email hasn't been verified yet.";

      case "UsernameExistsException":
        return "An account with this email already exists but hasn't been verified yet.";

      case "InvalidPasswordException":
        return "Password does not meet the required policy.";

      case "PasswordResetRequiredException":
        return "Password reset is required.";

      case "CodeMismatchException":
        return "The verification code is incorrect.";

      case "ExpiredCodeException":
        return "The verification code has expired. Please request a new one.";

      case "LimitExceededException":
        return "Too many attempts. Please wait and try again.";

      case "TooManyRequestsException":
        return "Too many requests. Please try again later.";

      default:
        return "Something went wrong.";
    }
  }

  return "Something went wrong.";
}

export async function register(
  name: string,
  email: string,
  password: string
) {
  return signUp({
    username: email.trim().toLowerCase(),
    password,
    options: {
      userAttributes: {
        email: email.trim().toLowerCase(),
        name,
      },
    },
  });
}

export async function confirmRegistration(
  email: string,
  code: string
) {
  return confirmSignUp({
    username: email.trim().toLowerCase(),
    confirmationCode: code,
  });
}

export async function resendConfirmationCode(
  email: string
) {
  return resendSignUpCode({
    username: email.trim().toLowerCase(),
  });
}

export async function forgotPassword(email: string) {
  return resetPassword({
    username: email.trim().toLowerCase(),
  });
}

export async function resetForgottenPassword(
  email: string,
  code: string,
  newPassword: string
) {
  return confirmResetPassword({
    username: email.trim().toLowerCase(),
    confirmationCode: code.trim(),
    newPassword,
  });
}