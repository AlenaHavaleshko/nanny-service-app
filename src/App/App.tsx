import Header from "../components/Header/Header";
import Nannies from "../pages/Nannies/Nannies";
import Home from "../pages/Home/Home";
import Favorites from "../pages/Favorites/Favorites";
import { Routes, Route, useLocation } from "react-router-dom";
import css from "./App.module.css";
import Login from "../components/Login/Login";
import Registration from "../components/Registration/Registration";
import Modal from "../components/Modal/Modal";
import Notification from "../components/Notification/Notification";
import { useModal } from "../components/ModalContext/UseModal";
import { ProtectedRoute } from "../components/ProtectedRoute/ProtectedRoute";
import { useState } from "react";

function App() {
  const { closeModal, isModalOpen } = useModal();
  const [modalType, setModalType] = useState<
    "login" | "register" | "appointment" | null
  >(null);

  console.log(import.meta.env.VITE_FIREBASE_API_KEY);

  const location = useLocation();
  const page = location.pathname;

  return (
    <div className={css.app_container}>
      <Header setModalType={setModalType} page={page} />
      <Notification />
      {isModalOpen && (
        <Modal onClose={closeModal}>
          {modalType === "login" && <Login />}
          {modalType === "register" && <Registration />}
        </Modal>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/nannies" element={<Nannies />} />
        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
