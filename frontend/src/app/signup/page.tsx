"use client";

import { useState } from "react";

export default function SignupPage() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async () => {

    try {

      const response = await fetch(
        "http://localhost:8000/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      setMessage(data.message);

    } catch (error) {

      console.log(error);

      setMessage("Backend connection failed");

    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">

      <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-3xl p-8">

        <h1 className="text-4xl font-bold mb-8 text-center">
          Create Account
        </h1>

        <div className="space-y-5">

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 outline-none"
          />

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
            onClick={handleSignup}
            className="w-full p-4 rounded-2xl bg-white text-black font-semibold"
          >
            Create Account
          </button>

          <p className="text-center text-gray-400">
            {message}
          </p>

        </div>

      </div>

    </main>
  );
}