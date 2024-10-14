"use client";

import React from "react";
import {
  useForm,
  useFieldArray,
  SubmitHandler,
  useWatch,
  Control,
  Controller,
} from "react-hook-form";
import ReactDatePicker from "./ReactDatePicker";

type ItemLocations = {
  address: string;
  addressDescription: string;
  district: string;
  dong: string;
  latitude: number;
  longitude: number;
  lightningYn: string;
  availabilityRegisterType: string;
  itemAvailabilities: {
    dayOfWeek: string;
    startTime: string;
    endTime: string;
  }[];
};

type RegisterRequest = {
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  itemLocations: ItemLocations[];
};
type FormData = {
  registerRequest: RegisterRequest;
  reactDatepicker: string;
};

const Location = ({ control }: { control: Control<FormData> }) => {
  const formValues = useWatch({
    name: "registerRequest.itemLocations",
    control,
  });
  console.log("formValues", formValues);
  const address = formValues?.map((item: ItemLocations) => item.address);

  return (
    <div>
      Address:
      {address?.map((v, i) => (
        <p key={v}>{v}</p>
      ))}
    </div>
  );
};

export default function RegisterForm() {
  const {
    register,
    control,
    formState: { errors, isDirty, isValid }, // isDirty -> 변경됨, isValid -> 유효함, errors -> 에러
    handleSubmit,
    reset,
    resetField,
  } = useForm<FormData>();

  const { fields, append, remove } = useFieldArray({
    name: "registerRequest.itemLocations",
    control,
  });

  const onSubmit: SubmitHandler<FormData> = (data: unknown) =>
    console.log(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-full gap-4"
    >
      <label>First Name</label>
      <input
        {...register("registerRequest.firstName", {
          required: true,
          maxLength: 10,
        })}
        className="border rounded"
      />
      {errors.registerRequest?.firstName && "First name is required"}
      <button
        type="button"
        onClick={() =>
          resetField("registerRequest.firstName", { keepTouched: true })
        }
        className="border rounded"
      >
        Reset First Name
      </button>
      <label>Last Name</label>
      <input
        {...register("registerRequest.lastName", {
          required: true,
          pattern: /^[A-Za-z]+$/i,
        })}
        className="border rounded"
      />
      {errors.registerRequest?.lastName && "Last name is required"}
      <label>Age</label>
      <input
        type="number"
        {...register("registerRequest.age", {
          required: true,
          min: 18,
          max: 99,
        })}
        className="border rounded"
      />
      {errors.registerRequest?.age && "Age is required"}
      <label>Gender</label>
      <select
        {...register("registerRequest.gender")}
        className="border rounded h-[26px]"
      >
        <option value="female">female</option>
        <option value="male">male</option>
        <option value="other">other</option>
      </select>
      <input
        type="submit"
        className={`border rounded ${
          isValid
            ? "bg-gray-300 active:bg-gray-400 cursor-pointer"
            : "bg-gray-100 text-gray-300"
        }`}
        disabled={!isValid}
      />
      <Controller
        control={control}
        name="reactDatepicker"
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <ReactDatePicker
            onChange={onChange} // send value to hook form
            onBlur={onBlur} // notify when input is touched/blur
          />
        )}
      />
      {fields.map((field, index) => (
        <div key={field.id} className="flex flex-col gap-4">
          <input
            {...register(`registerRequest.itemLocations.${index}.address`, {
              required: true,
            })}
            className="border rounded"
          />
          <input
            {...register(
              `registerRequest.itemLocations.${index}.addressDescription`
            )}
            className="border rounded"
          />
          <input
            {...register(`registerRequest.itemLocations.${index}.district`)}
            className="border rounded"
          />
          <input
            {...register(`registerRequest.itemLocations.${index}.dong`)}
            className="border rounded"
          />
          <input
            type="number"
            {...register(`registerRequest.itemLocations.${index}.latitude`, {
              required: true,
            })}
            className="border rounded"
          />
          <input
            type="number"
            {...register(`registerRequest.itemLocations.${index}.longitude`, {
              required: true,
            })}
            className="border rounded"
          />
          <input
            {...register(`registerRequest.itemLocations.${index}.lightningYn`)}
            className="border rounded"
          />
          <input
            {...register(
              `registerRequest.itemLocations.${index}.availabilityRegisterType`
            )}
            className="border rounded"
          />
          <button
            type="button"
            onClick={() => remove(index)}
            className="border rounded"
          >
            Remove
          </button>
        </div>
      ))}
      <Location control={control} />
      <button
        type="button"
        onClick={() =>
          append({
            address: "",
            addressDescription: "",
            district: "",
            dong: "",
            latitude: 0,
            longitude: 0,
            lightningYn: "",
            availabilityRegisterType: "",
            itemAvailabilities: [],
          })
        }
        className="border rounded"
      >
        Add Location
      </button>
      <button type="button" onClick={() => reset()} className="border rounded">
        Reset
      </button>
    </form>
  );
}
