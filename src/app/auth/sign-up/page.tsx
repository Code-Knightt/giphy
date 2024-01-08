"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

interface SignUpInputs extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  email: HTMLInputElement;
  password: HTMLInputElement;
  confirm: HTMLInputElement;
}

interface SignUpForm extends HTMLFormElement {
  readonly elements: SignUpInputs;
}

export default function SignUp() {
  const [formState, setFormState] = useState<{
    type?: String;
    message?: String;
  }>({});
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<SignUpForm>) => {
    e.preventDefault();
    setPending(true);

    const form = e.currentTarget.elements;

    const data = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.name.value,
        email: form.email.value,
        password: form.password.value,
        confirm: form.confirm.value,
      }),
    }).then((res) => res.json());

    setFormState({ type: data.type, message: data.message });
    setPending(false);

    if (data.type === "success") {
      router.refresh();
    }
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
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
      <Link href={"/auth/sign-in"} className="m-auto text-gray-400">
        Sign In
      </Link>
    </form>
  );
}
