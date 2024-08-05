const API_URL = process.env.NEXT_PUBLIC_API_URL + "/auth";
import { CreateUserDTO } from "@/dtos";

// Verify token /api/auth
export const verify = async (token: string): Promise<Response> => {
  const res = await fetch(`${API_URL}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

// Sign user /api/auth/signup
export const signup = async (data: CreateUserDTO): Promise<Response> => {
  if (!data.role) {
    data.role = "user";
  }

  const res = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res;
};

// Login user api/auth
export const login = async (data: CreateUserDTO): Promise<Response> => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res;
};
