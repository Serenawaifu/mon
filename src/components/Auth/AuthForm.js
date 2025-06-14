// src/components/Auth/AuthForm.js

import React, { useState, useEffect } from "react";
import {
  AiOutlineLogin as LogIn,
  AiOutlineLogout as LogOut,
  AiOutlineMail as Mail,
  AiOutlineShield as ShieldCheck,
  AiOutlineWallet as Wallet,
  AiOutlineLoading as Loader2,
} from "react-icons/ai"; // Updated imports
import { motion, AnimatePresence } from "framer-motion";

// Import your Firebase auth helpers (assumed)
// import {
//   auth,
//   googleProvider,
//   loginWithGoogle,
//   loginWithEmail,
//   signupWithEmail,
//   logout,
// } from "../../lib/firebase";

// Placeholder imports for this example (replace with your real imports)
const loginWithGoogle = async () => {};
const loginWithEmail = async () => {};
const signupWithEmail = async () => {};
const logout = async () => {};
const auth = {
  onAuthStateChanged: (cb) => {
    // Fake unsub
    return () => {};
  },
};

export default function AuthForm() {
  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login"); // 'login' or 'signup'
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
      setError("");
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Clear errors on mode change
  useEffect(() => {
    setError("");
    setPassword("");
  }, [mode]);

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      await loginWithGoogle();
    } catch (e) {
      setError(e.message || "Google login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleWalletLogin = async () => {
    setError("");
    setLoading(true);
    try {
      // Your WalletConnect logic here
      alert("WalletConnect login - not implemented in this snippet");
    } catch (e) {
      setError(e.message || "WalletConnect login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (mode === "login") {
        await loginWithEmail(email, password);
      } else {
        await signupWithEmail(email, password);
      }
    } catch (e) {
      setError(e.message || (mode === "login" ? "Login failed" : "Signup failed"));
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
    } catch (e) {
      setError(e.message || "Logout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-card transition-shadow duration-200 hover:shadow-card-md">
      <AnimatePresence mode="wait" initial={false}>
        {user ? (
          <motion.div
            key="auth-logged-in"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.3 } }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
            aria-live="polite"
          >
            <div className="text-2xl font-extrabold text-gray-900 flex items-center gap-2 mb-4">
              <ShieldCheck className="w-6 h-6 text-green-600" />
              Welcome, {user.displayName || user.email || "User"}!
            </div>
            <p className="text-gray-600 mb-8">
              You’re signed in to Wulu. Enjoy exploring anime & manga!
            </p>
            <button
              onClick={handleLogout}
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-black text-white font-semibold text-lg shadow hover:bg-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
              aria-label="Log out"
            >
              {loading ? (
                <Loader2 className="animate-spin w-5 h-5" />
              ) : (
                <LogOut className="w-5 h-5" />
              )}
              Log out
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="auth-form"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.3 } }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
            aria-live="polite"
          >
            <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
              {mode === "login" ? "Log in to Wulu" : "Create an Account"}
            </h2>

            <div className="space-y-4 mb-8">
              <button
                onClick={handleGoogleLogin}
                disabled={loading}
                type="button"
                className="w-full inline-flex items-center justify-center gap-3 py-3 rounded-lg border border-gray-200 bg-gray-100 text-gray-900 font-semibold text-lg shadow-sm hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1"
              >
                <LogIn className="w-5 h-5" />
                Sign in with Google
              </button>
              <button
                onClick={handleWalletLogin}
                disabled={loading}
                type="button"
                className="w-full inline-flex items-center justify-center gap-3 py-3 rounded-lg border border-gray-200 bg-gray-100 text-gray-900 font-semibold text-lg shadow-sm hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1"
              >
                <Wallet className="w-5 h-5" />
                Sign in with WalletConnect
              </button>
            </div>

            <form onSubmit={handleEmailSubmit} className="space-y-6" noValidate>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-semibold text-gray-700"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  disabled={loading}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-black focus:ring-black focus:outline-none focus:ring-1 transition"
                  aria-describedby="email-desc"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-semibold text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                  required
                  disabled={loading}
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-black focus:ring-black focus:outline-none focus:ring-1 transition"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-black text-white font-semibold text-lg shadow hover:bg-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                aria-label={mode === "login" ? "Log in" : "Sign up"}
              >
                {loading ? (
                  <Loader2 className="animate-spin w-5 h-5" />
                ) : (
                  <Mail className="w-5 h-5" />
                )}
                {mode === "login" ? "Log in with Email" : "Create an Account"}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              {mode === "login" ? (
                <>
                  Don't have an account?{" "}
                  <button
                    onClick={() => setMode("signup")}
                    className="font-semibold text-black hover:underline focus:outline-none"
                    type="button"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={() => setMode("login")}
                    className="font-semibold text-black hover:underline focus:outline-none"
                    type="button"
                  >
                    Log in
                  </button>
                </>
              )}
            </div>

            {error && (
              <div
                role="alert"
                className="mt-6 rounded-md bg-red-100 border border-red-300 px-4 py-3 text-sm text-red-700 flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                <span>{error}</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
