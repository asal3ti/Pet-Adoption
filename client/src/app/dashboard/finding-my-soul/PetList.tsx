"use client";
import { Loading } from "@/components";
import { usePets } from "@/hooks/usePets";
import PetCard from "./PetCard";

const PetList = () => {
  // the hook will get the pets from the atom
  const { pets, isError, isLoading } = usePets();

  if (isLoading) return <Loading />;
  if (isError) return <div>Error loading pets.</div>;

  return (
    <section>
      <PetCard />
    </section>
  );
};

export default PetList;
