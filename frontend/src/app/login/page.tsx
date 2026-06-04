"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const handleLogin = async () => {

    try {

      const response = await fetch(
        "http://localhost:8000/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      setMessage(data.message);

      // Save logged in user
      if (data.message === "Login successful") {

        localStorage.setItem(
          "luminaflow_user",
          data.name
        );

        // Redirect to dashboard
        router.push("/dashboard");
      }

    } catch (error) {

      setMessage("Backend connection failed");

    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">

      <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-3xl p-8">

        <h1 className="text-4xl font-bold mb-8 text-center">
          Welcome Back
        </h1>

        <div className="space-y-5">

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 outline-none"
          />

          <button
            onClick={handleLogin}
            className="w-full p-4 rounded-2xl bg-white text-black font-semibold"
          >
            Login
          </button>

          <p className="text-center text-gray-400">
            {message}
          </p>

        </div>

      </div>

    </main>
  );
}