import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectUser, setUser, role, User } from "./authSlice";

import axios from "axios";
import { Box, Button, TextField, Typography } from "@mui/material";

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
      <div className="h-screen max-h-screen flex flex-col items-center justify-center pb-12">
        <Typography
          variant="h2"
          gutterBottom
          component="div"
          className="text-orange-600 font-bold"
        >
          Pra-song
        </Typography>
        <Typography
          variant="subtitle1"
          gutterBottom
          component="div"
          className="text-slate-600"
        >
          Community For a{" "}
          <span className="text-orange-600">Better Thailand</span>.
        </Typography>
        <div className="flex flex-col w-96 h-auto shadow-xl shadow-orange-600/20 rounded-xl p-6 mt-10">
          <p className="font-bold text-xl">Join Us.</p>
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
        </div>
      </div>
    </>
  );
}
