"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { VisibilityIcon, VisibilityOffIcon } from "@/components/ui/icons";
import { PasswordStrengthMeter } from "@/components/ui/password-strength-meter";
import { TextField } from "@/components/ui/text-field";
import { useAuth } from "@/lib/auth-context";

export function RegisterForm() {
  const router = useRouter();
  const { register } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await register(fullName, email, password);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
      {error && (
        <p className="rounded bg-error-container/20 px-3 py-2 text-sm text-error">{error}</p>
      )}

      <TextField
        id="fullName"
        name="fullName"
        type="text"
        label="Full Name"
        autoComplete="name"
        placeholder="Jane Doe"
        value={fullName}
        onChange={(event) => setFullName(event.target.value)}
        required
        className="h-11 rounded border-outline-variant bg-surface-container-lowest px-4 py-0"
      />

      <TextField
        id="email"
        name="email"
        type="email"
        label="Work Email"
        autoComplete="email"
        placeholder="jane@company.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
        className="h-11 rounded border-outline-variant bg-surface-container-lowest px-4 py-0"
      />

      <div>
        <TextField
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          label="Password"
          autoComplete="new-password"
          placeholder="••••••••"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          className="h-11 rounded border-outline-variant bg-surface-container-lowest py-0 pr-10 pl-4"
          trailingAction={
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="text-on-surface-variant transition-colors hover:text-on-surface"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </button>
          }
        />
        <PasswordStrengthMeter password={password} />
      </div>

      <Button type="submit" size="md" fullWidth disabled={submitting}>
        {submitting ? "Creating account..." : "Register"}
      </Button>
    </form>
  );
}
