import { Button, Container, IconButton } from "@mui/material";
import React, { useState, useMemo } from "react";

import {
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import BlogList from "../features/blog/Blog";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import LockIcon from "@mui/icons-material/Lock";
import DeleteIcon from "@mui/icons-material/Delete";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import ArchiveIcon from "@mui/icons-material/Archive";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

import { orange } from "@mui/material/colors";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  fetchBlogs,
  fetchAnnoucements,
  selectBlog,
  selectAnnoucement,
  Blog,
} from "../features/blog/blogSlice";
import { fetchBlog } from "../features/blog/blogAPI";
import {
  blockUser,
  ChangeRoleUser,
  fetchAllUser,
} from "../features/auth/authAPI";
import { selectUser, User } from "../features/auth/authSlice";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Admin() {
  const [value, setValue] = React.useState(0);

  const user = useAppSelector(selectUser);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [blogs, setBlogs] = useState([] as Blog[]);
  const [users, setUsers] = useState([] as User[]);

  const refetchBlog = async () => {
    setBlogs((await fetchBlog(true)).response);
  };

  const refetchUser = async () => {
    setUsers((await fetchAllUser(true)).response);
  };

  const handleHideUser = async (id: any, status: any) => {
    try {
      await blockUser(id, status);
      alert("Success.");
      await refetchUser();
    } catch (e) {}
  };

  const handleChangeRole = async (id: any, role: any) => {
    try {
      await ChangeRoleUser(id, role);
      alert("Success.");
      await refetchUser();
    } catch (e) {}
  };

  useMemo(async () => {
    await refetchBlog();
    await refetchUser();
  }, []);

  return (
    <Grid sx={{ p: 8 }}>
      <Grid>
        <Grid item sx={{ textAlign: "left", mb: 4 }}>
          <Typography variant="h4">จัดการข้อมูล</Typography>
        </Grid>
        <Grid item>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              TabIndicatorProps={{
                style: { background: "orange", color: "orange" },
              }}
            >
              <Tab label="กระทู้" {...a11yProps(0)} />
              <Tab label="บัญชีผู้ใช้" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <div className="flex md:flex-row flex-col flex-wrap justify-around">
              <ListItem sx={{ width: "fit-content" }}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "rgb(234 88 12 )" }}>
                    <ArchiveIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="กระทู้" secondary={blogs?.length || 0} />
              </ListItem>
              <ListItem sx={{ width: "fit-content" }}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "#d32f2f" }}>
                    <FavoriteIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="ไลค์"
                  secondary={
                    blogs?.map((el) => el.likes).reduce((a, b) => a + b, 0) || 0
                  }
                />
              </ListItem>

              <ListItem sx={{ width: "fit-content" }}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "rgb(37 99 235)" }}>
                    <ChatBubbleIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="คอมเม้นต์"
                  secondary={
                    blogs
                      ?.map((el) => el.comments)
                      .reduce((a, b) => a + b, 0) || 0
                  }
                />
              </ListItem>
            </div>
            <BlogList
              showAll={true}
              blogs={blogs}
              refreshCallBack={refetchBlog}
              hideFeatured={true}
              hideHeader={true}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div className="flex md:flex-row flex-col justify-center">
              <ListItem sx={{ width: "fit-content" }}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "#2979ff" }}>
                    <AccountBoxIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="บัญชีสมาชิก"
                  secondary={users.filter((x) => !x.role).length}
                />
              </ListItem>
              <ListItem sx={{ width: "fit-content" }}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "#f50057" }}>
                    <AccountBoxIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="บัญชีแอดมิน"
                  secondary={users.filter((x) => x.role).length}
                />
              </ListItem>
            </div>

            <TableContainer component={Paper} sx={{ mt: "3rem" }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow
                    sx={{
                      boxShadow:
                        "rgba(17, 17, 26, 0.05) 0px 4px 16px,rgba(17, 17, 26, 0.05) 0px 8px 16px ",
                    }}
                  >
                    <TableCell sx={{ fontWeight: "bold" }}>UID</TableCell>
                    <TableCell align="left" sx={{ fontWeight: "bold" }}>
                      Name
                    </TableCell>
                    <TableCell align="left" sx={{ fontWeight: "bold" }}>
                      Username
                    </TableCell>
                    <TableCell align="left" sx={{ fontWeight: "bold" }}>
                      Role
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ width: "120px", fontWeight: "bold" }}
                    >
                      Action
                    </TableCell>
                    {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((row) => (
                    <TableRow
                      hover
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">{row.username}</TableCell>
                      <TableCell
                        align="left"
                        sx={{ color: row.role ? "red" : "" }}
                      >
                        {row.role ? "Admin" : "Member"}
                      </TableCell>
                      <TableCell align="right">
                        {/* <IconButton onClick={() => handleHideUser(row.id)}>
                          <DeleteIcon color="error" />
                        </IconButton> */}
                        {row.id === user.id ? (
                          ""
                        ) : (
                          <Grid container direction="row" justifyContent="end">
                            {row.disabled ? (
                              <Tooltip title="ปลดบล็อค">
                                <IconButton
                                  onClick={() => handleHideUser(row.id, false)}
                                >
                                  <LockIcon color="error" fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            ) : (
                              <Tooltip title="บล็อค">
                                <IconButton
                                  onClick={() => handleHideUser(row.id, true)}
                                >
                                  <LockOpenIcon color="info" fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            )}

                            {row.role ? (
                              <Tooltip title="ถอดยศ">
                                <IconButton
                                  onClick={() => handleChangeRole(row.id, 0)}
                                >
                                  <WorkspacePremiumIcon
                                    color="info"
                                    fontSize="small"
                                  />
                                </IconButton>
                              </Tooltip>
                            ) : (
                              <Tooltip title="ให้ยศ">
                                <IconButton
                                  onClick={() => handleChangeRole(row.id, 1)}
                                >
                                  <WorkspacePremiumIcon
                                    color="disabled"
                                    fontSize="small"
                                  />
                                </IconButton>
                              </Tooltip>
                            )}
                          </Grid>
                        )}
                      </TableCell>
                      {/* <TableCell align="right">
                        {row.picture.slice(0.2) + "..."}
                      </TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
        </Grid>
      </Grid>
    </Grid>
  );
}
