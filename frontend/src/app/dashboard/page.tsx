"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "../../components/Sidebar";
import AnalyticsCard from "../../components/AnalyticsCard";

export default function DashboardPage() {

  const router = useRouter();

  const [user, setUser] = useState("");

  const [captions, setCaptions] = useState<any[]>(([]));

  useEffect(() => {

    const savedUser = localStorage.getItem(
      "luminaflow_user"
    );

    if (!savedUser) {

      router.push("/login");

    } else {

      setUser(savedUser);

    }

    loadCaptions();

  }, []);

  const loadCaptions = async () => {

    try {

      const response = await fetch(
        "http://localhost:8000/captions"
      );

      const data = await response.json();

      setCaptions(data.reverse());

    } catch (error) {

      console.log(error);

    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex">

      {/* Sidebar */}

      <Sidebar />

      {/* Main Content */}

      <section className="flex-1 p-10 overflow-y-auto">

        {/* Header */}

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-6xl font-bold tracking-tight">
              Dashboard
            </h1>

            <p className="text-gray-400 mt-3 text-lg">
              Welcome back, {user} 👋
            </p>

          </div>

          <div className="bg-white/5 border border-white/10 px-5 py-3 rounded-2xl">
            <p className="text-sm text-gray-400">
              LuminaFlow AI
            </p>
          </div>

        </div>

        {/* Analytics */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">

          <AnalyticsCard
            title="Total Reach"
            value="24.5K"
          />

          <AnalyticsCard
            title="Engagement"
            value="12.8%"
          />

          <AnalyticsCard
            title="Generated Captions"
            value={String(captions.length)}
          />

        </div>

        {/* Activity Section */}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-10">

          {/* Recent Captions */}

          <div className="xl:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-8">

            <div className="flex items-center justify-between mb-8">

              <h2 className="text-3xl font-bold">
                Recent AI Captions
              </h2>

              <button
                className="bg-white text-black px-4 py-2 rounded-xl font-medium hover:scale-105 transition"
              >
                View All
              </button>

            </div>

            <div className="space-y-5 max-h-[500px] overflow-y-auto pr-2">

              {captions.length === 0 ? (

                <div className="bg-white/5 rounded-2xl p-6 text-gray-400">
                  No captions generated yet.
                </div>

              ) : (

                captions.map((caption, index) => (

                  <div
                    key={index}
                    className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-6 hover:scale-[1.01] transition"
                  >

                    <p className="text-sm text-gray-400 mb-3">
                      Topic: {caption.topic}
                    </p>

                    <p className="whitespace-pre-line leading-relaxed">
                      {caption.content}
                    </p>

                  </div>

                ))

              )}

            </div>

          </div>

          {/* AI Insights */}

          <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-3xl p-8">

            <h2 className="text-3xl font-bold mb-8">
              AI Insights
            </h2>

            <div className="space-y-6">

              <div className="bg-black/40 rounded-2xl p-5 border border-white/10">

                <p className="text-gray-400 text-sm">
                  Trending Tone
                </p>

                <h3 className="text-2xl font-bold mt-2">
                  Professional 🚀
                </h3>

              </div>

              <div className="bg-black/40 rounded-2xl p-5 border border-white/10">

                <p className="text-gray-400 text-sm">
                  Best Performing Topic
                </p>

                <h3 className="text-2xl font-bold mt-2">
                  AI Automation
                </h3>

              </div>

              <div className="bg-black/40 rounded-2xl p-5 border border-white/10">

                <p className="text-gray-400 text-sm">
                  AI Recommendation
                </p>

                <h3 className="text-lg font-semibold mt-2 leading-relaxed">
                  Generate more startup-focused content this week for higher engagement.
                </h3>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}