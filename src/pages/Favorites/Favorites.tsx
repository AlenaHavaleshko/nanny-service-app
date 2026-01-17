import { useFavorites } from "../../components/FavoritesContext/useFavorites";
import { getNannies } from "../../services/nannies";
import { useQuery } from "@tanstack/react-query";
import NanniesList from "../../components/NanniesList/NanniesList";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import css from "./Favorites.module.css";

export default function Favorites() {
  const { favorites } = useFavorites();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["nannies"],
    queryFn: () => getNannies(),
  });

  const favoriteNannies =
    data?.filter((nanny) => favorites.includes(nanny.id)) || [];

  return (
    <div className={css.favorites}>
      <h1
        style={{
          textAlign: "center",
          marginTop: "152px",
          marginBottom: "40px",
        }}
      >
        My Favorite Nannies
      </h1>
      {isLoading && <p style={{ textAlign: "center" }}>Loading...</p>}
      {isError && <ErrorMessage />}
      {!isLoading && !isError && favoriteNannies.length === 0 && (
        <p style={{ textAlign: "center" }}>
          No favorite nannies yet. Add some from the Nannies page!
        </p>
      )}
      {favoriteNannies.length > 0 && <NanniesList nannies={favoriteNannies} />}
    </div>
  );
}
