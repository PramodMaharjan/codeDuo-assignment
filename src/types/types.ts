export interface Spell {
  name: string;
  desc: string[];
  range: string;
  attack_type?: string;
  casting_time?: string;
  classes?: { name: string; index: number }[];
  subclasses?: { name: string; index: number }[];
  damage?: {
    damage_type: {
      name: string;
    };
  };
  higher_level?: string[];
  level?: string;
  material?: string;
  school?: {
    name: string;
  };
}

export interface ListItem {
  index: string;
  level: number;
  name: string;
  url: string;
}

export interface DataType {
  data: ListItem[] | null;
  isLoading: boolean;
  favorites: string[];
  selectedSpell: Spell | null;
  setSelectedSpell: (spell: Spell | null) => void;
  toggleFavorite: (index: string) => void;
  handleOpenModal: (index: string) => void;
  handleCloseModal: () => void;
  loadingSpellDetails: boolean;
}
