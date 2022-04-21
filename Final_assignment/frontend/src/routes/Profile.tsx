import {
  Card,
  Container,
  CardMedia,
  Typography,
  CardContent,
  CardActions,
  Button,
  Paper,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  TextField,
  Divider,
} from "@mui/material";
import React, { useState, useMemo } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { selectUser, setUser, User } from "../features/auth/authSlice";
import ArchiveIcon from "@mui/icons-material/Archive";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

import axios from "axios";
import { fetchUser2 } from "../features/auth/authAPI";

export default function Profile() {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const [password, setPassword] = useState(user.password);
  const [name, setName] = useState(user.name);
  const [picture, setPicture] = useState(user.picture);

  // statistic count
  const [comments, setComments] = useState(0);
  const [likes, setLikes] = useState(0);
  const [blogs, setBlogs] = useState(0);

  const handleUpdate = async () => {
    const payload = new FormData();
    payload.append("Id", user.id as unknown as string);
    payload.append("Username", user.username as string);
    payload.append("Password", password);
    payload.append("Name", name);
    payload.append("Picture", picture);

    try {
      const data = await axios("https://localhost:7056/Auth/Update", {
        method: "PUT",
        data: payload,
      });

      if (!data.data.result) throw new Error(data.data?.message);
      dispatch(setUser(data.data.result as User));
      alert("Sucess.");
    } catch (e) {
      alert(e);
    }
  };

  const refetch = async () => {
    try {
      const res = (await fetchUser2(user.id)).response;
      setUser(res.user);
      setComments(res.comments);
      setLikes(res.likes);
      setBlogs(res.blogs);
    } catch (e) {
      alert(e);
    }
  };

  useMemo(async () => {
    await refetch();
  }, []);

  return (
    <Container sx={{ py: 6 }}>
      <Typography
        gutterBottom
        variant="h3"
        sx={{ textAlign: "start" }}
        component="div"
      >
        โปรไฟล์
      </Typography>
      <div className="flex flex-row">
        <Card sx={{ borderRadius: 0, maxWidth: "50%" }}>
          <CardMedia
            component="img"
            image={
              user.picture ||
              "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
            }
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {user.name}
            </Typography>
            <Typography variant="body2" color="text.secondary"></Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: "center" }}>
            <div className="flex md:flex-row flex-col flex-wrap justify-around">
              <ListItem sx={{ width: "40%" }}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "rgb(234 88 12 )" }}>
                    <ArchiveIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="กระทู้" secondary={blogs} />
              </ListItem>
              <ListItem sx={{ width: "40%" }}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "#d32f2f" }}>
                    <FavoriteIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="ไลค์" secondary={likes} />
              </ListItem>
              <ListItem sx={{ width: "40%" }}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "#9333ea" }}>
                    <AccountBoxIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="ประเภท"
                  secondary={user.role ? "แอดมิน" : "สมาชิก"}
                />
              </ListItem>
              <ListItem sx={{ width: "40%" }}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "rgb(37 99 235)" }}>
                    <ChatBubbleIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="คอมเม้นต์" secondary={comments} />
              </ListItem>
            </div>
          </CardActions>
        </Card>
        <Paper sx={{ flexGrow: 1 }}>
          <Card sx={{ width: "100%", height: "100%", borderRadius: 0 }}>
            <CardContent sx={{ height: "100%" }}>
              <div className="flex flex-col text-left h-full">
                <Typography
                  gutterBottom
                  variant="h6"
                  sx={{ textAlign: "start" }}
                  component="div"
                >
                  ตั้งค่า
                </Typography>

                <Divider flexItem sx={{ mb: 4 }} />

                <TextField
                  id="filled-basic"
                  label="Your name."
                  color="warning"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <div className="my-4"></div>

                <TextField
                  id="filled-basic"
                  label="Password"
                  color="warning"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="my-4"></div>

                <TextField
                  id="filled-basic"
                  label="Picture"
                  color="warning"
                  placeholder="url"
                  value={picture}
                  onChange={(e) => setPicture(e.target.value)}
                />
                <div className="my-4"></div>
                <Avatar
                  alt="Remy Sharp"
                  src={picture}
                  sx={{ width: 144, height: 144 }}
                  className="mx-auto"
                />

                <div className="my-4 flex-grow"></div>
                <Button
                  variant="contained"
                  color="warning"
                  size="large"
                  onClick={handleUpdate}
                >
                  <p className="text-xl">Update</p>
                </Button>
              </div>
            </CardContent>
          </Card>
        </Paper>
      </div>
    </Container>
  );
}
