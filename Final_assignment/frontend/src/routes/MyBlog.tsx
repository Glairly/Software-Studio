import { Button, Container, Grid, Typography } from "@mui/material";
import React, { useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectUser } from "../features/auth/authSlice";
import BlogList from "../features/blog/Blog";
import {
  fetchBlogs,
  fetchAnnoucements,
  selectMyBlog,
  fetchBlogByOwners,
} from "../features/blog/blogSlice";

export default function MyBlog() {
  const blogs = useAppSelector(selectMyBlog);
  const user = useAppSelector(selectUser);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBlogByOwners(user.id));
  }, []);

  const myBlogs = useMemo(() => {
    try {
      // return blogs.filter((el) => el.blog.owner === user.id);
      return blogs;
    } catch (e) {
      return [];
    }
  }, [blogs]);

  return (
    <Container sx={{ p: 4, textAlign: "left" }}>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        direction="row"
      >
        <Grid item>
          <Typography variant="h2">กระทู้ของคุณ</Typography>
        </Grid>
        <Grid item>
          <Link to="/addblog">
            <Button
              variant="contained"
              sx={{ borderRadius: "9999px" }}
              size="large"
              color="warning"
            >
              + เพิ่มกระทู้
            </Button>
          </Link>
        </Grid>
      </Grid>

      <BlogList
        showAll={true}
        blogs={myBlogs}
        refreshCallBack={() => dispatch(fetchBlogByOwners(user.id))}
      />
    </Container>
  );
}
