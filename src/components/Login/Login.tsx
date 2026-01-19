import css from "./Login.module.css";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useModal } from "../ModalContext/UseModal";
import { useAuth } from "../AuthContext/useAuth";
import { useState } from "react";

interface LoginFormData {
  email: string;
  password: string;
}

const Schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required!"),
  password: Yup.string()
    .min(8, "Minimum 8 characters")
    .max(128, "Maximum 8 characters")
    .required("Password required!"),
});

export default function Login() {
  const { closeModal } = useModal();
  const { signIn } = useAuth();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(Schema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError("");
      await signIn(data.email, data.password);
      closeModal();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to log in");
    }
  };

  return (
    <div className={css.login}>
      <button
        className={css.btn_close}
        aria-label="Close modal"
        onClick={closeModal}
      >
        <svg width={19} height={19} className={css.close_icon}>
          <use href="/sprite.svg#icon-x"></use>
        </svg>
      </button>
      <div className={css.login_info}>
        <h2 className={css.login_title}>Log In</h2>
        <p className={css.login_text}>
          Welcome back! Please enter your credentials to access your account and
          continue your babysitter search.
        </p>
      </div>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("email")}
          className={css.input}
          type="email"
          placeholder="Email"
        />
        <p className={css.color_text}>{errors.email?.message}</p>
        <input
          {...register("password")}
          className={css.input}
          type="password"
          placeholder="Password"
        />
        <p className={css.color_text}>{errors.password?.message}</p>
        {error && <p className={css.color_text}>{error}</p>}
        <button className={css.btn_login} type="submit">
          Log In
        </button>
      </form>
    </div>
  );
}
