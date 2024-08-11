"use client";
import { verify } from "@/services/authService";
import { tokenAtom } from "@/store/atoms";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useAtom(tokenAtom);
  const router = useRouter();
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const initializeToken = async () => {
      // Get the token from local storage
      const storedToken = localStorage.getItem("jwt-token");
      if (storedToken) {
        setToken(storedToken); // Update the atom state
      }
      // Verify the token if it exists
      try {
        (await verify(storedToken || token)) && setLoading(false); // Set loading to false if token is valid
      } catch (error) {
        console.log(error);
        router.push("/");
      }
    };

    initializeToken();
  }, [token, router, setToken]);

  if (loading) {
    return null; // Render nothing while checking
  }

  return <>{children}</>; // Render children if token is present and valid
};
