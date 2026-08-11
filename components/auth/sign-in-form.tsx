"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { LockIcon, MailIcon } from "@/components/ui/icons";
import { TextField } from "@/components/ui/text-field";

const MOCK_CREDENTIALS = {
  email: "name@company.com",
  password: "••••••••",
};

export function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Mock auth — no backend yet
    console.info("Sign in submitted", {
      email: email || MOCK_CREDENTIALS.email,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
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

      <Button type="submit" fullWidth>
        Sign In
      </Button>
    </form>
  );
}
