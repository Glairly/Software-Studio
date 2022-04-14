import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectUser, setUser, role, User } from "./authSlice";

import axios from "axios";

export default function Auth() {
  const user = useAppSelector(selectUser);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();

  const login = async () => {
    const payload = new FormData();
    payload.append("Username", username);
    payload.append("Password", password);

    try {
      const data = await axios("https://localhost:7056/Auth/Login", {
        method: "POST",
        data: payload,
      });

      if (!data.data.result) throw new Error(data.data.message);
      dispatch(setUser(data.data.result as User));
    } catch (e) {
      alert(e);
    }

    // dispatch(setUser(dummy));
  };

  return (
    <>
      <div className="flex flex-col w-96 shadow rounded-xl p-6 mx-auto my-10">
        <p className="font-bold text-lg my-4">Login</p>
        <label htmlFor="username">Username</label>
        <input
          name="username"
          className="border border-black"
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          className="border border-black"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button className="p-2 bg-slate-400 rounded mt-10" onClick={() => login()}>
          login
        </button>
      </div>
    </>
  );
}
