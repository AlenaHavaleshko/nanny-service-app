import { useState, useEffect, type ReactNode } from "react";
import { useAuth } from "../AuthContext/useAuth";
import { ref, set, get, remove } from "firebase/database";
import { database } from "../../firebase";
import { FavoritesContext } from "./context";

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const loadFavorites = async () => {
      if (user) {
        const favoritesRef = ref(database, `favorites/${user.uid}`);
        const snapshot = await get(favoritesRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          setFavorites(Object.keys(data));
        } else {
          setFavorites([]);
        }
      } else {
        setFavorites([]);
      }
    };

    loadFavorites();
  }, [user]);

  const toggleFavorite = async (nannyId: string) => {
    if (!user) return;

    const favoritesRef = ref(database, `favorites/${user.uid}/${nannyId}`);

    if (favorites.includes(nannyId)) {
      await remove(favoritesRef);
      setFavorites(favorites.filter((id) => id !== nannyId));
    } else {
      await set(favoritesRef, true);
      setFavorites([...favorites, nannyId]);
    }
  };

  const isFavorite = (nannyId: string) => {
    return favorites.includes(nannyId);
  };

  const value = {
    favorites,
    toggleFavorite,
    isFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}
