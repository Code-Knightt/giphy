"use client";
import Link from "next/link";
import { FormState, handleSignUp } from "../actions";
import { useFormState, useFormStatus } from "react-dom";

export default function SignUp() {
  const [formState, formAction] = useFormState(handleSignUp, {
    message: "",
    error: false,
  } as FormState);
  const { pending } = useFormStatus();

  return (
    <form className="flex flex-col gap-2" action={formAction}>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-bold text-2xl">Sign Up</h1>
      </div>
      <input
        type="text"
        name="name"
        placeholder="Name"
        required
        className="rounded-md p-2 outline outline-gray-200 focus:outline-black outline-1  focus:outline-2 mb-2"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        className="rounded-md p-2 outline outline-gray-200 focus:outline-black outline-1  focus:outline-2 mb-2"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        className="rounded-md p-2 outline outline-gray-200 focus:outline-black outline-1  focus:outline-2 mb-2"
      />
      <input
        type="password"
        name="confirm"
        placeholder="Confirm Password"
        required
        className="rounded-md p-2 outline outline-gray-200 focus:outline-black outline-1  focus:outline-2 mb-2"
      />
      <button
        type="submit"
        disabled={pending}
        className={`bg-black text-white rounded-lg p-2 mb-2 ${
          pending && "opacity-50"
        }`}
      >
        {pending ? "Signing Up" : "Sign up"}
      </button>
      {formState.error && (
        <p className="text-red-500 text-center">{formState.message}</p>
      )}
      <hr className="my-3" />
      <Link href={"/auth/sign-in"} className="m-auto text-gray-400">
        Sign In
      </Link>
    </form>
  );
}
