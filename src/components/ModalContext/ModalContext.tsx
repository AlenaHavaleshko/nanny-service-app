import { createContext } from "react";
import type { Nanny } from "../../types/types";

interface ModalContextType {
  openModal: () => void;
  openModalWithNanny: (nanny: Nanny) => void;
  closeModal: () => void;
  isModalOpen: boolean;
  selectedNanny: Nanny | null;
  showNotification: (message: string) => void;
  notification: string | null;
  closeNotification: () => void;
}

export const ModalContext = createContext<ModalContextType | null>(null);
