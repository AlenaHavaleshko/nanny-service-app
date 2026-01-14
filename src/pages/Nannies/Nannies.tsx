
import ErrorMessage from "../../components/ErrorMessage/errorMessage";
import NanniesList from "../../components/NanniesList/NanniesList";
import Modal from "../../components/Modal/Modal";
import Appointment from "../../components/Appointment/Appointment";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import { getNannies } from "../../services/nannies";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { useModal } from "../../components/ModalContext/UseModal";
import css from "./Nannies.module.css";

const pageSize = 3;

export default function Nannies() {
  const { closeModal, isModalOpen } = useModal();
  const [currentPage, setCurrentPage] = useState(3);
  const [filter, setFilter] = useState("Show all");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["nannies"],
    queryFn: () => getNannies(),
    placeholderData: keepPreviousData,
  });

  const filteredData = useMemo(() => {
    if (!data) return [];

    let sorted = [...data];

    switch (filter) {
      case "A to Z":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z to A":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
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
  }, [data, filter]);

  const handleReadMore = () => {
    setCurrentPage((prev) => prev + pageSize);
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setCurrentPage(pageSize);
  };

  return (
    <div className={css.nannies}>
      <CustomSelect onFilterChange={handleFilterChange} />
      {filteredData && (
        <NanniesList nannies={filteredData.slice(0, currentPage)} />
      )}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <Appointment />
        </Modal>
      )}
      {isLoading && <p>Loading..</p>}
      {isError && <ErrorMessage />}
      {filteredData && currentPage < filteredData.length && (
        <button type="button" className={css.btn} onClick={handleReadMore}>
          Read more
        </button>
      )}
    </div>
  );
}
