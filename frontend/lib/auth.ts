import "./amplify";
import {
  signIn,
  signOut,
  fetchAuthSession,
  getCurrentUser,
} from "aws-amplify/auth";

export async function login(email: string, password: string) {
  return signIn({
    username: email,
    password,
  });
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