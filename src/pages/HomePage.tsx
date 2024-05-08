import React, { useState } from "react";

import { useData } from "../contexts/DataContext";
import SpellCard from "../components/SpellCard";
import { ClipLoader } from "react-spinners";

const SpellListApp: React.FC = () => {
  const {
    data,
    isLoading,
    favorites,
    selectedSpell,
    setSelectedSpell,
    toggleFavorite,
    handleOpenModal,
    handleCloseModal,
    loadingSpellDetails,
  } = useData();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data?.slice(indexOfFirstItem, indexOfLastItem);

  const handleLoadMore = (increment: number) => {
    setCurrentPage((prevPage) => prevPage + increment);
  };

  return (
    <div className="container mt-10">
      {isLoading ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <ClipLoader color="#2F855A" />
        </div>
      ) : (
        <>
          <div>
            {currentData && (
              <SpellCard
                data={currentData}
                isLoading={isLoading}
                favorites={favorites}
                selectedSpell={selectedSpell}
                toggleFavorite={toggleFavorite}
                handleOpenModal={handleOpenModal}
                handleCloseModal={handleCloseModal}
                setSelectedSpell={setSelectedSpell}
                loadingSpellDetails={loadingSpellDetails}
              />
            )}
          </div>
          <div className="mt-4 text-center">
            {currentPage > 1 && (
              <button
                className="mr-2 rounded-md border border-blue-700 bg-white px-3 py-2 font-bold text-blue-700 transition-all duration-500 hover:bg-blue-700 hover:text-white"
                onClick={() => handleLoadMore(-1)}
              >
                Previous Page
              </button>
            )}
            {data && data.length > indexOfLastItem && (
              <button
                className="rounded-md border border-blue-700 bg-white px-3 py-2 font-bold text-blue-700 transition-all duration-500 hover:bg-blue-700 hover:text-white"
                onClick={() => handleLoadMore(1)}
              >
                Next Page
              </button>
            )}
          </div>
          <div className="mt-4 text-center text-[15px] text-[#7E7E7E]">
            Showing {indexOfFirstItem + 1} -{" "}
            {data && Math.min(indexOfLastItem, data.length)} out of{" "}
            {data && data.length} results
          </div>
        </>
      )}
    </div>
  );
};

export default SpellListApp;
