import useSWR from "swr";
import { useAtom } from "jotai";
import { petDetailAtom, petsAtom } from "@/store/atoms";
const API_URL = process.env.NEXT_PUBLIC_API_URL + "/pets";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const usePets = () => {
  const [pets, setPets] = useAtom(petsAtom);
  // check if pets atom has pets, if not we call the api.
  const { data, error, mutate } = useSWR(
    pets.length === 0 ? `${API_URL}` : null,
    fetcher,
    {
      onSuccess: (data) => {
        setPets(data);
      },
    }
  );
  return {
    pets: pets || data,
    isLoading: !error && !data && pets.length === 0,
    isError: error,
    mutate,
  };
};

export const usePet = (animalId: string) => {
  const [pet, setPet] = useAtom(petDetailAtom);
  const { data, error, mutate } = useSWR(
    pet?.animalId === animalId ? `${API_URL}/${animalId}` : null,
    fetcher,
    {
      onSuccess: (data) => {
        setPet(data);
      },
    }
  );
  return {
    pet: pet || data,
    isLoading: !error && !data && !pet,
    isError: error,
    mutate,
  };
};
