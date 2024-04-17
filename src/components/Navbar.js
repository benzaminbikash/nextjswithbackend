import React from "react";

import Link from "next/link";

function Navbar({ token }) {
  return (
    <div className="max-w-screen-2xl mx-auto  h-20  items-center flex justify-between px-20">
      <h1>Navbars</h1>
      <ul className="flex gap-3">
        <Link href="/">Home</Link>
        {!token ? (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        ) : (
          <Link href="/profile">Profile</Link>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
