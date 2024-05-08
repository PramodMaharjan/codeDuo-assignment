import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

import SpellModal from "./SpellModal";
import { DataType } from "../types/types";
import { ClipLoader } from "react-spinners";

const SpellCard: React.FC<DataType> = ({
  data,
  favorites,
  toggleFavorite,
  handleOpenModal,
  handleCloseModal,
  selectedSpell,
  loadingSpellDetails,
}) => {
  const isFavorite = (index: string): boolean => favorites.includes(index);

  return (
    <div>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data?.map((spell) => (
          <li
            key={spell.index}
            className="rounded-lg bg-white px-6 py-8 shadow"
          >
            <h3 className="mb-2 text-lg font-bold uppercase text-green-600">
              {spell.name}
            </h3>
            <div className="flex items-center justify-between">
              <button
                onClick={() => handleOpenModal(spell.index)}
                className="rounded-md bg-yellow-400 px-3 py-2 text-center text-[14px] font-semibold text-gray-800 transition duration-300 hover:bg-yellow-300"
              >
                View Information
              </button>
              <button
                onClick={() => toggleFavorite(spell.index)}
                className="text-gray-600 hover:text-red-600"
              >
                {isFavorite(spell.index) ? (
                  <MdFavorite size={22} className="text-red-600" />
                ) : (
                  <MdFavoriteBorder size={22} />
                )}
              </button>
            </div>
          </li>
        ))}
      </ul>
      {loadingSpellDetails && (
        <div className="fixed inset-0 flex items-center justify-center">
          <ClipLoader color="#2F855A" />
        </div>
      )}
      {!loadingSpellDetails && selectedSpell && (
        <SpellModal spell={selectedSpell} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default SpellCard;
