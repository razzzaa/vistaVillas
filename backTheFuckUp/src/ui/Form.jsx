import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createContext, useContext, useEffect, useRef, useState } from "react";
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
import acceptedFlags from "../utils/acceptedFlags";
import { FaUserPlus } from "react-icons/fa6";
import useAddGuests from "../features/Guests/useAddGuests";
import useEditGuests from "../features/Guests/useEditGuests";
import { MdSaveAs } from "react-icons/md";
import Datepicker from "react-tailwindcss-datepicker";
import Select from "react-select";
import { useGuests } from "../features/Guests/useGetGuests";
import Logo from "./Logo";
import { IoLogIn } from "react-icons/io5";
import { useLogin } from "../features/authentication/useLogin";
import { TiUserAdd } from "react-icons/ti";
import { useSignup } from "../features/authentication/useSignup";
import { useUser } from "../features/authentication/useUser";
import useUpdateUser from "../features/authentication/useUpdateUser";
import { FaUserCheck } from "react-icons/fa6";
import { MdOutlinePassword } from "react-icons/md";

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
  gap: 2rem;
  grid-template-columns: 10rem 1fr 1.2fr;
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
  const { settings, isLoading } = useSettings();
  const { id: editId, ...editData } = duplicateData;

  /*FORM SCHEMA TYPES-------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
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
      .test(
        "discountLessPrice",
        "Discount should be less than regular price",
        function (value) {
          const price = this.parent.price_per_night;
          if (value != null && price != null) {
            return value < price;
          }
          return true;
        }
      )
      .nullable(),
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
  //........................................................................................................................

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
  //........................................................................................................................

  //GUESTS
  //........................................................................................................................
  const guestsSchema = yup.object({
    fullName: yup.string().required("Full-Name is required"),
    email: yup.string().email().required("Email is required"),
    nationalId: yup
      .number()
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : value
      )
      .positive()
      .integer()
      .required("National-ID is required"),
    country: yup.string().required("Country is a required field"),
  });
  //........................................................................................................................

  //BOOKING
  //............................................................................................................................
  const bookingSchema = yup.object({});
  //............................................................................................................................

  //LOGIN
  //............................................................................................................................
  const loginSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });
  //............................................................................................................................

  //REGISTER
  //............................................................................................................................
  const registerSchema = yup.object({
    fullName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required().min(6).max(20),
    confirmPassword: yup
      .string()
      .label("confirm password")
      .required()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });
  //............................................................................................................................

  //UPDATE ACCOUNT DETAILS
  //............................................................................................................................
  const updateUserDataSchema = yup.object({
    fullName: yup.string().required(),
  });
  //............................................................................................................................

  //UPDATE ACCOUNT PASSWORD
  //............................................................................................................................
  const updateUserPasswordSchema = yup.object({
    password: yup.string().required().min(6).max(20),
    confirmUpdatePassword: yup
      .string()
      .label("confirm password")
      .required()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });
  //............................................................................................................................

  const schemaTypes = {
    cabin: cabinSchema,
    settings: settingsSchema,
    guests: guestsSchema,
    booking: bookingSchema,
    login: loginSchema,
    register: registerSchema,
    updateUserData: updateUserDataSchema,
    updateUserPassword: updateUserPasswordSchema,
  };

  const [schema, setSchema] = useState(schemaType);

  useEffect(() => {
    if (schemaTypes[schemaType]) {
      setSchema(schemaTypes[schemaType]);
    }
    if (schemaType === "cabin" && !isLoading && settings?.maxGuestsPerBooking) {
      setSchema(
        cabinSchema.shape({
          max_capacity: yup
            .number()
            .transform((value, originalValue) =>
              originalValue === "" ? undefined : value
            )
            .positive()
            .integer()
            .lessThan(
              Number(settings?.maxGuestsPerBooking) + 1,
              `Maximum-Capacity must be less than ${
                settings?.maxGuestsPerBooking + 1
              }`
            )
            .required("Maximum-Capacity is required"),
        })
      );
    }
  }, [schemaType, isLoading, settings]);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: isEdited ? editData : {},
  });

  if (isLoading) return <Spinner />;

  return (
    <FormContext.Provider
      value={{
        register,
        handleSubmit,
        errors,
        isEdited,
        editId,
        onCloseModal,
        settings,
        reset,
      }}
    >
      <div className="max-h-[80vh] overflow-auto p-3">{children}</div>
    </FormContext.Provider>
  );
}

function Cabin({ style, header }) {
  const { register, handleSubmit, errors, isEdited, editId, onCloseModal } =
    useContext(FormContext);
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
          text={isEdited ? "SAVE" : "ADD"}
          icon={isEdited ? <MdSaveAs /> : <MdAddBusiness />}
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
    <>
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
    </>
  );
}

function Guests({ style, header }) {
  const flags = acceptedFlags();
  const { addGuests, isUpdating } = useAddGuests();
  const { editGuest, isPending } = useEditGuests();
  const { register, handleSubmit, errors, isEdited, editId, onCloseModal } =
    useContext(FormContext);

  const onSubmit = (data) => {
    const first = data.country.split(" : ");
    const country = first[1];
    const countryFlag = first[0];
    console.log(country);
    console.log(countryFlag);

    if (isEdited) {
      editGuest(
        {
          newCabinData: { ...data, country: country, countryFlag: countryFlag },
          id: editId,
        },
        {
          onSuccess: () => {
            onCloseModal?.();
          },
        }
      );
    } else {
      addGuests(
        {
          ...data,
          country: country,
          countryFlag: countryFlag,
        },
        {
          onSuccess: () => {
            onCloseModal?.();
          },
        }
      );
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
            <label htmlFor="name">Full-Name : </label>
            <StyledFormInput id="name" type="text" {...register("fullName")} />
            <p className="text-red-500">{errors.fullName?.message}</p>
          </StyledFormLi>
          <StyledFormLi>
            <label htmlFor="email">Email : </label>
            <StyledFormInput type="email" id="email" {...register("email")} />
            <p className="text-red-500">{errors.email?.message}</p>
          </StyledFormLi>
          <StyledFormLi>
            <label htmlFor="id">National-ID : </label>
            <StyledFormInput
              type="number"
              id="id"
              {...register("nationalId")}
            />
            <p className="text-red-500">{errors.nationalId?.message}</p>
          </StyledFormLi>
          <StyledFormLi>
            <label htmlFor="name">Country : </label>
            <StyledSelect id="availability" {...register("country")}>
              <option className="text-center" value="">
                --Please choose a country--
              </option>
              {Object.entries(flags).map(([code, name]) => (
                <option key={code} value={`${code} : ${name}`}>
                  {`${code} : ${name}`}
                </option>
              ))}
            </StyledSelect>
            <p className="text-red-500">{errors.country?.message}</p>
          </StyledFormLi>
          <Button
            buttonContainer={"flex justify-center"}
            text={isEdited ? "SAVE" : "ADD"}
            icon={isEdited ? <MdSaveAs /> : <FaUserPlus />}
            style={
              "flex justify-center items-center my-2 p-2 bg-medium-yellow rounded-md text-darker-yellow font-bold text-md transition-all hover:bg-dark-yellow hover:text-white shadow-md w-6/12"
            }
          />
        </StyledFormUl>
      </div>
    </form>
  );
}

function Login() {
  const { handleSubmit, register, errors } = useContext(FormContext);
  const { login, isLoading } = useLogin();

  const onSubmit = (data) => {
    const { email, password } = data;
    login({ email, password });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col	items-center">
        <Logo />
        <Heading className="mb-4 text-neutral-700" as="h3">
          login to your account
        </Heading>
      </div>
      <div className="flex justify-center ">
        <ul>
          <li className="flex justify-between m-2">
            <label className="pr-2" htmlFor="email">
              Email:
            </label>
            <StyledFormInput
              id="email"
              type="text"
              {...register("email")}
              disabled={isLoading}
            />
          </li>
          <li>
            <p className="text-red-500 m-2">{errors.email?.message}</p>
          </li>

          <li className="flex justify-between m-2">
            <label className="pr-2" htmlFor="password">
              Password:{" "}
            </label>
            <StyledFormInput
              id="password"
              type="text"
              {...register("password")}
              disabled={isLoading}
            />
          </li>
          <p className="text-red-500 m-2">{errors.password?.message}</p>

          <li>
            <Button
              icon={<IoLogIn />}
              text="Log-In"
              style={
                "flex items-center my-2 p-2 bg-medium-yellow rounded-md text-darker-yellow font-bold text-md transition-all hover:bg-dark-yellow hover:text-white shadow-md"
              }
              buttonContainer={"flex justify-center"}
              disabled={isLoading}
            />
          </li>
        </ul>
      </div>
    </form>
  );
}

function Register({ style }) {
  const { handleSubmit, register, errors, reset } = useContext(FormContext);
  const { signup, isLoading } = useSignup();

  const onSubmit = ({ fullName, email, password }) => {
    signup({ fullName, email, password }, { onSettled: reset });
    console.log(fullName, email, password);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={style}>
        <StyledFormUl>
          <StyledFormLi>
            <label htmlFor="fullName">Full-Name : </label>
            <StyledFormInput type="text" id="name" {...register("fullName")} />
            <p className="text-red-500">{errors.fullName?.message}</p>
          </StyledFormLi>

          <StyledFormLi>
            <label htmlFor="email">Email : </label>
            <StyledFormInput type="email" id="email" {...register("email")} />
            <p className="text-red-500">{errors.email?.message}</p>
          </StyledFormLi>

          <StyledFormLi>
            <label htmlFor="password">Password : </label>
            <StyledFormInput
              type="text"
              id="password"
              {...register("password")}
            />
            <p className="text-red-500">{errors.password?.message}</p>
          </StyledFormLi>

          <StyledFormLi>
            <label htmlFor="Password">Confirm-Password :</label>
            <StyledFormInput id="Password" {...register("confirmPassword")} />
            <p className="text-red-500">{errors.confirmPassword?.message}</p>
          </StyledFormLi>
        </StyledFormUl>
      </div>
      <Button
        text={"Create-User"}
        icon={<TiUserAdd />}
        style={
          "flex items-center my-2 p-2 bg-medium-yellow rounded-md text-darker-yellow font-bold text-md transition-all hover:bg-dark-yellow hover:text-white shadow-md"
        }
      />
    </form>
  );
}

function UpdateUserData({ style }) {
  const { handleSubmit, register, errors, reset } = useContext(FormContext);
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
    isLoading,
  } = useUser();

  const { updateUser, isPending } = useUpdateUser();
  const [avatar, setAvatar] = useState("");

  const onSubmit = ({ fullName, avatarFile }) => {
    if (!fullName) return;
    const avatar = avatarFile[0];
    console.log(avatar);
    updateUser({ fullName, avatar });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={style}>
        <StyledFormUl>
          <StyledFormLi>
            <label htmlFor="email">Email : </label>
            <StyledFormInput
              value={email}
              type="email"
              id="email"
              disabled={true}
            />
          </StyledFormLi>

          <StyledFormLi>
            <label htmlFor="fullName">Full-Name : </label>
            <StyledFormInput
              type="text"
              id="fullName"
              {...register("fullName")}
              defaultValue={currentFullName}
            />
            <p className="text-red-500">{errors.fullName?.message}</p>
          </StyledFormLi>

          <StyledFormLi>
            <label htmlFor="avatar">User-Avatar : </label>
            <StyledFormInput
              type="file"
              id="avatar"
              {...register("avatarFile")}
            />
            <p className="text-red-500">{errors.avatar?.message}</p>
          </StyledFormLi>
        </StyledFormUl>
      </div>
      <Button
        text={"Update-Account"}
        icon={<FaUserCheck />}
        style={
          "flex items-center my-2 p-2 bg-medium-yellow rounded-md text-darker-yellow font-bold text-md transition-all hover:bg-dark-yellow hover:text-white shadow-md"
        }
        buttonContainer={"flex justify-end"}
      />
    </form>
  );
}

function UpdateUserPassword({ style }) {
  const { handleSubmit, register, errors, reset } = useContext(FormContext);
  const { updateUser, isPending } = useUpdateUser();

  const onSubmit = ({ password }) => {
    console.log(password);
    if (!password) return;
    updateUser({ password });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={style}>
        <StyledFormUl>
          <StyledFormLi>
            <label htmlFor="password">Update-Password : </label>
            <StyledFormInput
              type="text"
              id="password"
              {...register("password")}
            />
            <p className="text-red-500">{errors.password?.message}</p>
          </StyledFormLi>

          <StyledFormLi>
            <label htmlFor="confirmPassword">Confirm-Password :</label>
            <StyledFormInput
              id="confirmPassword"
              {...register("confirmUpdatePassword")}
            />
            <p className="text-red-500">
              {errors.confirmUpdatePassword?.message}
            </p>
          </StyledFormLi>
        </StyledFormUl>
      </div>
      <Button
        text={"Change-Password"}
        icon={<MdOutlinePassword />}
        style={
          "flex items-center my-2 p-2 bg-medium-yellow rounded-md text-darker-yellow font-bold text-md transition-all hover:bg-dark-yellow hover:text-white shadow-md"
        }
        buttonContainer={"flex justify-end"}
      />
    </form>
  );
}

// function Bookings({ style, header, bookings, selectRef, cabins }) {
//   const { register, handleSubmit, errors, isEdited, editId, settings } =
//     useContext(FormContext);
//   const { guests } = useGuests();
//   console.log(settings.maxGuestsPerBooking);

//   //   console.log(guests);

//   const guestsOptions = guests?.map((guest) => ({
//     value: guest.fullName,
//     label: guest.fullName, // Use the full name of the guest for the label
//   }));

//   const maxGuestsOptions = Array.from(
//     { length: settings.maxGuestsPerBooking },
//     (_, index) => ({
//       value: (index + 1).toString(), // Convert the number to a string (for value)
//       label: (index + 1).toString(), // Convert the number to a string (for label)
//     })
//   );

//   const cabinsList = cabins
//     .map((cabin) => {
//       if (cabin.availability === true) {
//         return {
//           value: cabin.cabin_name,
//           label: cabin.cabin_name,
//         };
//       }
//       return null; // If the cabin is not available, return null
//     })
//     .filter((cabin) => cabin !== null);

//   console.log(cabinsList);

//   const onSubmit = (data) => {
//     if (isEdited) {
//       console.log("ed");
//     } else {
//       console.log(data);
//     }
//   };

//   //GUESTS_SELECT
//   {
//     /* <label htmlFor="guestsNames" className="block text-sm font-medium text-gray-700 text-center">Guests</label>
//               <Select
//                 isMulti
//                 name="guestsNames"
//                 options={guestsOptions}
//                 className="basic-multi-select"
//                 classNamePrefix="select"
//                 menuPortalTarget={document.body}
//                 styles={{
//                   menuPortal: (base) => ({
//                     ...base,
//                     zIndex: 9999,
//                   }),
//                 }}
//               /> */
//   }

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <div className="flex justify-center">
//         <Heading as="h3">{header}</Heading>
//       </div>
//       <div className={style}>
//         <StyledFormUl>
//           <StyledFormLi>
//             <div className="p-4">
//               <label
//                 htmlFor="cabin"
//                 className="block text-sm font-medium text-gray-700 text-center"
//               >
//                 Cabin
//               </label>
//               <Select
//                 name="cabin"
//                 options={cabinsList}
//                 className="basic-multi-select"
//                 classNamePrefix="select"
//                 menuPortalTarget={document.body}
//                 styles={{
//                   menuPortal: (base) => ({
//                     ...base,
//                     zIndex: 9999,
//                   }),
//                 }}
//               />
//             </div>
//             <div className="p-4">
//               <label
//                 htmlFor="guestsNames"
//                 className="block text-sm font-medium text-gray-700 text-center"
//               >
//                 Number of Guests
//               </label>
//               <Select
//                 name="maxGuests"
//                 options={maxGuestsOptions}
//                 className="basic-multi-select"
//                 classNamePrefix="select"
//                 menuPortalTarget={document.body}
//                 styles={{
//                   menuPortal: (base) => ({
//                     ...base,
//                     zIndex: 9999,
//                   }),
//                 }}
//               />
//             </div>
//           </StyledFormLi>
//           <div>
//             <Select
//               isMulti
//               name="guests"
//               options={guestsOptions}
//               className="basic-multi-select"
//               classNamePrefix="select"
//               menuPortalTarget={document.body}
//               styles={{
//                 menuPortal: (base) => ({
//                   ...base,
//                   zIndex: 9999,
//                 }),
//               }}
//             />
//           </div>
//         </StyledFormUl>
//         <Button
//           buttonContainer={"flex justify-center"}
//           text={isEdited ? "SAVE" : "ADD"}
//           icon={isEdited ? <MdSaveAs /> : <MdAddBusiness />}
//           style={
//             "flex justify-center items-center my-2 p-2 bg-medium-yellow rounded-md text-darker-yellow font-bold text-md transition-all hover:bg-dark-yellow hover:text-white shadow-md w-6/12"
//           }
//         />
//       </div>
//     </form>
//   );
// }

/* <img src={`https://flagsapi.com/${countryFlag}/shiny/24.png/`} />; */

Form.Cabin = Cabin;
Form.Settings = Settings;
Form.Guests = Guests;
Form.Login = Login;
Form.Register = Register;
Form.UpdateUserData = UpdateUserData;
Form.UpdateUserPassword = UpdateUserPassword;

// Form.Bookings = Bookings;

export default Form;
