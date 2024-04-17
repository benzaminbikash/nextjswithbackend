"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Dots from "react-activity/dist/Dots";

// for react:
// const [search, setSearch]=useSearchParams()
// const token = setSearch.get("token");
// button onclick={setsearch({token:"sdffasdf"})}

function page() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  useEffect(() => {
    const TOKEN = window.location.search.split("=")[1];
    setToken(TOKEN || "");

    // const { query } = router;
    // const URLTOKEN = query.token;
  }, []);
  useEffect(() => {
    if (token.length > 0) {
      verifyToken();
    }
  }, [token]);
  const verifyToken = async () => {
    const response = await fetch(
      "http://localhost:3000/api/users/verifyemail",
      {
        method: "POST",
        body: JSON.stringify({ token }),
      }
    );
    const result = await response.json();
    if (result.status === true) {
      setIsVerified(true);
    }
  };
  return (
    <div>
      {isVerified ? (
        <div className="flex flex-col items-center">
          <p>Your account is verified.</p>
          <h1>{token && `${token}`}</h1>
          <button onClick={() => router.push("/login")}>Login</button>
        </div>
      ) : (
        <div className="flex justify-center">
          <Dots size={20} />
        </div>
      )}
    </div>
  );
}

export default page;
