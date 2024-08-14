"use client";
import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { usePets } from "@/hooks/usePets";
import PetCard from "./PetCard";
import { Loading } from "@/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "./styles.css";
import { usePathname } from "next/navigation";

import { useMyUser } from "@/hooks/useMyUser";
import { getPetById } from "@/services/petService";
import { Pet } from "@/types/Pet";

interface Props {
  setDisplay: Dispatch<SetStateAction<boolean>>;
  setType: Dispatch<
    SetStateAction<
      "success" | "info" | "warning" | "error" | "loading" | undefined
    >
  >;
}

const PetList = ({ setDisplay, setType }: Props) => {
  const { pets, isError, isLoading } = usePets();
  const { user } = useMyUser();
  const [currentPage, setCurrentPage] = useState(0);
  const [currentPets, setCurrentPets] = useState<Pet[]>([]);
  const [len, setLen] = useState(0);
  const petsPerPage = 6;
  const pathname = usePathname();

  useEffect(() => {
    const fetchPets = async () => {
      let petsToDisplay: Pet[] = [];
      if (pathname === "/dashboard/waiting-list" && user) {
        const userPets = await getPetsFromUser();
        petsToDisplay = userPets;
        setLen(petsToDisplay.length);
      } else {
        petsToDisplay = pets.filter((pet: Pet) => {
          // Only include pets if user is defined and pet's animalId is not in user's favorites
          return user && user.favorites.indexOf(pet.animalId) === -1;
        });

        setLen(petsToDisplay.length);
      }

      console.log("calling");
      setCurrentPets(petsToDisplay.slice(offset, offset + petsPerPage));
    };

    fetchPets();
  }, [currentPage, pathname, user?.favorites, pets]);

  const getPetsFromUser = async (): Promise<Pet[]> => {
    if (!user || !user.favorites) return [];
    return Promise.all(
      user.favorites.map((animalId: string) => getPetById(animalId))
    );
  };

  const offset = currentPage * petsPerPage;

  const handlePageChange = (selected: { selected: number }) => {
    setCurrentPage(selected.selected);
  };

  if (isLoading) return <Loading />;
  if (isError) return <div>Error loading pets.</div>;

  return (
    <section className="pet-list">
      <div className="pagination-container">
        <button
          className="pagination-control prev"
          onClick={() =>
            handlePageChange({ selected: Math.max(currentPage - 1, 0) })
          }
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>

        <div className="pet-cards-container">
          {currentPets.length > 0 ? (
            currentPets
              .reverse()
              .map((pet) => (
                <PetCard
                  key={pet.animalId}
                  pet={pet}
                  setDisplay={setDisplay}
                  setType={setType}
                />
              ))
          ) : (
            <div>No pets available for adoption.</div>
          )}
        </div>

        <button
          className="pagination-control next"
          onClick={() =>
            handlePageChange({
              selected: Math.min(
                currentPage + 1,
                Math.ceil(pets.length / petsPerPage) - 1
              ),
            })
          }
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>

      {len > petsPerPage && (
        <div className="pagination-controls">
          <ReactPaginate
            forcePage={currentPage}
            breakLabel={"..."}
            pageCount={Math.ceil(len / petsPerPage)}
            marginPagesDisplayed={1}
            pageRangeDisplayed={2}
            onPageChange={handlePageChange}
            containerClassName={"pagination"}
            activeClassName={"active"}
            previousLabel={null}
            nextLabel={null}
          />
        </div>
      )}
    </section>
  );
};

export default PetList;
