import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

import { useAxios } from "../hooks/useAxios";
import { DataType, Spell } from "../types/types";

const baseUrl = "https://www.dnd5eapi.co/api";
const spellsUrl = `${baseUrl}/spells`;

export const DataContext = createContext<DataType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data, isLoading } = useAxios(spellsUrl);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });
  const [selectedSpell, setSelectedSpell] = useState<Spell | null>(null);
  const [loadingSpellDetails, setLoadingSpellDetails] =
    useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (index: string) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(index)
        ? prevFavorites.filter((item) => item !== index)
        : [...prevFavorites, index],
    );
  };

  const handleOpenModal = async (index: string) => {
    setLoadingSpellDetails(true);
    try {
      const response = await axios.get(`${baseUrl}/spells/${index}`);
      setSelectedSpell(response.data);
    } catch (error) {
      console.error("Error fetching spell details:", error);
    } finally {
      setLoadingSpellDetails(false);
    }
  };

  const handleCloseModal = () => {
    setSelectedSpell(null);
  };

  return (
    <DataContext.Provider
      value={{
        data,
        isLoading,
        favorites,
        selectedSpell,
        setSelectedSpell,
        toggleFavorite,
        handleOpenModal,
        handleCloseModal,
        loadingSpellDetails,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
