import React from "react";
import { NavLink, Outlet } from "react-router-dom";

import { GrFavorite } from "react-icons/gr";
import { VscHome } from "react-icons/vsc";

import { useData } from "../contexts/DataContext";

const RootLayout: React.FC = () => {
  const { favorites } = useData();
  const favoritesCount = favorites.length;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="fixed left-0 right-0 top-0 bg-white shadow-md">
        <nav className="container mx-auto flex w-10/12 items-center justify-between px-6 py-4">
          <div>
            <NavLink
              to="/"
              className="text-lg font-semibold text-gray-800 transition-colors duration-500 hover:text-gray-900"
            >
              D&D Spellbook
            </NavLink>
          </div>
          <div className="relative flex items-center justify-center gap-6">
            <NavLink
              to="/"
              className="font-semibold text-gray-600 transition-transform duration-500 hover:scale-125 hover:text-black"
            >
              <VscHome size={22} />
            </NavLink>
            <NavLink
              to="/favorite"
              className="relative font-semibold text-gray-600 transition-transform duration-500 hover:scale-125 hover:text-black"
            >
              <GrFavorite size={18} />

              {favoritesCount > 0 && (
                <span className="absolute right-0 top-0 flex h-4 w-4 -translate-y-[40%] translate-x-[65%] transform items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                  {favoritesCount}
                </span>
              )}
            </NavLink>
          </div>
        </nav>
      </header>
      <main className="container mx-auto w-10/12 px-4 py-8 pt-16">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
