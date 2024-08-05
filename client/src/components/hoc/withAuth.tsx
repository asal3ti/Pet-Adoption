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

        const tokenToVerify = storedToken || token;
        if (tokenToVerify) {
          const res = await verify(tokenToVerify);
          if (res.ok) {
            router.push("/dashboard");
            return;
          }
        }

        setLoading(false);
      };

      initializeToken();
    }, [router, setToken, token]);

    if (loading) return <Loading />;

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};
