import React, { useMemo } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import { useAppSelector } from "./app/hooks";
import Navbar from "./components/Navbar";
import Auth from "./features/auth/Auth";
import { selectUser } from "./features/auth/authSlice";
import AddBlog from "./routes/AddBlog";
import Home from "./routes/Home";
import MyBlog from "./routes/MyBlog";
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
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    );
  };

  return (
    <div className="App">
      {IsAuth === "/auth" ? "" : <Navbar isAuth={!!user.username} />}
      {user.username !== "" ? <AuthApp /> : <UnAuthApp />}
    </div>
  );
}

export default App;
