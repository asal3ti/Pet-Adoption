"use client";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const { control, handleSubmit, setError, clearErrors, formState: { errors } } = useForm({
    mode: "onBlur", // or "onChange" for validation on input change
  });
  const router = useRouter();

  const onSubmit = async (data: any) => {
    const { name, email, password, passwordConfirm } = data;

    if (password !== passwordConfirm) {
      setError("passwordConfirm", { type: "manual", message: "Passwords do not match." });
      return;
    }

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        router.push("/login"); // Redirect to login page
      } else {
        const { message } = await res.json();
        setError("api", { type: "manual", message });
      }
    } catch (error) {
      setError("api", { type: "manual", message: "An error occurred. Please try again." });
    }
  };

  return (
    <div className="min-h-screen bg-customBg flex items-center">
      <div className="container mx-auto max-w-md shadow-md hover:shadow-lg transition duration-300">
        <div className="py-12 p-10 bg-white rounded-xl">
          {/* <div className="mb-6 flex justify-center">
            <img src="/path/to/your-image.png" alt="Sign Up" className="w-32 h-32 object-contain" />
          </div> */}
          <h1 className="text-2xl font-bold mb-6">Sign Up</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
              <label className="mr-4 text-gray-700 font-bold inline-block mb-2" htmlFor="name">Name</label>
              <Controller
                name="name"
                control={control}
                rules={{ required: "Name is required" }}
                render={({ field }) => (
                  <input
                    type="text"
                    className="border bg-gray-100 py-2 px-4 w-full outline-none focus:ring-2 focus:ring-black rounded"
                    placeholder="Enter your name"
                    {...field}
                  />
                )}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message?.toString()}</p>}
            </div>
            <div className="mb-6">
              <label className="mr-4 text-gray-700 font-bold inline-block mb-2" htmlFor="email">Email address</label>
              <Controller
                name="email"
                control={control}
                rules={{ required: "Email is required", pattern: { value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, message: "Invalid email address" } }}
                render={({ field }) => (
                  <input
                    type="email"
                    className="border bg-gray-100 py-2 px-4 w-full outline-none focus:ring-2 focus:ring-black rounded"
                    placeholder="Enter your email"
                    {...field}
                  />
                )}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message?.toString()}</p>}
            </div>
            <div className="mb-6">
              <label className="mr-4 text-gray-700 font-bold inline-block mb-2" htmlFor="password">Password</label>
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
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message?.toString()}</p>}
            </div>
            <div className="mb-6">
              <label className="mr-4 text-gray-700 font-bold inline-block mb-2" htmlFor="passwordConfirm">Confirm Password</label>
              <Controller
                name="passwordConfirm"
                control={control}
                rules={{ required: "Please confirm your password" }}
                render={({ field }) => (
                  <input
                    type="password"
                    className="border bg-gray-100 py-2 px-4 w-full outline-none focus:ring-2 focus:ring-black rounded"
                    placeholder="Confirm your password"
                    {...field}
                  />
                )}
              />
              {errors.passwordConfirm && <p className="text-red-500 text-sm">{errors.passwordConfirm.message?.toString()}</p>} 
              {errors.passwordConfirm?.type === "manual" && <p className="text-red-500 text-sm">{errors.passwordConfirm.message?.toString()}</p>}
            </div>
            {errors.api && (
              <div className="text-red-500 text-sm mb-6">
                {errors.api.message?.toString()}
              </div>
            )}
            <button className="w-full mt-6 text-white font-bold bg-black py-3 rounded-md hover:bg-gray-800 transition duration-300" type="submit">
              Sign Up
            </button>
          </form>
        </div><div className=""></div>
      </div>
    </div>
  );
}
