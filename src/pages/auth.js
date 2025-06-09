import React from "react";
import Layout from "../components/Layout/Layout";
import AuthForm from "../components/Auth/AuthForm";

export default function AuthPage() {
  return (
    <Layout>
      <main className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
        <AuthForm />
      </main>
    </Layout>
  );
}
