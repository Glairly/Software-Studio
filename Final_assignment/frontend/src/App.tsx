import { Divider } from "@mui/material";
import React, { useMemo } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import { useAppSelector } from "./app/hooks";
import Navbar from "./components/Navbar";
import Auth from "./features/auth/Auth";
import { selectUser } from "./features/auth/authSlice";
import AddBlog from "./routes/AddBlog";
import Admin from "./routes/Admin";
import Home from "./routes/Home";
import MyBlog from "./routes/MyBlog";
import Profile from "./routes/Profile";
import ViewBlog from "./routes/ViewBlog";

function App() {
  const user = useAppSelector(selectUser);

  const location = useLocation();

  const IsAuth = useMemo(() => {
    // console.log(location);
    return location.pathname;
  }, [location]);

  const UnAuthApp = () => {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/viewblog" element={<ViewBlog />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    );
  };

  const AuthApp = () => {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/myblog" element={<MyBlog />} />
        <Route path="/addblog" element={<AddBlog />} />
        <Route path="/viewblog" element={<ViewBlog />} />
        <Route path="/profile" element={<Profile />} />
        {user.role ? <Route path="/admin" element={<Admin />} /> : ""}
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    );
  };

  return (
    <div className="App">
      {IsAuth === "/auth" ? "" : <Navbar isAuth={!!user.username} />}
      {user.username !== "" ? <AuthApp /> : <UnAuthApp />}
      <div className="flex-grow p-8"></div>
      <footer className="mt-auto bg-orange-500 text-white">
        <p className=" text-lg p-2">Prasong</p>
        <Divider
          sx={{
            width: "10%",
            mx: "auto",
            bgcolor: "white",
            height: 4,
            borderRadius: "10px",
          }}
        />
        <p className="p-2">ce.kmitl all rights reserved & copyright 2022</p>
        <Divider
          sx={{
            width: "10%",
            mx: "auto",
            bgcolor: "white",
            height: 4,
            borderRadius: "10px",
          }}
        />
       <p className="p-2">62010152 ชนวีร์ เชนชัชวาล | 62010462 นภาพร ตั้งใจ | 62010787 วงวริศ พันธ์เจริญ | 62010808 วริศ เผ่าทองศุข </p>
      </footer>
    </div>
  );
}

export default App;
