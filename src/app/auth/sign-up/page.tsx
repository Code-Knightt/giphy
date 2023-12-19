import Link from "next/link";

export default async function SignUp() {
  return (
    <form className="flex flex-col gap-2">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-bold text-2xl">Sign Up</h1>
      </div>
      <input
        type="text"
        name="name"
        placeholder="Name"
        className="rounded-md p-2 outline outline-gray-200 focus:outline-black outline-1  focus:outline-2 mb-2"
      />
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
      <input
        type="password"
        name="confirm"
        placeholder="Confirm Password"
        className="rounded-md p-2 outline outline-gray-200 focus:outline-black outline-1  focus:outline-2 mb-2"
      />
      <button type="submit" className="bg-black text-white rounded-lg p-2 mb-2">
        Sign Up
      </button>
      <hr className="my-3" />
      <Link href={"/auth/sign-in"} className="m-auto text-gray-400">
        Sign In
      </Link>
    </form>
  );
}
