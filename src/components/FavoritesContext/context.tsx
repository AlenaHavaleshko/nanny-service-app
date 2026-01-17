import { createContext } from "react";

export interface FavoritesContextType {
  favorites: string[];
  toggleFavorite: (nannyId: string) => void;
  isFavorite: (nannyId: string) => boolean;
}

export const FavoritesContext = createContext<FavoritesContextType | null>(
  null
);
