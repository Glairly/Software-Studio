import { Button, Container, IconButton } from "@mui/material";
import React, { useState, useMemo } from "react";

import { Grid } from "@mui/material";
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

import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  fetchBlogs,
  fetchAnnoucements,
  selectBlog,
  selectAnnoucement,
  Blog,
} from "../features/blog/blogSlice";
import { fetchBlog } from "../features/blog/blogAPI";
import { blockUser, fetchAllUser } from "../features/auth/authAPI";
import { User } from "../features/auth/authSlice";

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

  useMemo(async () => {
    await refetchBlog();
    await refetchUser();
  }, []);

  return (
    <Container sx={{ my: 8 }}>
      <Grid>
        <Grid item sx={{ textAlign: "left", mb: 4 }}>
          <Typography variant="h4">จัดการข้อมูล</Typography>
        </Grid>
        <Grid item>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="กระทู้" {...a11yProps(0)} />
              <Tab label="บัญชีผู้ใช้" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <BlogList
              showAll={true}
              blogs={blogs}
              refreshCallBack={refetchBlog}
              hideFeatured={true}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>id</TableCell>
                    <TableCell align="left">Name</TableCell>
                    <TableCell align="left">Username</TableCell>
                    <TableCell align="left">Role</TableCell>
                    <TableCell align="right" sx={{ width: "100px" }}>
                      {" "}
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
                      <TableCell align="left">{row.role}</TableCell>
                      <TableCell align="right">
                        {/* <IconButton onClick={() => handleHideUser(row.id)}>
                          <DeleteIcon color="error" />
                        </IconButton> */}
                        {row.disabled ? (
                          <Tooltip title="ปลดบล็อค">
                            <IconButton
                              onClick={() => handleHideUser(row.id, false)}
                            >
                              <LockIcon color="info" fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        ) : (
                          <Tooltip title="บล็อค">
                            <IconButton
                              onClick={() => handleHideUser(row.id, true)}
                            >
                              <LockOpenIcon color="error" fontSize="small" />
                            </IconButton>
                          </Tooltip>
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
    </Container>
  );
}
