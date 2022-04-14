import React from "react";
import { useAppSelector } from "../app/hooks";
import { selectUser } from "../features/auth/authSlice";

import Navbar from "../components/Navbar";

export default function Home() {

  const user = useAppSelector(selectUser);

  return (
    <>
      <Navbar isAuth={!!user.username} />
      <div>Home</div>
    </>
  );
}
