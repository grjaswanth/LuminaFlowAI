"use client";

import { useState } from "react";

export default function AIStudioPage() {

  const [topic, setTopic] = useState("");

  const [tone, setTone] = useState("Professional");

  const [caption, setCaption] = useState("");

  const [imageDescription, setImageDescription] =
    useState("");

  const [selectedImage, setSelectedImage] =
    useState<File | null>(null);

  const [previewUrl, setPreviewUrl] =
    useState("");

  const [loading, setLoading] = useState(false);

  // Image Selection
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file = e.target.files?.[0];

    if (file) {

      setSelectedImage(file);

      setPreviewUrl(
        URL.createObjectURL(file)
      );
    }
  };

  // Upload Image
  const uploadImage = async () => {

  if (!selectedImage) return;

  setLoading(true);

  try {

    const formData = new FormData();

    formData.append(
      "file",
      selectedImage
    );

    const response = await fetch(
      "http://localhost:8000/upload-image",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    setImageDescription(
      data.description
    );

    // Auto-fill topic with AI analysis
    setTopic(data.description);

  } catch (error) {
 
    console.log(error);

  } finally {

    setLoading(false);

  }
};

  // Generate Caption
  const generateCaption = async () => {

    if (!topic) return;

    setLoading(true);

    try {

      const response = await fetch(
        "http://localhost:8000/generate-caption",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            topic,
            tone,
          }),
        }
      );

      const data = await response.json();

console.log(data);

setCaption(data.caption);

    } catch (error) {

      setCaption(
        "Error generating caption"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">

      <div className="max-w-6xl mx-auto"> </div>

        {/* Header */}

        <div className="mb-12">

          <h1 className="text-7xl font-bold tracking-tight">
            AI Studio
          </h1>

          <p className="text-gray-400 text-xl mt-4">
            Generate AI-powered captions from topics and images
          </p>

        </div>

        {/* Upload Section */}

        <div className="bg-[#0d0d18] border border-purple-500/20 rounded-[32px] p-8 mb-10 shadow-[0_0_40px_rgba(168,85,247,0.12)]">

          <h2 className="text-3xl font-bold mb-6">
            Upload Image
          </h2>

          <div className="mb-6">

  <label
    htmlFor="image-upload"
    className="
      flex
      items-center
      justify-center
      w-full
      h-32
      border-2
      border-dashed
      border-purple-500/40
      rounded-3xl
      cursor-pointer
      bg-black/30
      hover:bg-black/50
      transition
    "
  ></label>
    <div className="mb-6">

  <label
    htmlFor="image-upload"
    className="
      flex
      items-center
      justify-center
      w-full
      h-32
      border-2
      border-dashed
      border-purple-500/40
      rounded-3xl
      cursor-pointer
      bg-black/30
      hover:bg-black/50
      transition
    "
  >
    <div className="text-center">

      <p className="text-xl font-semibold">
        📸 Upload Image
      </p>

      <p className="text-gray-400 text-sm mt-2">
        JPG, PNG, JPEG
      </p>

      {selectedImage && (
        <p className="text-purple-400 mt-3 text-sm">
          {selectedImage.name}
        </p>
      )}

    </div>
  </label>

  <input
    id="image-upload"
    type="file"
    accept="image/*"
    onChange={handleImageChange}
    className="hidden"
  />

</div>

          {previewUrl && (

            <img
              src={previewUrl}
              alt="Preview"
              className="w-full max-h-[500px] object-contain rounded-3xl mb-6 border border-white/10 bg-black"
            />

          )}

          <button
            onClick={uploadImage}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-violet-500 hover:scale-105 transition font-semibold"
          >
            {loading
              ? "Analyzing..."
              : "Analyze Image"}
          </button>

          {imageDescription && (

            <div className="mt-8 bg-black/40 border border-white/10 rounded-2xl p-6">

              <h3 className="text-2xl font-bold mb-4">
                AI Image Analysis
              </h3>

              <p className="text-gray-300 text-lg">
                {imageDescription}
              </p>

            </div>

          )}

        </div>

        {/* Caption Generator */}

        <div className="bg-[#0d0d18] border border-purple-500/20 rounded-[32px] p-8 shadow-[0_0_40px_rgba(168,85,247,0.12)]">

          <h2 className="text-3xl font-bold mb-8">
            Generate Caption
          </h2>

          <div className="space-y-6">

            <input
              type="text"
              placeholder="Enter content topic..."
              value={topic}
              onChange={(e) =>
                setTopic(e.target.value)
              }
              className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-5 outline-none text-lg"
            />

            <select
              value={tone}
              onChange={(e) =>
                setTone(e.target.value)
              }
              className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-5 outline-none text-lg"
            >
              <option>Professional</option>
              <option>Luxury</option>
              <option>Motivational</option>
              <option>Startup</option>
              <option>Funny</option>
              <option>Corporate</option>
            </select>

            <button
              onClick={generateCaption}
              className="px-8 py-4 rounded-2xl bg-white text-black font-semibold hover:scale-105 transition"
            >
              {loading
                ? "Generating..."
                : "Generate Caption"}
            </button>

          </div>

          {/* Output */}

          <div className="mt-10 bg-black/40 border border-white/10 rounded-3xl p-8 min-h-[220px]">

            <h3 className="text-2xl font-bold mb-6">
              Generated Caption
            </h3>

            <p className="whitespace-pre-line text-gray-300 leading-8 text-lg">
              {caption || "Your AI caption will appear here..."}
            </p>

          </div>

        </div>

      </div>

    </main>
  );
}