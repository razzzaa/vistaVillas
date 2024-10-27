import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createContext, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import useSettings from "../features/Settings/useSettings";
import Spinner from "./Spinner";
import { BsFillFloppy2Fill } from "react-icons/bs";
import Button from "./Button";
import { useUpdateSettings } from "../features/Settings/useUpdateSettings";
import { MdAddBusiness } from "react-icons/md";
import Heading from "./Heading";
import useAddCabin from "../features/Cabins/useAddCabin";
import useEditCabins from "../features/Cabins/useEditCabins";

const FormContext = createContext();

const MAX_IMAGE_SIZE = 5242880; //5MB

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
  grid-template-columns: 16rem 1fr 1.2fr;
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

const StyledTextArea = styled.textarea`
  border: 1px solid var(--color-grey-300);
  border-radius: 5px;
  padding: 0.2rem;
  box-shadow: var(--shadow-sm);
`;

const StyledSelect = styled.select`
  border: 1px solid var(--color-grey-300);
  border-radius: 5px;
  padding: 0.2rem;
  box-shadow: var(--shadow-sm);
`;

function Form({
  children,
  schemaType,
  isEdited = false,
  duplicateData = {},
  onCloseModal,
}) {
  const { settings } = useSettings();
  const { id: editId, ...editData } = duplicateData;
  console.log(typeof settings?.maxGuestsPerBooking);

  //CABIN
  //........................................................................................................................
  const cabinSchema = yup.object({
    cabin_name: yup.string().required("Cabin-Name is required"),
    max_capacity: yup
      .number()
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : value
      )
      .positive()
      .integer()
      .lessThan(Number(settings?.maxGuestsPerBooking) + 1)
      .required("Maximum-Capacity is required"),
    price_per_night: yup
      .number()
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : value
      )
      .positive()
      .integer()
      .required("Price-Per-Night is required"),
    discount: yup
      .number()
      .transform((value, originalValue) =>
        originalValue === "" ? null : value
      )
      .positive()
      .integer()
      .nullable()
      .test(
        "discountLessPrice",
        "Discount should be less than regular price",
        function (value) {
          const price = this.parent.price; // Access the 'price' field from the form
          if (value != null && price != null) {
            return value < price; // Ensure discount is less than price
          }
          return true;
        }
      ),
    description: yup.string().nullable(),
    availability: yup
      .boolean()
      .required("Availability is required")
      .transform((value, originalValue) =>
        originalValue === "" ? null : value
      ),
    image: yup
      .mixed()
      .test("fileExists", "Image is required", (value) => {
        if (!isEdited) {
          return value && value.length > 0;
        }
        return true;
      })
      .test(
        "is-valid-size",
        `Max allowed size is ${Math.round(MAX_IMAGE_SIZE / 1000000)}MB`,
        (value) => {
          if (isEdited) {
            return true;
          }
          if (value && value.length > 0) {
            return value[0].size <= MAX_IMAGE_SIZE;
          }
          return true;
        }
      ),
  });

  //SETTINGS
  //........................................................................................................................
  const settingsSchema = yup.object({
    minBookingLength: yup
      .number()
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : value
      )
      .positive("Minimum nights must be greater than 0")
      .integer("Minimum nights must be a whole number")
      .required("Minimum nights is required"),
    maxBookingLength: yup
      .number()
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : value
      )
      .positive()
      .integer()
      .required(),
    maxGuestsPerBooking: yup
      .number()
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : value
      )
      .positive()
      .integer()
      .required(),
    breakfastPrice: yup
      .number()
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : value
      )
      .positive()
      .integer()
      .required(),
  });

  const schemaTypes = { cabin: cabinSchema, settings: settingsSchema };

  const [schema, setSchema] = useState(schemaType);

  useEffect(() => {
    if (schemaTypes[schemaType]) {
      setSchema(schemaTypes[schemaType]);
    }
  }, [schemaType]);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: isEdited ? editData : {},
  });

  return (
    <FormContext.Provider
      value={{
        register,
        handleSubmit,
        errors,
        isEdited,
        editId,
        onCloseModal,
        getValues,
      }}
    >
      <div>{children}</div>
    </FormContext.Provider>
  );
}

