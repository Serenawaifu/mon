// src/hooks/useAuth.js

import { useEffect, useState } from "react";
import {
  auth,
  subscribeAuth,
  loginWithGoogle,
  loginWithEmail,
  signupWithEmail,
  logout,
} from "../lib/firebase";

/**
 * useAuth - encapsulates authentication state and actions.
 *
 * Returns:
 *   user: The current Firebase user object or null
 *   loading: boolean for on-going auth state resolution
 *   error: string|null auth error messages
 *   actions: login/signup/logout functions
 */
export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = subscribeAuth((firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
      setError(null);
    });
    return unsubscribe;
  }, []);

  async function handleGoogleLogin() {
    setLoading(true);
    try {
      await loginWithGoogle();
      setError(null);
    } catch (err) {
      setError(err.message || "Login with Google failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleEmailLogin(email, password) {
    setLoading(true);
    try {
      await loginWithEmail(email, password);
      setError(null);
    } catch (err) {
      setError(err.message || "Email login failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleSignup(email, password) {
    setLoading(true);
    try {
      await signupWithEmail(email, password);
      setError(null);
    } catch (err) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    setLoading(true);
    try {
      await logout();
      setError(null);
    } catch (err) {
      setError(err.message || "Logout failed");
    } finally {
      setLoading(false);
    }
  }

  return {
    user,
    loading,
    error,
    loginWithGoogle: handleGoogleLogin,
    loginWithEmail: handleEmailLogin,
    signupWithEmail: handleSignup,
    logout: handleLogout,
  };
}
