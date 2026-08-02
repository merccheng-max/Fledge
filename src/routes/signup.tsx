import { createFileRoute } from "@tanstack/react-router";

import { Header } from "@/components/fledge/header";
import { AuthForm } from "@/components/fledge/auth-form";

export const Route = createFileRoute("/signup")({
  component: SignupPage,
});

function SignupPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-sm px-6 py-16">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground">
            Sign up
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Save trips and check off gear as you shop.
          </p>
        </div>
        <div className="mt-8">
          <AuthForm mode="signup" />
        </div>
      </main>
    </div>
  );
}
