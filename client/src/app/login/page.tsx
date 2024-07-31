"use client";
// src/app/signup/page.tsx
import { SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        setSuccess("Sign up successful!");
        router.push("/login"); // Redirect to login page
      } else {
        const { message } = await res.json();
        setError(message);
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center">
      <div className="container mx-auto max-w-md shadow-md hover:shadow-lg transition duration-300">
        <div className="py-12 p-10 bg-white rounded-xl">
          <h1 className="text-2xl font-bold mb-6">Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="mr-4 text-gray-700 font-bold inline-block mb-2" htmlFor="email">Email address</label>
              <input
                type="email"
                className="border bg-gray-100 py-2 px-4 w-full outline-none focus:ring-2 focus:ring-indigo-400 rounded"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label className="mr-4 text-gray-700 font-bold inline-block mb-2" htmlFor="password">Password</label>
              <input
                type="password"
                className="border bg-gray-100 py-2 px-4 w-full outline-none focus:ring-2 focus:ring-indigo-400 rounded"
                placeholder="Enter your password"
                value={password}
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setPassword(e.target.value)
                }
                required
              />
            </div>
            {error && (
              <div className="text-red-500 text-sm mb-6">
                {error}
              </div>
            )}
            {success && (
              <div className="text-green-500 text-sm mb-6">
                {success}
              </div>
            )}
            <button className="w-full mt-6 text-indigo-50 font-bold bg-indigo-600 py-3 rounded-md hover:bg-indigo-500 transition duration-300" type="submit">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
