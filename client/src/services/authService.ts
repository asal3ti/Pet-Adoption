import { CreateUserDTO } from "@/dtos";

// Sign user
export const signup = async (data: CreateUserDTO): Promise<Response> => {
  if (!data.role) {
    data.role = "user";
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  return res;
};
