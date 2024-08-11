"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { tokenAtom } from "@/store/atoms";
import { verify } from "@/services/authService";
import { Loading } from "../loading/Loading";

export const withAuth = (WrappedComponent: React.FC) => {
  const AuthComponent: React.FC = (props) => {
    const [token, setToken] = useAtom(tokenAtom);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      const initializeToken = async () => {
        const storedToken = localStorage.getItem("jwt-token");
        if (storedToken) {
          setToken(storedToken);
        }

        // Verify the token if it exists
        try {
          (await verify(storedToken || token)) && router.push("/dashboard"); // Set loading to false if token is valid
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      };

      initializeToken();
    }, [router, setToken, token]);

    if (loading) return <Loading />;

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};
