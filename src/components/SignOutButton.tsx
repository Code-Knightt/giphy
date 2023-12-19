"use client";

interface SignOutButtonProps {
  handleSignOut: any;
}

export default function SignOutButton({ handleSignOut }: SignOutButtonProps) {
  return (
    <div
      className="bg-black p-2 text-white rounded-lg cursor-pointer"
      onClick={async () => {
        await handleSignOut();
        location.reload();
      }}
    >
      Sign Out
    </div>
  );
}
