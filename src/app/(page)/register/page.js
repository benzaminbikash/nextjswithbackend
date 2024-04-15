"use client";
import React, { useState } from "react";
import Link from "next/link";

const page = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setError("Email and password are required.");
    } else {
      setError("");
      alert(`Your email is ${email}`);
    }
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="bg-black shadow-2xl shadow-white  w-1/3 rounded-md  px-5 py-10">
        <h1 className="text-2xl font-bold uppercase text-center mb-10">
          Register Here
        </h1>
        <form onSubmit={handleSubmit} action="" className="flex flex-col gap-4">
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Username"
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
            Register
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
