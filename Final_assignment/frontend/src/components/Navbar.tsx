import React from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";

import "../css/Navbar.css";
import { selectUser, setUser, removeUser, role } from "../features/auth/authSlice";

import * as Mui from '@mui/material'


interface NavbarProps {
  isAuth?: Boolean;
}

const Navbar = (props: NavbarProps) => {
  const user = useAppSelector(selectUser);


  const dispatch = useAppDispatch();

  const UnAuth = () => {
    return (
      <>
        <div className="flex flew-row">
          <Link to="/auth">Register</Link>
          <p className="mx-2">|</p>
          <Link to="/auth">Login</Link>
        </div>
      </>
    );
  };

  const Auth = () => {
    return (
      <>
        <div className="flex flew-row">
          <Mui.Button
            onClick={() => {
              dispatch(removeUser());
            }}
          >
            Logout
          </Mui.Button>
        </div>
      </>
    );
  };


  return (
    <nav>
      <div>Pra-song</div>
      {/* spacer */}
      <div className="flex-grow"></div>
      <div>
        {props.isAuth ? <Auth /> : <UnAuth />}{" "}
      </div>
    </nav>
  );
};

export default Navbar;
