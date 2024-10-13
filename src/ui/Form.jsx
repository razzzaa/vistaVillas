import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createContext, useContext } from "react";
import styled from "styled-components";
import useSettings from "../features/Settings/useSettings";
import Spinner from "./Spinner";

const FormContext = createContext();

const schema = yup.object({
  //CABIN
  //........................................................................................................................
  cabinName: yup.string().required(),
  capacity: yup.number().positive().integer(),
  //SETTINGS
  //........................................................................................................................
  minNights: yup.number().positive().integer().required(),
  maxNights: yup.number().positive().integer().required(),
  maxGuests: yup.number().positive().integer().required(),
  breakfastPrice: yup.number().positive().integer().required(),
});

const StyledFormUl = styled.ul`
  display: flex;
  flex-direction: column;
  justify-items: center;
`;

const StyledFormLi = styled.li`
  display: grid;
  padding: 1.1rem;
  font-size: 1rem;
  font-weight: 400;
  gap: 4.4rem;
  grid-template-columns: 12rem 1fr 1.2fr;
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const StyledFormInput = styled.input`
  border: 1px solid var(--color-grey-300);
  border-radius: 5px;
  padding: 0.2rem;
  box-shadow: var(--shadow-sm);
`;
function Form({ children }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => console.log(data);

  return (
    <FormContext.Provider value={{ register, handleSubmit, errors, onSubmit }}>
      <div>{children}</div>
    </FormContext.Provider>
  );
}

function Cabin() {
  const { register, handleSubmit, errors, onSubmit } = useContext(FormContext);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("cabinName")} />
      <input></input>
      <input></input>
      <input></input>
      <input type="submit" />
    </form>
  );
}

function Settings() {
  const { register, handleSubmit, errors, onSubmit } = useContext(FormContext);

  const {
    error,
    isLoading,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();

  console.log(errors);

  if (isLoading) return <Spinner />;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <StyledFormUl>
        <StyledFormLi>
          <label htmlFor="minNights">Minimum-Nights: </label>
          <StyledFormInput
            type="number"
            defaultValue={minBookingLength}
            id="minNights"
            {...register("minNights")}
          />
        </StyledFormLi>
        <p>{errors.minNights?.message}</p>

        <StyledFormLi>
          <label htmlFor="maxNights">Maximum-Nights: </label>
          <StyledFormInput
            type="number"
            defaultValue={maxBookingLength}
            id="maxNights"
            {...register("maxNights")}
          />
        </StyledFormLi>
        <p>{errors.maxNights?.message}</p>

        <StyledFormLi>
          <label htmlFor="maxGuests">Maximum-Guest: </label>
          <StyledFormInput
            type="number"
            defaultValue={minBookingLength}
            id="maxGuests"
            {...register("maxGuests")}
          />
        </StyledFormLi>
        <p>{errors.maxGuests?.message}</p>

        <StyledFormLi>
          <label htmlFor="breakfastPrice">Breakfst-Price: </label>
          <StyledFormInput
            defaultValue={breakfastPrice}
            id="breakfastPrice"
            {...register("breakfastPrice")}
          />
        </StyledFormLi>
      </StyledFormUl>
      <p>{errors.breakfastPrice?.message}</p>

      <button type="submit">asd</button>
    </form>
  );
}

Form.Cabin = Cabin;
Form.Settings = Settings;

export default Form;
