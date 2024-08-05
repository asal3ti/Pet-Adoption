/* 
    useAuth will upadate the token and the token in the local storage
*/
import { useAtom } from "jotai";
import { tokenAtom } from "@/store/atoms";

export const useAuth = () => {
  const [token, setToken] = useAtom(tokenAtom);

  const setAuthToken = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem("jwt-token", newToken);
  };

  return { token, setAuthToken };
};
