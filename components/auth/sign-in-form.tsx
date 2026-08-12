"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { LockIcon, MailIcon } from "@/components/ui/icons";
import { TextField } from "@/components/ui/text-field";
import { useAuth } from "@/lib/auth-context";

export function SignInForm() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {error && (
        <p className="rounded bg-error-container/20 px-3 py-2 text-sm text-error">{error}</p>
      )}

      <TextField
        id="email"
        name="email"
        type="email"
        label="Email Address"
        autoComplete="email"
        placeholder="name@company.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
        leadingIcon={<MailIcon />}
      />

      <TextField
        id="password"
        name="password"
        type="password"
        label="Password"
        autoComplete="current-password"
        placeholder="••••••••"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
        leadingIcon={<LockIcon />}
        trailingLabel={
          <Link
            href="#"
            className="text-xs font-semibold uppercase tracking-[0.02em] leading-4 text-primary transition-colors hover:text-primary-container"
          >
            Forgot password?
          </Link>
        }
      />

      <Button type="submit" fullWidth disabled={submitting}>
        {submitting ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
}
