import React from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";

import "../css/Navbar.css";
import { selectUser, setUser, removeUser, role } from "../features/auth/authSlice";

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
          <button
            onClick={() => {
              dispatch(removeUser());
            }}
          >
            Logout
          </button>
        </div>
      </>
    );
  };


  return (
    <nav>
      <div>Logo</div>
      {/* spacer */}
      <div className="flex-grow"></div>
      <div>
        {props.isAuth ? <Auth /> : <UnAuth />}{" "}
      </div>
    </nav>
  );
};

export default Navbar;
