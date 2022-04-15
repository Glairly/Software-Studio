import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectUser, setUser, role, User } from "./authSlice";

import axios from "axios";

export default function Login() {
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
  };

  return (
    <>
      <p className="font-bold text-xl">Welcome back 😊.</p>
      <div className="my-4"></div>
      <div className="flex flex-col text-left">
        <TextField
          id="filled-basic"
          label="Username"
          color="warning"
          onChange={(e) => setUsername(e.target.value)}
        />

        <div className="my-4"></div>

        <TextField
          id="filled-basic"
          label="Password"
          color="warning"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="my-4"></div>
        <Button
          variant="contained"
          color="warning"
          size="large"
          onClick={() => login()}
        >
          <p className="text-xl">Login</p>
        </Button>
      </div>
    </>
  );
}
