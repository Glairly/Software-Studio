import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import {
  Grid,
  Paper,
  Box,
  Typography,
  Container,
  Chip,
  Avatar,
  Fab,
  Divider,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { fetchUser } from "../features/auth/authAPI";
import { selectUser, User } from "../features/auth/authSlice";
import { Blog, selectBlog } from "../features/blog/blogSlice";
import { fetchBlogById, postLike, removeLike } from "../features/blog/blogAPI";
import Comment from "../components/Blog/Comment";

export default function ViewBlog() {
  const [blogUser, setBlogUser] = useState({} as User);
  const [blog, setBlog] = useState({} as Blog);
  const user = useAppSelector(selectUser);

  const location = useLocation();

  const { search } = location;

  const id = useMemo(() => {
    return new URLSearchParams(search).get("id");
  }, [search]);

  useMemo(async () => {
    const res = (await fetchBlogById(id)).response;
    setBlog(res);
  }, [id]);

  useMemo(async () => {
    if (blog?.blog) setBlogUser((await fetchUser(blog.blog.owner)).response);
    else return;
  }, [blog]);

  const isLiked = useMemo(() => {
    return blog?.likes?.find((el: any) => el.owner == user.id) as Boolean;
  }, [blog, user.id]);

  const handleLike = async () => {
    if (user.id !== 0)
      if (!isLiked) await postLike(user.id, blog.blog.id);
      else await removeLike(user.id, blog.blog.id);

    const res = (await fetchBlogById(id)).response;
    setBlog(res);
  };

  return (
    <>
      {blog?.blog?.id ? (
        <Container sx={{ p: 4 }}>
          <Grid direction="column" justifyContent="center" alignItems="start">
            <Grid item>
              <Paper
                sx={{
                  position: "relative",
                  backgroundColor: "grey.800",
                  color: "#fff",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundImage: `url(${blog.blog.picture})`,
                  height: 420,
                }}
                key={blog.blog.id}
              >
                {<img style={{ display: "none" }} src={blog.blog.picture} />}
                <Box
                  sx={{
                    position: "absolute",
                    height: 420,
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    backgroundColor: "rgba(0,0,0,.3)",
                    boxShadow:
                      "inset 220px 0px 75px rgba(0, 0, 0, 0.7) !important",
                  }}
                />
                <Grid container sx={{ textAlign: "start" }} flexGrow={1}>
                  <Grid
                    item
                    direction="column"
                    sx={{
                      height: 420,
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        p: { xs: 3, md: 6 },
                        pr: { md: 0 },
                        height: 420,
                      }}
                    >
                      <Typography
                        component="h1"
                        variant="h3"
                        color="inherit"
                        gutterBottom
                      >
                        {blog.blog.title}
                      </Typography>
                      {blog.blog.tags.split(",").map((el) => (
                        <Chip
                          sx={{ mx: 1 }}
                          label={el}
                          key={el}
                          size="medium"
                          color="info"
                        />
                      ))}
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            <Divider sx={{ my: 2 }} />

            {/* Blog content */}
            <Grid item sx={{ textAlign: "left", my: 4, minHeight: 320 }}>
              <span
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: blog.blog.content }}
              ></span>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h5" sx={{ mt: 5, mb: 1, textAlign: "start" }}>
              ผู้เขียนกระทู้
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {/* Author */}
            <Grid
              item
              container
              alignItems="center"
              direction="row"
              sx={{ textAlign: "left" }}
              spacing={4}
            >
              <Grid item>
                <Avatar
                  alt="Remy Sharp"
                  src={blogUser.picture}
                  sx={{ width: 56, height: 56 }}
                  className="mx-auto"
                />
              </Grid>
              <Grid item>
                <Typography variant="h5" sx={{ mb: 0 }} paragraph>
                  {blogUser.name}
                </Typography>
                <Typography variant="subtitle1" sx={{ mb: 0 }} paragraph>
                  {blogUser.role ? "Admin" : "Member"}
                </Typography>
              </Grid>
              <div className="flex-grow"></div>
              <Grid
                item
                direction="row"
                justifyContent="end"
                alignItems="center"
                sx={{ display: "flex", ml: 10 }}
              >
                <Grid item>
                  <Fab
                    size="small"
                    sx={{ background: "white !important" }}
                    onClick={handleLike}
                  >
                    {isLiked ? (
                      <FavoriteIcon color="error" />
                    ) : (
                      <FavoriteBorderOutlinedIcon color="error" />
                    )}
                  </Fab>
                </Grid>
                <Grid item>
                  <Typography sx={{ mt: 1, mx: 3 }}>
                    {blog.likes.length || 0}
                  </Typography>
                </Grid>
                <Grid item>
                  <Fab size="small" sx={{ background: "white !important" }}>
                    <ChatBubbleOutlineRoundedIcon color="info" />
                  </Fab>
                </Grid>
                <Grid item>
                  <Typography sx={{ mt: 1, mx: 3 }}>
                    {blog.comments.length || 0}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Grid sx={{ textAlign: "left" }}>
              <Typography variant="h5" sx={{ mt: 4, mb: 1 }}>
                คอมเม้นต์
              </Typography>
            </Grid>
            <Divider sx={{ mb: 6 }} />
            <Grid item direction="column">
              {blog.comments.map((el: any) => (
                <Comment
                  comment={el}
                  key={el.id}
                  removable={ user.role == 1 || (el.owner === user.id && user.id !== 0) }
                  callback={async () => {
                    const res = (await fetchBlogById(id)).response;
                    setBlog(res);
                  }}
                />
              ))}
              {user && user.id ? (
                <Comment
                  comment={{
                    id: -1,
                    blog: blog.blog.id,
                    owner: user.id,
                    content: "",
                  }}
                  editable={true}
                  callback={async () => {
                    const res = (await fetchBlogById(id)).response;
                    setBlog(res);
                  }}
                />
              ) : (
                ""
              )}
            </Grid>
          </Grid>
        </Container>
      ) : (
        ""
      )}
    </>
  );
}
