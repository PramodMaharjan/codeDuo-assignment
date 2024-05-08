import React from "react";

import { useData } from "../contexts/DataContext";
import SpellCard from "../components/SpellCard";
import { ListItem } from "../types/types";

const FavoritePage: React.FC = () => {
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

  const favoriteSpells: ListItem[] | undefined = data?.filter(
    (spell: ListItem) => favorites.includes(spell.index),
  );

  return (
    <div className="container mx-auto p-4">
      {favoriteSpells?.length ? (
        <div>
          <h2 className="mb-4 text-center text-xl font-bold uppercase text-gray-500">
            Favorite Spells
          </h2>

          <SpellCard
            data={favoriteSpells}
            isLoading={isLoading}
            favorites={favorites}
            selectedSpell={selectedSpell}
            toggleFavorite={toggleFavorite}
            handleOpenModal={handleOpenModal}
            handleCloseModal={handleCloseModal}
            setSelectedSpell={setSelectedSpell}
            loadingSpellDetails={loadingSpellDetails}
          />
        </div>
      ) : (
        <div className="mt-8 text-center text-gray-500">
          <p className="text-xl font-semibold">No Favorites</p>
          <p className="mt-2">Start adding some spells to your favorites!</p>
        </div>
      )}
    </div>
  );
};

export default FavoritePage;
