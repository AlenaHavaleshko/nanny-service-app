import css from "./Appointment.module.css";
import { useModal } from "../ModalContext/UseModal";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { Nanny } from "../../types/types";

interface AppointmentProps {
  nanny?: Nanny;
}

interface AppointmentFormData {
  address: string;
  tel: string;
  number: number;
  meetingTime: string;
  email: string;
  text: string;
  comment: string;
}

export const AppointmentSchema = Yup.object().shape({
  address: Yup.string()
    .min(3, "Address must be at least 3 characters")
    .required("Address is required"),

  tel: Yup.string()
    .matches(/^\+?[0-9\s-]+$/, "Invalid phone number format")
    .required("Phone number is required"),

  number: Yup.number()
    .typeError("Number must be a number")
    .positive("Must be positive")
    .required("Number is required"),

  meetingTime: Yup.string()
    .matches(
      /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
      "Please enter time in HH:MM format",
    )
    .required("Time is required"),

  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  text: Yup.string()
    .min(5, "Text must be at least 3 characters")
    .required("Text is required"),
  comment: Yup.string().optional().required("Comment is required"),
});

export default function Appointment({ nanny }: AppointmentProps = {}) {
  const { closeModal, showNotification } = useModal();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AppointmentFormData>({
    resolver: yupResolver(AppointmentSchema),
  });

  const onSubmit = (data: AppointmentFormData) => {
    console.log(data);
    reset();
    closeModal();
    showNotification("Your appointment has been successfully sent!");
  };
  return (
    <div className={css.appointment}>
      <button
        className={css.btn_close}
        aria-label="Close modal"
        onClick={closeModal}
      >
        <svg width={19} height={19} className={css.close_icon}>
          <use href="/sprite.svg#icon-x"></use>
        </svg>
      </button>
      <div className={css.appointment_info}>
        <h2 className={css.appointment_title}>
          Make an appointment<br></br> with a babysitter
        </h2>
        <p className={css.appointment_text}>
          Arranging a meeting with a caregiver for your child is the first step
          to creating a safe and comfortable environment. Fill out the form
          below so we can match you with the perfect care partner.
        </p>
      </div>
      {nanny && (
        <div className={css.nanny_info}>
          <div className={css.nanny_photo}>
            <img
              className={css.avatar}
              src={nanny.avatar_url}
              alt={nanny.name}
              width={44}
              height={44}
            ></img>
          </div>
          <div className={css.nanny_name}>
            <p className={css.nanny_name_text}>Your nanny</p>
            <p className={css.nanny_name_value}>{nanny.name}</p>
          </div>
        </div>
      )}
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={css.form_row}>
          <label>
            <input
              {...register("address")}
              className={css.input_row}
              type="text"
              placeholder="Address"
            ></input>
            <p className={css.color_text}>{errors.address?.message}</p>
          </label>
          <label>
            <input
              {...register("tel")}
              className={css.input_row}
              type="tel"
              placeholder="+380"
            ></input>
            <p className={css.color_text}>{errors.tel?.message}</p>
          </label>
        </div>
        <div className={css.form_row}>
          <label>
            <input
              {...register("number")}
              className={css.input_row}
              type="number"
              placeholder="Child's age"
            ></input>
            <p className={css.color_text}>{errors.number?.message}</p>
          </label>
          <label>
            <input
              {...register("meetingTime")}
              className={css.input_row}
              type="time"
              placeholder="00:00"
              maxLength={5}
            ></input>
            <p className={css.color_text}>{errors.meetingTime?.message}</p>
          </label>
        </div>

        <label>
          <input
            {...register("email")}
            className={css.input}
            type="email"
            placeholder="Email"
          ></input>
          <p className={css.color_text}>{errors.email?.message}</p>
        </label>
        <label>
          <input
            {...register("text")}
            className={css.input}
            type="text"
            placeholder="Father's or mother's name"
          ></input>
          <p className={css.color_text}>{errors.text?.message}</p>
        </label>
        <textarea
          {...register("comment")}
          className={css.textarea}
          name="comment"
          placeholder="Comment"
          rows={3}
        />
        <p className={css.color_text}>{errors.comment?.message}</p>
        <button className={css.form_btn} type="submit">
          Send
        </button>
      </form>
    </div>
  );
}
