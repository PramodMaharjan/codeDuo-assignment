import React from "react";
import { RiCloseLargeLine } from "react-icons/ri";
import { Spell } from "../types/types";

interface SpellModalProps {
  spell: Spell;
  onClose: () => void;
}

const SpellModal: React.FC<SpellModalProps> = ({ spell, onClose }) => {
  const renderField = (label: string, value: string | undefined) => {
    if (!value) return null;
    return (
      <p className="mb-2">
        <span className="font-semibold">{label}:</span> {value}
      </p>
    );
  };

  const renderArrayField = (
    label: string,
    array: { name: string }[] | string[] | undefined,
  ) => {
    if (!array || array.length === 0) return null;
    return (
      <p className="mb-2">
        <span className="font-semibold">{label}:</span>{" "}
        {array.map((item, index) => (
          <span key={index}>
            {typeof item === "string" ? item : item.name}
            {index !== array.length - 1 && array.length > 1 ? ", " : ""}
          </span>
        ))}
      </p>
    );
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="fixed h-5/6 w-10/12 overflow-hidden rounded-xl bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between bg-gray-200 p-4">
          <h2 className="text-2xl font-semibold text-black">{spell.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-600 transition-transform duration-500 hover:scale-125 hover:text-black"
          >
            <RiCloseLargeLine />
          </button>
        </div>
        <div className="h-[90%] overflow-y-auto p-8 text-justify text-sm text-black">
          {renderField("Attack Type", spell.attack_type)}
          {renderField("Casting Time", spell.casting_time)}
          {renderArrayField("Classes", spell.classes)}
          {renderArrayField("Sub-Classes", spell.subclasses)}
          {renderField("Damage Type", spell.damage?.damage_type.name)}
          {renderField("Description", spell.desc?.join(" "))}
          {renderArrayField("Higher Level", spell.higher_level)}
          {renderField("Level", spell.level?.toString())}
          {renderField("Material", spell.material)}
          {renderField("Range", spell.range)}
          {renderField("School", spell.school?.name)}
        </div>
      </div>
    </div>
  );
};

export default SpellModal;
