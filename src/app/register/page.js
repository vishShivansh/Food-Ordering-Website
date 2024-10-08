"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import googleImg from "../../../public/Google.png";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userCreated, setUserCreated] = useState(false);
  const [creatingUser, setCreatingUser] = useState(false);
  const [error, setError] = useState("");

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setCreatingUser(true);
    setError("");
    setUserCreated(false);

    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      setUserCreated(true);
      setEmail("");
      setPassword("");
    } else {
      const errorMessage = await response.text();
      setError(
        errorMessage || "An error has occurred. Please try again later."
      );
      setEmail("");
      setPassword("");
    }

    setCreatingUser(false);
  }

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Register</h1>
      {userCreated && (
        <div className="my-4 text-center">
          User created. <br /> Now you can{" "}
          <Link className="underline" href={"/login"}>
            Login &raquo;
          </Link>
        </div>
      )}
      {error && (
        <div
          className="my-4 text-center text-red-500"
          role="alert"
          aria-live="assertive"
        >
          {error}
        </div>
      )}
      <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          disabled={creatingUser}
          required
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          disabled={creatingUser}
          required
        />
        <button type="submit" disabled={creatingUser}>
          {creatingUser ? "Creating..." : "Register"}
        </button>
        <div className="my-4 text-center text-gray-500">
          Or Login with provider
        </div>

        <button
          type="button"
          className="flex gap-4 justify-center"
          onClick={() => signIn("google")}
        >
          <Image src={googleImg} width={24} height={24} alt="Google Logo" />
          Login with Google
        </button>
        <div className="text-center my-4 text-gray-500 border-t pt-4">
          Existing account?{" "}
          <Link className="underline" href={"/login"}>
            Login here &raquo;
          </Link>
        </div>
      </form>
    </section>
  );
}
