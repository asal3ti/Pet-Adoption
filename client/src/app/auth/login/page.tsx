"use client";
<<<<<<< HEAD:client/src/app/login/page.tsx
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";

import { useEffect } from "react";
import { login } from "@/services/authService";
=======
import Link from "next/link";
>>>>>>> 94d831220638a08b9134370ed3b3d2a20da614c9:client/src/app/auth/login/page.tsx
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useAtom } from "jotai";
import { tokenAtom } from "@/store/atoms";
import { login } from "@/services/authService";
import { FormInput, withAuth } from "@/components";
import { CreateUserDTO } from "@/dtos";
import { useEffect } from "react";

const LoginPage: React.FC = () => {
  const [, setToken] = useAtom(tokenAtom);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<CreateUserDTO>({
    mode: "onBlur",
  });

  const onSubmit = async (data: CreateUserDTO) => {
    try {
      const res = await login(data);
      if (res.ok) {
        const { token } = await res.json();
        setToken(token);
        localStorage.setItem("jwt-token", token);
        router.push("/dashboard");
      } else {
        const { message } = await res.json();
        setError("api", { type: "manual", message });
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An error occurred. Please try again.";
      setError("api", { type: "manual", message: errorMessage });
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
<<<<<<< HEAD:client/src/app/login/page.tsx
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
=======
    <div className="min-h-screen bg-customBg flex items-center">
      <div className="container mx-auto max-w-md shadow-md hover:shadow-lg transition duration-300 mt-5">
        <div className="relative flex items-center justify-center mb-8">
          <Image
            priority
            src={"/cat-login.png"}
            alt="Cat-login"
            width={150}
            height={150}
            className="absolute"
          />
        </div>
        <div className="py-12 p-10 bg-white rounded-xl">
          <h1 className="text-2xl font-bold mb-6">Login</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                  message: "Invalid email address",
                },
              }}
              type="email"
              placeholder="Enter your email"
              label="Email address"
              error={errors.email?.message?.toString()}
            />
            <FormInput
              name="password"
              control={control}
              rules={{
                required: "Password is required",
                pattern: {
                  value:
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, and one number",
                },
              }}
              placeholder="Enter your password"
              label="Password"
              type="password"
              error={errors.password?.message?.toString()}
            />
            {errors.api && (
>>>>>>> 94d831220638a08b9134370ed3b3d2a20da614c9:client/src/app/auth/login/page.tsx
              <div className="text-red-500 text-sm mb-6">
                {error}
              </div>
            )}
<<<<<<< HEAD:client/src/app/login/page.tsx
            {success && (
              <div className="text-green-500 text-sm mb-6">
                {success}
              </div>
            )}
            <button className="w-full mt-6 text-indigo-50 font-bold bg-indigo-600 py-3 rounded-md hover:bg-indigo-500 transition duration-300" type="submit">
              Sign Up
=======
            <div className="">
              <p className="text-sm">
                Does not have an account?{" "}
                <Link
                  href={"/auth/signup"}
                  className="underline text-blue-600 hover:text-blue-800"
                >
                  Sign up
                </Link>
              </p>
            </div>
            <button
              className="w-full mt-6 text-white font-bold bg-black py-3 rounded-md hover:bg-gray-800 transition duration-300"
              type="submit"
            >
              Log in
>>>>>>> 94d831220638a08b9134370ed3b3d2a20da614c9:client/src/app/auth/login/page.tsx
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withAuth(LoginPage);
