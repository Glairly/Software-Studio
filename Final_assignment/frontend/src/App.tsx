import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { useAppSelector } from "./app/hooks";
import Auth from "./features/auth/Auth";
import { selectUser } from "./features/auth/authSlice";
import Home from "./routes/Home";

function App() {
  const user = useAppSelector(selectUser);

  const UnAuthApp = () => {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    );
  };

  const AuthApp = () => {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    );
  };

  return (
    <div className="App">
      {user.username !== "" ? <AuthApp /> : <UnAuthApp />}
    </div>
  );
}

export default App;
