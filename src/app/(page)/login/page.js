"use client";
import React, { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { Dots } from "react-activity";

const page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Email or Password are missing!");
    } else {
      setIsLoading(true);
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const result = await response.json();
      setIsLoading(false);
      console.log(result);
      if (result.status === true) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    }
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="bg-black shadow-2xl shadow-white  w-1/3 rounded-md  px-5 py-10">
        <h1 className="text-2xl font-bold uppercase text-center animate-pulse mb-10">
          Login Here
        </h1>

        <form action="" onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="p-1 text-black rounded-sm focus:outline-1 outline-pink-800"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="p-1 text-black rounded-sm focus:outline-1 outline-pink-800"
          />
          <button className="bg-red-500 p-1 rounded-sm w-20 self-center ">
            {isLoading ? <Dots /> : "Sign In"}
          </button>
        </form>
        <div className="flex justify-center mt-3 gap-2">
          <p>Don't have an account?</p>
          <Link href="/register" className="underline text-blue-500">
            Register{" "}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
