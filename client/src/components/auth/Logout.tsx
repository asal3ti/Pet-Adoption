"use client";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { tokenAtom, userAtom } from "@/store/atoms";
const Logout = () => {
  const router = useRouter();
  const [token, setToken] = useAtom(tokenAtom);
  const [user, setUser] = useAtom(userAtom);
  const [users, setUsers] = useAtom(userAtom);
  const logout = () => {
    // remove the token from the local storare
    localStorage.removeItem("jwt-token");
    // remove token from the atom
    setToken("");

    setUser(null);
    setUsers(null);

    // redirect to the landing page
    router.push("/");
  };

  return (
    <button
      onClick={() => logout()}
      className="text-left font-medium py-2 px-2  hover:bg-red-700 text-white text-base rounded-md transition duration-150 ease-in-out border-b-2 border-gray-300 last:border-b-0"
    >
      Log out
    </button>
  );
};

export default Logout;
