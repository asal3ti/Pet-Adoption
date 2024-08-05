"use client";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";

import { useEffect } from "react";
import { login } from "@/services/authService";
import Image from "next/image";
import { useAtom } from "jotai";
import { tokenAtom } from "@/store/atoms";
import Link from "next/link";
import { CreateUserDTO } from "@/dtos";

export default function SignUpPage() {
  const [, setToken] = useAtom(tokenAtom);
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<CreateUserDTO>({
    mode: "onBlur", // or "onChange" for validation on input change
  });
  const router = useRouter();

  const onSubmit = async (data: CreateUserDTO) => {
    try {
      const res = await login(data);
      if (res.ok) {
        const { token } = await res.json();
        setToken(token);
        localStorage.setItem("jwt-token", token);
        router.push("/dashboard"); // Redirect to dashboard page
      } else {
        const { message } = await res.json();
        setError("api", { type: "manual", message });
      }
    } catch (error: unknown) {
      // TypeScript error handling
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An error occurred. Please try again.";
      setError("api", {
        type: "manual",
        message: errorMessage,
      });
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const timer = setTimeout(() => {
        clearErrors();
      }, 2000);

      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(errors), clearErrors]);

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
