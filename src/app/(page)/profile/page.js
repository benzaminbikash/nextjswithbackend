"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const page = () => {
  const router = useRouter();
  const [data, setData] = useState("");
  useEffect(() => {
    fetchApi();
  }, []);
  const fetchApi = async () => {
    const response = await fetch("http://localhost:3000/api/users/user");
    const result = await response.json();
    setData(result?.data);
  };
  const logoutUser = async () => {
    const response = await fetch("http://localhost:3000/api/users/logout");
    const result = await response.json();
    if (result.status === true) {
      toast.success(result.message);
      router.replace("/");
    }
  };
  return (
    <div className="w-full h-screen flex-col gap-4 justify-center items-center flex">
      <h1>This is your profile.</h1>
      <p>Your Name: {data.name}</p>
      <p>Your Email:{data.email}</p>
      <button
        onClick={() => {
          logoutUser();
        }}
        className="bg-red-500 px-8 py-2 rounded-full"
      >
        Logout
      </button>
    </div>
  );
};

export default page;
