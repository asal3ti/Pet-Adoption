/* 
  Use pets is going to call the api and then use the 
  global state until the global state is empty again.

  Every change in the database needs to change the global state too

*/

import useSWR from "swr";
import { useAtom } from "jotai";
import { petsAtom } from "@/store/atoms";
import { getAllPets } from "@/services/petService";

export const usePets = () => {
  const [pets, setPets] = useAtom(petsAtom);
  const trigger = pets.length === 0 ? "/pets" : null; // Only trigger fetch if needed

  const fetcher = () => getAllPets().then((res) => res.json());

  const { data, error, mutate } = useSWR(trigger, fetcher, {
    onSuccess: (data) => {
      setPets(data);
    },
  });

  return {
    pets: pets || data,
    isLoading: !error && !data && pets.length === 0,
    isError: error,
    mutate,
  };
};
