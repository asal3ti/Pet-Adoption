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
    <div className="min-h-screen bg-customBg flex  items-center">
      <div className="container mx-auto max-w-md shadow-md hover:shadow-lg transition duration-300 mt-5">
        <div className="relative flex items-center justify-center mb-8">
          <Image
            priority
            src={"/cat-login.png"}
            alt="Cat-signup"
            width={150}
            height={150}
            className="absolute"
          />
        </div>
        <div className="py-12 p-10 bg-white rounded-xl">
          <h1 className="text-2xl font-bold mb-6">Login</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
              <label
                className="mr-4 text-gray-700 font-bold inline-block mb-2"
                htmlFor="email"
              >
                Email address
              </label>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                    message: "Invalid email address",
                  },
                }}
                render={({ field }) => (
                  <input
                    type="email"
                    className="border bg-gray-100 py-2 px-4 w-full outline-none focus:ring-2 focus:ring-black rounded"
                    placeholder="Enter your email"
                    {...field}
                  />
                )}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">
                  {errors.email.message?.toString()}
                </p>
              )}
            </div>
            <div className="mb-6">
              <label
                className="mr-4 text-gray-700 font-bold inline-block mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <Controller
                name="password"
                control={control}
                rules={{ required: "Password is required" }}
                render={({ field }) => (
                  <input
                    type="password"
                    className="border bg-gray-100 py-2 px-4 w-full outline-none focus:ring-2 focus:ring-black rounded"
                    placeholder="Enter your password"
                    {...field}
                  />
                )}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message?.toString()}
                </p>
              )}
            </div>
            {errors.api && (
              <div className="text-red-500 text-sm mb-6">
                {errors.api.message?.toString()}
              </div>
            )}
            <div className="">
              <p className="text-sm">
                Does not have an account?{" "}
                <Link
                  href={"/signup"}
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
            </button>
          </form>
        </div>
        <div className=""></div>
      </div>
    </div>
  );
}
