"use client";
import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { usePets } from '@/hooks/usePets';
import PetCard from './PetCard';
import { Loading } from '@/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './styles.css';

const PetList = () => {
  const { pets, isError, isLoading } = usePets();
  const [currentPage, setCurrentPage] = useState(0);
  const petsPerPage = 6;

  if (isLoading) return <Loading />;
  if (isError) return <div>Error loading pets.</div>;

  const offset = currentPage * petsPerPage;
  const currentPets = pets.slice(offset, offset + petsPerPage);

  const handlePageChange = (selected: number) => {
    setCurrentPage(selected);
  };

  return (
    <section className="pet-list">
      <div className="pagination-container">
        <button
          className="pagination-control prev"
          onClick={() => handlePageChange(Math.max(currentPage - 1, 0))}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>

        <div className="pet-cards-container">
          {currentPets.length > 0 ? (
            currentPets.map((pet) => (
              <PetCard key={pet.animalId} pet={pet} />
            ))
          ) : (
            <div>No pets available for adoption.</div>
          )}
        </div>

        <button
          className="pagination-control next"
          onClick={() => handlePageChange(Math.min(currentPage + 1, Math.ceil(pets.length / petsPerPage) - 1))}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>

      {pets.length > petsPerPage && (
        <div className="pagination-controls">
          <ReactPaginate
            forcePage={currentPage} // Forces the active page to match the currentPage state
            breakLabel={"..."}
            pageCount={Math.ceil(pets.length / petsPerPage)}
            marginPagesDisplayed={1} // Show 1 page at the beginning and end
            pageRangeDisplayed={2}  // Show 2 pages in between
            onPageChange={({ selected }) => handlePageChange(selected)}
            containerClassName={"pagination"}
            activeClassName={"active"}
            previousLabel={null}  // Explicitly hide the previous button
            nextLabel={null}  // Explicitly hide the next button
           />

        </div>
      )}
    </section>
  );
};

export default PetList;
