"use client";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { FormState, handleSignIn } from "../actions";

export default function SignIn() {
  const [formState, formAction] = useFormState(handleSignIn, {
    message: "",
    error: false,
  } as FormState);
  const { pending } = useFormStatus();

  return (
    <form className="flex flex-col gap-2" action={formAction}>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-bold text-2xl">Sign In</h1>
      </div>
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="rounded-md p-2 outline outline-gray-200 focus:outline-black outline-1  focus:outline-2 mb-2"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="rounded-md p-2 outline outline-gray-200 focus:outline-black outline-1  focus:outline-2 mb-2"
      />
      <button
        type="submit"
        className={`bg-black text-white rounded-lg p-2 mb-2 ${
          pending && "opacity-50"
        }`}
        disabled={pending}
      >
        {pending ? "Signing In" : "Sign In"}
      </button>
      {formState.error && (
        <p className="text-red-500 text-center">{formState.message}</p>
      )}
      <hr className="my-3" />
      <Link href={"/auth/sign-up"} className="m-auto text-gray-400">
        Sign Up
      </Link>
    </form>
  );
}
