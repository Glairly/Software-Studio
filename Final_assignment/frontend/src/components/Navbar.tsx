import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";

import "../css/Navbar.css";
import {
  selectUser,
  setUser,
  removeUser,
  role,
} from "../features/auth/authSlice";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import LogoutIcon from "@mui/icons-material/Logout";
import RedeemIcon from "@mui/icons-material/Redeem";
import StorageIcon from "@mui/icons-material/Storage";
import { Divider } from "@mui/material";

interface NavbarProps {
  isAuth?: Boolean;
}

const Navbar = (props: NavbarProps) => {
  const user = useAppSelector(selectUser);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const pages = [
    {
      icon: <AddCircleIcon />,
      label: "สร้างกระทู้",
      fn: () => {
        navigate("/addblog", { replace: true });
      },
    },
    {
      icon: <StorageIcon />,
      label: "หน้าจัดการข้อมูล",
      fn: () => {
        navigate("/admin", { replace: true });
      },
    },
    // {
    //   icon: <CalendarTodayIcon />,
    //   label: "กิจกรรม",
    //   fn: () => {
    //     navigate("/profile", { replace: true });
    //   },
    // },
    // {
    //   icon: <RedeemIcon />,
    //   label: "แลกแต้ม",
    //   fn: () => {
    //     navigate("/redeem", { replace: true });
    //   },
    // },
  ];

  const settings = [
    {
      icon: <PersonIcon />,
      label: "โปรไฟล์",
      fn: () => {
        navigate("/profile", { replace: true });
      },
    },
    {
      icon: <BookmarkIcon />,
      label: "กระทู้ของฉัน",
      fn: () => {
        navigate("/myblog", { replace: true });
      },
    },
    {
      icon: <LogoutIcon />,
      label: "Logout",
      fn: () => {
        dispatch(removeUser());
      },
    },
  ];

  const UnAuth = () => {
    return (
      <>
        <div className="flex flew-row items-center font-bold mr-4">
          <Link to="/auth?mode=0">Register</Link>
          <p className="mx-2 text-2xl">|</p>
          <Link to="/auth?mode=1">Login</Link>
        </div>
      </>
    );
  };

  const Auth = () => {
    return (
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map((setting) => (
            <MenuItem
              key={setting.label}
              onClick={() => {
                setting.fn();
                handleCloseUserMenu();
              }}
            >
              <Typography textAlign="center">{setting.label}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    );
  };

  return (
    <AppBar position="static" color="inherit">
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="div"
          className="text-orange-600"
          sx={{ mr: 4, display: { xs: "none", md: "flex" } }}
        >
          <Link to="/">
            <span className="font-bold">Pra-Song</span>{" "}
            {user.role ? "| Admin" : ""}{" "}
          </Link>
        </Typography>

        {/* Action btn */}
        {!props.isAuth ? (
          <div className="flex-grow"></div>
        ) : (
          <Box
            sx={{
              flexGrow: 1,
              display: {
                xs: "none",
                md: "flex",
              },
              justifyContent: "end",
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.label}
                onClick={() => {
                  page.fn();
                  handleCloseNavMenu();
                }}
                sx={{
                  my: 2,
                  color: "black",
                  fontWeight: "bold",
                  mr: 4,
                }}
                startIcon={page.icon}
              >
                {page.label}
              </Button>
            ))}
          </Box>
        )}

        {/* Auth */}
        {props.isAuth ? "" : <UnAuth />}
        <Box sx={{ flexGrow: 0, display: props.isAuth ? "block" : "none" }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src={user.picture} />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <Typography sx={{ fontWeight: "bold", py: 1, textAlign: "center" }}>
              {user.username}
            </Typography>
            <Divider />
            {settings.map((setting) => (
              <MenuItem
                key={setting.label}
                onClick={() => {
                  setting.fn();
                  handleCloseUserMenu();
                }}
              >
                {setting.icon}
                <Typography
                  textAlign="center"
                  sx={{ fontWeight: "bold", ml: 2, my: 1 }}
                >
                  {setting.label}
                </Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
