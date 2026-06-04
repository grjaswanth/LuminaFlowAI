"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-white/10">
        <h1 className="text-2xl font-bold tracking-wide">
          LuminaFlow AI
        </h1>

        <button className="px-5 py-2 rounded-full bg-white text-black font-medium hover:scale-105 transition">
          Get Started
        </button>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-32">

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl md:text-8xl font-bold leading-tight"
        >
          AI-Powered <br />
          Social Automation
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-8 text-gray-400 max-w-2xl text-lg"
        >
          Build, automate, and grow your social presence with
          intelligent AI-driven content generation and analytics.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-10 flex gap-4"
        >
          <button className="px-8 py-4 rounded-full bg-white text-black font-semibold hover:scale-105 transition">
            Launch App
          </button>

          <button className="px-8 py-4 rounded-full border border-white/20 hover:bg-white/10 transition">
            Learn More
          </button>
        </motion.div>

      </section>
    </main>
  );
}