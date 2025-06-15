import React from "react";
import Layout from "../components/Layout/Layout";
import AuthForm from "../components/Auth/AuthForm";
import WalletConnectButton from "../components/Auth/WalletConnectButton";

/**
 * Authentication Page
 * This page allows users to authenticate using WalletConnect and a form.
 */
export default function AuthPage() {
  return (
    <Layout>
      <main className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
        <h1 className="text-2xl font-bold mb-6">Authenticate</h1>
        <WalletConnectButton />
        <div className="my-6 w-full max-w-md">
          <AuthForm />
        </div>
      </main>
    </Layout>
  );
}
