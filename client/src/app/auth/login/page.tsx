"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { login } from "@/services/authService";
import { FormInput, withAuth } from "@/components";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { CreateUserDTO } from "@/dtos";

const LoginPage: React.FC = () => {
  const { setAuthToken } = useAuth();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<CreateUserDTO>({
    mode: "onBlur",
  });

  const onSubmit = async (data: CreateUserDTO) => {
    try {
      const { token } = await login(data);
      setAuthToken(token);
      router.push("/dashboard");
    } catch (error: unknown) {
      reset({
        email: data.email,
        password: "",
      });
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An error occurred. Please try again.";
      setError("api", {
        type: "manual",
        message: errorMessage,
      });

      // Reset form values
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const timer = setTimeout(() => {
        clearErrors();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [errors, clearErrors]);

  return (
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
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&_]{8,}$/,
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
              <div className="text-red-500 text-sm mb-6">
                {errors.api.message?.toString()}
              </div>
            )}
            <div className="">
              <p className="text-sm">
                Don't have an account?{" "}
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
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withAuth(LoginPage);
