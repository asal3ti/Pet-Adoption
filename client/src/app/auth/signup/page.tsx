"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { signup } from "@/services/authService";
import { FormInput, withAuth } from "@/components";
import { CreateUserDTO } from "@/dtos";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

const SignUpPage: React.FC = () => {
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
    mode: "onBlur", // or "onChange" for validation on input change
  });

  const onSubmit = async (data: CreateUserDTO) => {
    const { password, passwordConfirm } = data;

    // Check if passwords match
    if (password !== passwordConfirm) {
      setError("passwordConfirm", {
        type: "manual",
        message: "Passwords do not match.",
      });
      return;
    }

    try {
      const { token } = await signup(data);
      setAuthToken(token);
      router.push("/dashboard"); // Redirect to dashboard page
    } catch (error: unknown) {
      // Handle unexpected errors
      reset({
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        email: "",
        password: "",
        passwordConfirm: "",
      });

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
  }, [errors, clearErrors]);

  return (
    <div className="min-h-screen bg-customBg flex items-center">
      <div className="container mx-auto max-w-md shadow-md hover:shadow-lg transition duration-300 mt-5">
        <div className="relative flex items-center justify-center mb-8">
          <Image
            priority
            src={"/cat-signup.png"}
            alt="Cat-signup"
            width={150}
            height={150}
            className="absolute"
          />
        </div>
        <div className="py-12 p-10 bg-white rounded-xl">
          <h1 className="text-2xl font-bold mb-6">Sign Up</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              name="firstName"
              control={control}
              rules={{ required: "First Name is required" }}
              placeholder="Enter your first name"
              label="First Name"
              error={errors.firstName?.message?.toString()}
            />
            <FormInput
              name="lastName"
              control={control}
              rules={{ required: "Last Name is required" }}
              placeholder="Enter your last name"
              label="Last Name"
              error={errors.lastName?.message?.toString()}
            />
            <FormInput
              name="phone"
              control={control}
              rules={{
                required: "Phone Number is required",
                pattern: {
                  value: /^\d{10}$/,
                  message: "Invalid phone number. It should be 10 digits.",
                },
              }}
              placeholder="Enter your phone number"
              label="Phone Number"
              error={errors.phone?.message?.toString()}
            />
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
              placeholder="Enter your email"
              label="Email address"
              type="email"
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
            <FormInput
              name="passwordConfirm"
              control={control}
              rules={{
                required: "Password Confirmation is required",
                pattern: {
                  value:
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&_]{8,}$/,
                  message:
                    "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, and one number",
                },
              }}
              placeholder="Confirm your password"
              label="Confirm Password"
              type="password"
              error={errors.passwordConfirm?.message?.toString()}
            />
            {errors.api && (
              <div className="text-red-500 text-sm mb-6">
                {errors.api.message?.toString()}
              </div>
            )}
            <div className="">
              <p className="text-sm">
                Have an account?{" "}
                <Link
                  href={"/auth/login"}
                  className="underline text-blue-600 hover:text-blue-800"
                >
                  Log in
                </Link>
              </p>
            </div>
            <button
              className="w-full mt-6 text-white font-bold bg-black py-3 rounded-md hover:bg-gray-800 transition duration-300"
              type="submit"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withAuth(SignUpPage);
