"use client";

import { authenticate } from "@/app/actions/auth";
import { FormState } from "@/app/lib/definitions";
import { useActionState } from "react";

const initialState: FormState = {
  message: "",
};

export const LoginForm = () => {
  const [state, formAction, pending] = useActionState<FormState, FormData>(
    authenticate,
    initialState
  );

  return (
    <form action={formAction}>
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
          name="username"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Username"
          required
        />
        {state?.errors?.username &&
          state.errors.username.map((msg) => <p aria-live="polite">{msg}</p>)}
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
          name="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="••••••••"
          required
        />
        {state?.errors?.password &&
          state.errors.password.map((msg) => <p aria-live="polite">{msg}</p>)}
      </div>
      <p aria-live="polite">{state?.message}</p>
      <button disabled={pending}>Sign in</button>
    </form>
  );
};
