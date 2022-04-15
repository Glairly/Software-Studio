import React, { useState } from "react";

import { Typography } from "@mui/material";
import Login from "./Login";
import Register from "./Register";
import { useLocation } from "react-router-dom";

export default function Auth() {

  const { search } = useLocation();
  const params = React.useMemo(() => new URLSearchParams(search), [search]);
  const [mode, setMode] = useState(params.get("mode") || "0");

  const IsLogin = () => {
    return (
      <>
        <div className="flex flex-col w-96 h-auto shadow-xl shadow-orange-600/20 rounded-xl p-6 mt-10">
          <Login />
          <Typography sx={{ mt: 2 }}>
            To{" "}
            <button
              className="underline text-orange-600"
              onClick={() => setMode("0")}
            >
              Register.
            </button>
          </Typography>
        </div>
      </>
    );
  };

  const IsRegister = () => {
    return (
      <>
        <div className="flex flex-col w-96 h-auto shadow-xl shadow-orange-600/20 rounded-xl p-6 mt-10">
          <Register />
          <Typography sx={{ mt: 2 }}>
            To{" "}
            <button
              className="underline text-orange-600"
              onClick={() => setMode("1")}
            >
              Login.
            </button>
          </Typography>
        </div>
      </>
    );
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
        {mode == "1" ? <IsLogin /> : <IsRegister />}
      </div>
    </>
  );
}
