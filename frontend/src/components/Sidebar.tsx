"use client";

import {
  LayoutDashboard,
  Sparkles,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

import { useRouter } from "next/navigation";

export default function Sidebar() {

  const router = useRouter();

  const handleLogout = () => {

    localStorage.removeItem(
      "luminaflow_user"
    );

    router.push("/login");
  };

  return (
    <aside className="w-[280px] bg-white/5 border-r border-white/10 p-6 flex flex-col justify-between">

      <div>

        <h1 className="text-4xl font-bold mb-14">
          LuminaFlow AI
        </h1>

        <nav className="space-y-4">

          <button
            onClick={() => router.push("/dashboard")}
            className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl bg-white text-black font-semibold hover:scale-[1.02] transition"
          >
            <LayoutDashboard size={22} />
            Dashboard
          </button>

          <button
            onClick={() => router.push("/ai-studio")}
            className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl bg-white/5 hover:bg-white/10 transition"
          >
            <Sparkles size={22} />
            AI Studio
          </button>

          <button
            className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl bg-white/5 hover:bg-white/10 transition"
          >
            <BarChart3 size={22} />
            Analytics
          </button>

          <button
            className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl bg-white/5 hover:bg-white/10 transition"
          >
            <Settings size={22} />
            Settings
          </button>

        </nav>

      </div>

      <button
        onClick={handleLogout}
        className="w-full flex items-center justify-center gap-4 px-5 py-4 rounded-2xl bg-white text-black font-semibold hover:scale-[1.02] transition"
      >
        <LogOut size={22} />
        Logout
      </button>

    </aside>
  );
}