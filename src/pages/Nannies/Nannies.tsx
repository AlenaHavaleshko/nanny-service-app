import css from "./Nannies.module.css";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import NanniesList from "../../components/NanniesList/NanniesList";
import Modal from "../../components/Modal/Modal";
import Appointment from "../../components/Appointment/Appointment";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import { getNannies } from "../../services/nannies";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useModal } from "../../components/ModalContext/UseModal";

const pageSize = 3;

export default function Nannies() {
  const { closeModal, isModalOpen } = useModal();
  const [currentPage, setCurrentPage] = useState(3);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["nannies"],
    queryFn: () => getNannies(),
    placeholderData: keepPreviousData,
  });

  const handleReadMore = () => {
    setCurrentPage((prev) => prev + pageSize);
  };

  return (
    <div className={css.nannies}>
      <CustomSelect />
      {data && <NanniesList nannies={data.slice(0, currentPage)} />}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <Appointment />
        </Modal>
      )}
      {isLoading && <p>Loading..</p>}
      {isError && <ErrorMessage />}
      {data && currentPage < data.length && (
        <button type="button" className={css.btn} onClick={handleReadMore}>
          Read more
        </button>
      )}
    </div>
  );
}
