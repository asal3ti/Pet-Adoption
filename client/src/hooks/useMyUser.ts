/* 
    useAuth will call the userService and call it every time has a change
    this to the purpose to avoit useEffect for fetching
*/
import useSWR from "swr";
import { getMyUser } from "@/services/userService";
import { tokenAtom } from "@/store/atoms";
import { useAtom } from "jotai";

export const useMyUser = () => {
  const [token] = useAtom(tokenAtom);
  const trigger = token ? "/user" : null; // the first parameter is only to trigger the hook

  const fetcher = () => getMyUser(token).then((res) => res.json());

  const { data, error, mutate } = useSWR(trigger, fetcher);

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