function Cabin({ style, header }) {
  const {
    register,
    handleSubmit,
    errors,
    isEdited,
    editId,
    onCloseModal,
    getValues,
  } = useContext(FormContext);
  const { addCabins, isUpdating } = useAddCabin();
  const { editCabin, isPending } = useEditCabins();

  const onSubmit = (data) => {
    if (isEdited) {
      editCabin(
        { newCabinData: { ...data }, id: editId },
        {
          onSuccess: () => {
            onCloseModal?.();
          },
        }
      );
    } else {
      {
        addCabins(data, {
          onSuccess: () => {
            onCloseModal?.();
          },
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-center">
        <Heading as="h3">{header}</Heading>
      </div>
      <div className={style}>
        <StyledFormUl>
          <StyledFormLi>
            <label htmlFor="name">Cabin-Name : </label>
            <StyledFormInput
              id="name"
              type="text"
              {...register("cabin_name")}
              defaultValue={""}
            />
            <p className="text-red-500">{errors.cabin_name?.message}</p>
          </StyledFormLi>

          <StyledFormLi>
            <label htmlFor="capacity">Maximum-Capacity : </label>
            <StyledFormInput
              id="capacity"
              type="number"
              {...register("max_capacity")}
            />
            <p className="text-red-500">{errors.max_capacity?.message}</p>
          </StyledFormLi>

          <StyledFormLi>
            <label htmlFor="price">Price-Per-Night : </label>
            <StyledFormInput
              id="price"
              type="number"
              {...register("price_per_night")}
            />
            <p className="text-red-500">{errors.price_per_night?.message}</p>
          </StyledFormLi>

          <StyledFormLi>
            <label htmlFor="discount">Discount : </label>
            <StyledFormInput
              id="discount"
              type="number"
              {...register("discount")}
            />
            <p className="text-red-500">{errors.discount?.message}</p>
          </StyledFormLi>

          <StyledFormLi>
            <label htmlFor="description">Description :</label>
            <StyledTextArea
              id="description"
              rows="8"
              cols="100"
              {...register("description")}
            />
            <p className="text-red-500"></p>
          </StyledFormLi>

          <StyledFormLi>
            <label htmlFor="availability">Availability :</label>
            <StyledSelect id="availability" {...register("availability")}>
              <option value="">--Please choose an option--</option>
              <option value="true">Vacant (VAC)</option>
              <option value="false">Occupied (OCC)</option>
            </StyledSelect>
            <p className="text-red-500">{errors.availability?.message}</p>
          </StyledFormLi>

          <StyledFormLi>
            <label htmlFor="image">Image : </label>
            <StyledFormInput id="image" type="file" {...register("image")} />
            <p className="text-red-500">{errors.image?.message}</p>
          </StyledFormLi>
        </StyledFormUl>
        <Button
          buttonContainer={"flex justify-center"}
          text={"Add"}
          icon={<MdAddBusiness />}
          style={
            "flex justify-center items-center my-2 p-2 bg-medium-yellow rounded-md text-darker-yellow font-bold text-md transition-all hover:bg-dark-yellow hover:text-white shadow-md w-6/12"
          }
        />
      </div>
    </form>
  );
}

function Settings({ style }) {
  const { register, handleSubmit, errors } = useContext(FormContext);
  const { isUpdating, updateSettings } = useUpdateSettings();

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

  const onSubmit = (data) => updateSettings(data);

  if (isUpdating) return <Spinner />;
  if (isLoading) return <Spinner />;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={style}>
        <StyledFormUl>
          <StyledFormLi>
            <label htmlFor="minNights">Minimum-Nights/Booking : </label>
            <StyledFormInput
              type="number"
              defaultValue={minBookingLength}
              id="minNights"
              {...register("minBookingLength")}
            />
            <p className="text-red-500">{errors.minBookingLength?.message}</p>
          </StyledFormLi>

          <StyledFormLi>
            <label htmlFor="maxNights">Maximum-Nights/Booking : </label>
            <StyledFormInput
              type="number"
              defaultValue={maxBookingLength}
              id="maxNights"
              {...register("maxBookingLength")}
            />
            <p className="text-red-500">{errors.maxBookingLength?.message}</p>
          </StyledFormLi>

          <StyledFormLi>
            <label htmlFor="maxGuests">Maximum-Guest/Booking : </label>
            <StyledFormInput
              type="number"
              defaultValue={maxGuestsPerBooking}
              id="maxGuests"
              {...register("maxGuestsPerBooking")}
            />
            <p className="text-red-500">
              {errors.maxGuestsPerBooking?.message}
            </p>
          </StyledFormLi>

          <StyledFormLi>
            <label htmlFor="breakfastPrice">Breakfst-Price :</label>
            <StyledFormInput
              defaultValue={breakfastPrice}
              id="breakfastPrice"
              {...register("breakfastPrice")}
            />
            <p className="text-red-500">{errors.breakfastPrice?.message}</p>
          </StyledFormLi>
        </StyledFormUl>
      </div>
      <Button
        text={"Save"}
        icon={<BsFillFloppy2Fill />}
        style={
          "flex items-center my-2 p-2 bg-medium-yellow rounded-md text-darker-yellow font-bold text-md transition-all hover:bg-dark-yellow hover:text-white shadow-md"
        }
      />
    </form>
  );
}

Form.Cabin = Cabin;
Form.Settings = Settings;

export default Form;
