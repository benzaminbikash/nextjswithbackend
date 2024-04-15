"use client";
import React from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  return (
    <div className="w-full h-screen flex-col gap-4 justify-center items-center flex">
      <h1>This is your profile.</h1>
      <button
        onClick={() => router.replace("/")}
        className="bg-red-500 px-8 py-2 rounded-full"
      >
        Logout
      </button>
    </div>
  );
};

export default page;
