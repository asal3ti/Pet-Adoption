/* 
  Use users is going to call the api and then use the 
  global state until the global state is empty again.

  Every change in the database needs to change the global state too
*/

import useSWR from "swr";
import { useAtom } from "jotai";
import { tokenAtom, usersAtom } from "@/store/atoms";
import { getAllUsers } from "@/services/userService";

export const useUsers = () => {
  const [users, setUsers] = useAtom(usersAtom);
  const [token] = useAtom(tokenAtom);
  const trigger = users.length === 0 ? "/users" : null; // Only trigger fetch if needed

  const fetcher = () => getAllUsers(token);

  const { data, error, mutate } = useSWR(trigger, fetcher, {
    onSuccess: (data) => {
      setUsers(data);
    },
  });

  return {
    users: users || data,
    isLoading: !error && !data && users.length === 0,
    isError: error,
    mutate,
  };
};
