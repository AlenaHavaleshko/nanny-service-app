import { useFavorites } from "../../components/FavoritesContext/useFavorites";
import { getNannies } from "../../services/nannies";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import NanniesList from "../../components/NanniesList/NanniesList";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.tsx";
import Modal from "../../components/Modal/Modal";
import { useState, useMemo } from "react";
import { useModal } from "../../components/ModalContext/UseModal";
import Appointment from "../../components/Appointment/Appointment";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import css from "./Favorites.module.css";

const pageSize = 3;

export default function Favorites() {
  const { closeModal, isModalOpen, selectedNanny } = useModal();
  const [currentPage, setCurrentPage] = useState(3);
  const [filter, setFilter] = useState("Show all");
  const { favorites } = useFavorites();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["nannies"],
    queryFn: () => getNannies(),
    placeholderData: keepPreviousData,
  });

  const favoriteNannies =
    data?.filter((nanny) => favorites.includes(nanny.id)) || [];

  const filteredData = useMemo(() => {
    if (!favoriteNannies) return [];

    let sorted = [...favoriteNannies];

    switch (filter) {
      case "A to Z":
        sorted.sort((a, b) => (a.name ?? "").localeCompare(b.name ?? ""));
        break;
      case "Z to A":
        sorted.sort((a, b) => (b.name ?? "").localeCompare(a.name ?? ""));
        break;
      case "Less than 10$":
        sorted = sorted.filter((nanny) => nanny.price_per_hour < 10);
        break;
      case "Greater than 10$":
        sorted = sorted.filter((nanny) => nanny.price_per_hour > 10);
        break;
      case "Popular":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "Not popular":
        sorted.sort((a, b) => a.rating - b.rating);
        break;
      case "Show all":
      default:
        break;
    }

    return sorted;
  }, [favoriteNannies, filter]);

  const handleReadMore = () => {
    setCurrentPage((prev) => prev + pageSize);
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setCurrentPage(pageSize);
  };

  return (
    <div className={css.favorites}>
      <CustomSelect onFilterChange={handleFilterChange} />
      {filteredData && (
        <NanniesList nannies={filteredData.slice(0, currentPage)} />
      )}
      {isModalOpen && selectedNanny && (
        <Modal onClose={closeModal}>
          <Appointment nanny={selectedNanny} />
        </Modal>
      )}
      {isLoading && <p>Loading..</p>}
      {isError && <ErrorMessage />}
      {!isLoading && !isError && favoriteNannies.length === 0 && (
        <p style={{ textAlign: "center", marginTop: "40px" }}>
          No favorite nannies yet. Add some from the Nannies page!
        </p>
      )}
      {filteredData && currentPage < filteredData.length && (
        <button type="button" className={css.btn} onClick={handleReadMore}>
          Load more
        </button>
      )}
    </div>
  );
}
