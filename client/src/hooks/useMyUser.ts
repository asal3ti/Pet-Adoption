/* 
    useAuth will call the userService and call it every time has a change
    this to the purpose to avoit useEffect for fetching
*/
import useSWR from "swr";
import { getMyUser } from "@/services/userService";
import { tokenAtom, userAtom } from "@/store/atoms";
import { useAtom } from "jotai";

export const useMyUser = () => {
  const [token] = useAtom(tokenAtom);
  const [user, setUser] = useAtom(userAtom);
  const trigger = !user ? "/user" : null; // the first parameter is only to trigger the hook

  const fetcher = () => getMyUser(token);

  const { data, error, mutate } = useSWR(trigger, fetcher, {
    onSuccess: (data) => {
      setUser(data);
    },
  });

  return {
    user: user || data,
    isLoading: !error && !data && !user,
    isError: error,
    mutate,
  };
};
