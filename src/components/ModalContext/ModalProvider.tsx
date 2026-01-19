import { useState, useEffect } from "react";
import { ModalContext } from "./ModalContext";
import type { Nanny } from "../../types/types";

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNanny, setSelectedNanny] = useState<Nanny | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const openModal = () => setIsModalOpen(true);

  const openModalWithNanny = (nanny: Nanny) => {
    setSelectedNanny(nanny);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNanny(null);
  };

  const showNotification = (message: string) => {
    setNotification(message);
  };

  const closeNotification = () => {
    setNotification(null);
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        closeNotification();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <ModalContext.Provider
      value={{
        openModal,
        openModalWithNanny,
        closeModal,
        isModalOpen,
        selectedNanny,
        showNotification,
        notification,
        closeNotification,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
