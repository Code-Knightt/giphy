"use client";

export default function SignOutButton() {
  async function handleSignOut() {
    await fetch("/api/auth/signout");
    location.reload();
  }

  return (
    <div
      className="bg-black p-2 text-white rounded-lg cursor-pointer"
      onClick={handleSignOut}
    >
      Sign Out
    </div>
  );
}
