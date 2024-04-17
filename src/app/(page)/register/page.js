"use client";
import React, { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { Dots } from "react-activity";

const page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setIsLoading(true);
      toast.error("All fields are required.");
      setIsLoading(false);
    } else {
      setIsLoading(true);
      const response = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      const result = await response.json();
      setIsLoading(false);
      if (result.status === true) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    }
  };
  return (
    <div className="max-w-screen-2xl h-screen flex justify-center items-center">
      <div className="bg-black shadow-sm shadow-gray-400  w-1/3 rounded-md  px-5 py-10">
        <h1 className="text-2xl font-bold uppercase text-center mb-10">
          Register Here
        </h1>
        <form onSubmit={handleSubmit} action="" className="flex flex-col gap-4">
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
            className="p-1 text-black rounded-sm focus:outline-1 outline-pink-800"
          />
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
          <button className="bg-red-500 p-1 rounded-sm w-20 self-center">
            {isLoading ? <Dots /> : "Register"}
          </button>
        </form>
        <div className="flex justify-center mt-3 gap-2">
          <p>Already have an account?</p>
          <Link href="/login" className="underline text-blue-500">
            Login{" "}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
