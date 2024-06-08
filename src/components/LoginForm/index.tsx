"use client";

import { authenticate } from "@/lib/actions";
import { useForm } from "react-hook-form";

type FormInputs = {
  readonly username: string;
  readonly password: string;
};

export const LoginForm = () => {
  const {
    register,
    formState: { errors },
  } = useForm<FormInputs>();

  return (
    <form action={authenticate}>
      <div>
        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="username"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Username"
          {...register("username", { required: true })}
        />
      </div>
      <div>
        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="password"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="••••••••"
          {...register("password", { required: true })}
        />
      </div>
      {errors.username && <span>This field is required</span>}
      {errors.password && <span>This field is required</span>}
      <input type="submit" />
    </form>
  );
};
