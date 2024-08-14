"use client";
import { CreatePetDTO } from "@/dtos";
import { usePets } from "@/hooks/usePets";
import { addPet } from "@/services/petService";
import { tokenAtom } from "@/store/atoms";
import { Pet } from "@/types/Pet";
import { Alert, AlertIcon } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { useState } from "react";

import { useForm, Controller } from "react-hook-form";

export const AddPetForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CreatePetDTO>();
  const [isAgeUnknown, setIsAgeUnknown] = useState(false);
  const [display, setDisplay] = useState(false);
  const [type, setType] = useState<
    "success" | "info" | "warning" | "error" | "loading" | undefined
  >();
  const [token] = useAtom(tokenAtom);
  const { pets, setPets } = usePets();

  const onSubmit = async (data: CreatePetDTO) => {
    try {
      // Handle petAge based on ageUnknown checkbox
      if (data.ageUnknown) {
        data.petAge = undefined; // Ensure petAge is undefined if ageUnknown is checked
      } else {
        data.petAge = Number(data.petAge); // Convert petAge to number
      }

      // Ensure crossing has a valid value
      data.crossing = !!data.crossing;

      // Call the addPet service
      const response: Pet = await addPet(data, token);
      setPets([response, ...pets]);
      setDisplay(true);
      setType("success");
      setTimeout(() => {
        setDisplay(false);
      }, 2000);
      // Handle the response
      console.log("Pet added successfully:", response);
      // You can also handle success messages or redirect the user here
    } catch (error) {
      console.error("Error adding pet:", error);
      setDisplay(true);
      setType("error");
      setTimeout(() => {
        setDisplay(false);
      }, 2000);
      // Handle errors here, e.g., show an error message to the user
    }
  };

  const handleAgeUnknownChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsAgeUnknown(checked);
    setValue("ageUnknown", checked); // Set the checkbox value
    if (checked) {
      setValue("petAge", undefined); // Clear petAge if ageUnknown is checked
    }
  };
  return (
    <form className="mt-8 bg-almond" onSubmit={handleSubmit(onSubmit)}>
      {display && (
        <Alert status={type} textAlign={"center"} className="mb-8">
          <AlertIcon />
          {type === "success" && "Pet added it into the database!"}
          {type === "error" && "There is an error at adding"}
        </Alert>
      )}
      <div className="flex justify-center align-middle items-center gap-5 w-4/5">
        <div className="relative z-0 w-full mb-5 group">
          <Controller
            name="animalId"
            control={control}
            defaultValue=""
            rules={{
              required: "Animal ID is required",
              pattern: {
                value: /^[A-Za-z0-9]{6}$/, // Adjust pattern as needed
                message: "Animal ID must be exactly 6 alphanumeric characters",
              },
            }}
            render={({ field }) => (
              <>
                <input
                  type="text"
                  {...field}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-darkGreen-700 peer"
                  placeholder=" "
                />
                <label className="peer-focus:font-medium absolute text-xl text-darkGreen-800 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-darkGreen-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Animal ID
                </label>
                {errors.animalId && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.animalId.message}
                  </p>
                )}
              </>
            )}
          />
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <Controller
            name="intakeType"
            control={control}
            defaultValue=""
            rules={{ required: "Intake Type is required" }}
            render={({ field }) => (
              <>
                <input
                  type="text"
                  {...field}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-darkGreen-700 peer"
                  placeholder=" "
                />
                <label className="peer-focus:font-medium absolute text-xl text-darkGreen-800 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-darkGreen-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Intake Type
                </label>
                {errors.intakeType && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.intakeType.message}
                  </p>
                )}
              </>
            )}
          />
        </div>
      </div>

      <div className="flex justify-center align-middle items-center gap-5 w-4/5">
        <div className="relative z-0 w-full mb-5 group">
          <Controller
            name="petName"
            control={control}
            defaultValue=""
            rules={{ required: "Pet Name is required" }}
            render={({ field }) => (
              <>
                <input
                  type="text"
                  {...field}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-darkGreen-700 peer"
                  placeholder=" "
                />
                <label className="peer-focus:font-medium absolute text-xl text-darkGreen-800 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-darkGreen-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Pet Name
                </label>
                {errors.petName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.petName.message}
                  </p>
                )}
              </>
            )}
          />
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <Controller
            name="animalType"
            control={control}
            defaultValue=""
            rules={{ required: "Animal Type is required" }}
            render={({ field }) => (
              <>
                <input
                  type="text"
                  {...field}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-darkGreen-700 peer"
                  placeholder=" "
                />
                <label className="peer-focus:font-medium absolute text-xl text-darkGreen-800 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-darkGreen-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Animal Type
                </label>
                {errors.animalType && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.animalType.message}
                  </p>
                )}
              </>
            )}
          />
        </div>
      </div>

      <div className="flex justify-center align-middle items-center gap-5 w-4/5">
        <div className="flex w-full flex-row-reverse">
          <div className="relative z-0 w-full mb-5 group">
            <Controller
              name="ageUnknown"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <>
                  <input
                    type="checkbox"
                    id="ageUnknown"
                    checked={field.value} // Use `field.value` for the checkbox state
                    onChange={(e) => {
                      field.onChange(e); // Handle the change event
                      handleAgeUnknownChange(e); // Custom handler for state and value management
                    }}
                    className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
                  />
                  <label
                    htmlFor="ageUnknown"
                    className="ml-2 text-sm text-gray-500"
                  >
                    Age Unknown
                  </label>
                </>
              )}
            />
          </div>

          {!isAgeUnknown && (
            <div className="relative z-0 w-full mb-5 group">
              <Controller
                name="petAge"
                control={control}
                defaultValue={0}
                rules={{
                  required: !isAgeUnknown && "Pet Age is required",
                }}
                render={({ field }) => (
                  <>
                    <input
                      type="number"
                      {...field}
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-darkGreen-700 peer"
                      placeholder=" "
                    />
                    <label className="peer-focus:font-medium absolute text-xl text-darkGreen-800 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-darkGreen-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      Pet Age
                    </label>
                    {errors.petAge && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.petAge.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
          )}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <Controller
            name="petSize"
            control={control}
            defaultValue=""
            rules={{ required: "Pet Size is required" }}
            render={({ field }) => (
              <>
                <select
                  {...field}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-darkGreen-700 peer"
                >
                  <option value="" disabled>
                    Select Pet Size
                  </option>
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
                <label className="peer-focus:font-medium absolute text-xl text-darkGreen-800 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-darkGreen-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Pet Size
                </label>
                {errors.petSize && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.petSize.message}
                  </p>
                )}
              </>
            )}
          />
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <Controller
            name="inDate"
            control={control}
            defaultValue=""
            rules={{ required: "Intake Date is required" }}
            render={({ field }) => (
              <>
                <input
                  type="date"
                  {...field}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-darkGreen-700 peer"
                  placeholder=" "
                />
                <label className="peer-focus:font-medium absolute text-xl text-darkGreen-800 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-darkGreen-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Intake Date
                </label>
                {errors.inDate && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.inDate.message}
                  </p>
                )}
              </>
            )}
          />
        </div>
      </div>

      <div className="flex justify-center align-middle items-center gap-5 w-4/5">
        <div className="relative z-0 w-full mb-5 group">
          <Controller
            name="color"
            control={control}
            defaultValue=""
            rules={{ required: "Color is required" }}
            render={({ field }) => (
              <>
                <input
                  type="text"
                  {...field}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-darkGreen-700 peer"
                  placeholder=" "
                />
                <label className="peer-focus:font-medium absolute text-xl text-darkGreen-800 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-darkGreen-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Color
                </label>
                {errors.color && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.color.message}
                  </p>
                )}
              </>
            )}
          />
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <Controller
            name="breed"
            control={control}
            defaultValue=""
            rules={{ required: "Breed is required" }}
            render={({ field }) => (
              <>
                <input
                  type="text"
                  {...field}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-darkGreen-700 peer"
                  placeholder=" "
                />
                <label className="peer-focus:font-medium absolute text-xl text-darkGreen-800 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-darkGreen-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Breed
                </label>
                {errors.breed && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.breed.message}
                  </p>
                )}
              </>
            )}
          />
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <Controller
            name="sex"
            control={control}
            defaultValue="F"
            rules={{
              required: "Sex is required",
              validate: (value) =>
                ["F", "M", "S"].includes(value) || "Invalid sex value",
            }}
            render={({ field }) => (
              <>
                <select
                  {...field}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-darkGreen-700 peer"
                >
                  <option value="" disabled>
                    Select sex
                  </option>
                  <option value="F">Female</option>
                  <option value="M">Male</option>
                  <option value="S">Unknown</option>
                </select>
                <label className="peer-focus:font-medium absolute text-xl text-darkGreen-800 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-darkGreen-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Sex
                </label>
                {errors.sex && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.sex.message}
                  </p>
                )}
              </>
            )}
          />
        </div>
      </div>

      <div className="relative z-0 w-4/5 mb-5 group">
        <Controller
          name="url"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <>
              <input
                type="url"
                {...field}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-darkGreen-700 peer"
                placeholder=" "
              />
              <label className="peer-focus:font-medium absolute text-xl text-darkGreen-800 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-darkGreen-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                URL (optional)
              </label>
            </>
          )}
        />
      </div>
      <div className="relative z-0 w-4/5 mb-5 group">
        <Controller
          name="crossing"
          control={control}
          defaultValue={false} // Set default value to `false`
          rules={{
            validate: (value) => {
              const strValue =
                value === true ? "Yes" : value === false ? "No" : "";
              return (
                ["Yes", "No", ""].includes(strValue) ||
                "Invalid value for crossing"
              );
            },
          }}
          render={({ field }) => (
            <>
              <select
                {...field}
                value={field.value ? "Yes" : "No"} // Map boolean value to "Yes" or "No"
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(value === "Yes"); // Convert "Yes" to `true` and "No" to `false`
                }}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-darkGreen-700 peer"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              <label className="peer-focus:font-medium absolute text-xl text-darkGreen-800 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-darkGreen-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Crossing (optional)
              </label>
              {errors.crossing && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.crossing.message}
                </p>
              )}
            </>
          )}
        />
      </div>

      <button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded hover:bg-slate-700"
      >
        Add pet
      </button>
    </form>
  );
};
