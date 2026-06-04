"use client";

import { useState, useEffect } from "react";

export default function SchedulerPage() {

  const [caption, setCaption] = useState("");

  const [platform, setPlatform] =
    useState("LinkedIn");

  const [scheduledDate, setScheduledDate] =
    useState("");

  const [scheduledTime, setScheduledTime] =
    useState("");

  const [posts, setPosts] = useState<any[]>([]);

  const fetchPosts = async () => {

    try {

      const response = await fetch(
        "http://localhost:8000/scheduled-posts"
      );

      const data = await response.json();

      setPosts(data);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {

    fetchPosts();

  }, []);

  const schedulePost = async () => {

    try {

      const response = await fetch(
        "http://localhost:8000/schedule-post",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            caption,
            platform,
            scheduled_date:
              scheduledDate,
            scheduled_time:
              scheduledTime,
            image_path: "",
          }),
        }
      );

      const data =
        await response.json();

      alert(data.message);

      setCaption("");

      setScheduledDate("");

      setScheduledTime("");

      fetchPosts();

    } catch (error) {

      console.log(error);

      alert(
        "Failed to schedule post"
      );
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-10">

      <h1 className="text-5xl font-bold mb-8">
        Scheduler
      </h1>

      <div className="bg-[#0d0d18] p-8 rounded-3xl">

        <textarea
          placeholder="Enter Caption"
          rows={6}
          value={caption}
          onChange={(e) =>
            setCaption(
              e.target.value
            )
          }
          className="w-full p-4 rounded-xl bg-black border border-gray-700 mb-4"
        />

        <select
          value={platform}
          onChange={(e) =>
            setPlatform(
              e.target.value
            )
          }
          className="w-full p-4 rounded-xl bg-black border border-gray-700 mb-4"
        >
          <option>LinkedIn</option>
          <option>Instagram</option>
          <option>Twitter/X</option>
          <option>Facebook</option>
        </select>

        <input
          type="date"
          value={scheduledDate}
          onChange={(e) =>
            setScheduledDate(
              e.target.value
            )
          }
          className="w-full p-4 rounded-xl bg-black border border-gray-700 mb-4"
        />

        <input
          type="time"
          value={scheduledTime}
          onChange={(e) =>
            setScheduledTime(
              e.target.value
            )
          }
          className="w-full p-4 rounded-xl bg-black border border-gray-700"
        />

        <p className="text-sm text-gray-400 mt-2 mb-6">
          Time uses 24-hour format.
          Example: 09:00 = 9 AM,
          14:00 = 2 PM,
          23:00 = 11 PM
        </p>

        <button
          onClick={schedulePost}
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl"
        >
          Schedule Post
        </button>

      </div>

      <div className="mt-10">

        <h2 className="text-3xl font-bold mb-6">
          Scheduled Posts
        </h2>

        <div className="overflow-x-auto rounded-2xl border border-gray-700">

          <table className="w-full">

            <thead>

              <tr className="bg-purple-600">

                <th className="p-4">
                  ID
                </th>

                <th className="p-4">
                  Platform
                </th>

                <th className="p-4">
                  Date
                </th>

                <th className="p-4">
                  Time
                </th>

                <th className="p-4">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {posts.map((post) => (

                <tr
                  key={post.id}
                  className="border-t border-gray-700 text-center"
                >

                  <td className="p-4">
                    {post.id}
                  </td>

                  <td className="p-4">
                    {post.platform}
                  </td>

                  <td className="p-4">
                    {post.scheduled_date}
                  </td>

                  <td className="p-4">
                    {post.scheduled_time}
                  </td>

                  <td className="p-4">

                    <span className="px-3 py-1 bg-yellow-600 rounded-full text-sm">

                      {post.status}

                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </main>
  );
}