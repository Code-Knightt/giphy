"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

interface SignInInputs extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
}

interface SignInForm extends HTMLFormElement {
  readonly elements: SignInInputs;
}

export default function SignIn() {
  const [formState, setFormState] = useState<{
    type?: String;
    message?: String;
  }>({});
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const handleSignIn = async (e: FormEvent<SignInForm>) => {
    e.preventDefault();
    setPending(true);
    const form = e.currentTarget.elements;

    const data = await fetch("/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: form.email.value,
        password: form.password.value,
      }),
    }).then((res) => res.json());

    setFormState({ type: data.type, message: data.message });
    setPending(false);

    if (data.type === "success") {
      router.refresh();
    }
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSignIn}>
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
      {formState.message?.length !== 0 && (
        <p
          className={`${
            formState.type === "error" ? "text-red-500" : "text-green-500"
          } text-center`}
        >
          {formState.message}
        </p>
      )}
      <hr className="my-3" />
      <Link href={"/auth/sign-up"} className="m-auto text-gray-400">
        Sign Up
      </Link>
    </form>
  );
}
