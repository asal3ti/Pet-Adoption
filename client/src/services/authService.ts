import { CreateUserDTO } from "@/dtos";

const API_URL = process.env.NEXT_PUBLIC_API_URL + "/auth";

// Helper function to check if response is OK
const handleResponse = async (res: Response) => {
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.msg || "An error occurred");
  }
  return res.json();
};

// Verify token /api/auth
export const verify = async (token: string): Promise<any> => {
  try {
    const res = await fetch(`${API_URL}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await handleResponse(res);
  } catch (error) {
    console.error("Verification Error:", error);
    throw error;
  }
};

// Sign up user /api/auth/signup
export const signup = async (data: CreateUserDTO): Promise<any> => {
  if (!data.role) {
    data.role = "user";
  }

  try {
    const res = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await handleResponse(res);
  } catch (error) {
    console.error("Signup Error:", error);
    throw error;
  }
};

// Login user /api/auth/login
export const login = async (data: CreateUserDTO): Promise<any> => {
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await handleResponse(res);
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
};
