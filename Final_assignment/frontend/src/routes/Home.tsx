import React, { Key, useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectUser } from "../features/auth/authSlice";
import {
  Paper,
  Button,
  Container,
  Grid,
  Typography,
  Divider,
  Box,
} from "@mui/material";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import Navbar from "../components/Navbar";
import BlogCard from "../components/Blog/BlogCard";
import Catagory from "../components/Blog/Catagory";
import {
  fetchBlogs,
  fetchAnnoucements,
  selectBlog,
  selectAnnoucement,
} from "../features/blog/blogSlice";

export default function Home() {
  const user = useAppSelector(selectUser);
  const blogs = useAppSelector(selectBlog);
  const annoucement = useAppSelector(selectAnnoucement);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBlogs());
    dispatch(fetchAnnoucements());
  }, []);

  const featured = useMemo(() => {
    try {
      return [...blogs]
        .sort((a, b) => {
          const _a = a.comment + a.likes;
          const _b = b.comment + b.likes;
          return _a > _b ? 1 : -1;
        })
        .slice(0, 2);
    } catch (e) {
      console.log(e);
      return [];
    }
  }, [blogs]);

  // const carousels = [
  //   {
  //     img: "https://i.pinimg.com/564x/2d/8d/a8/2d8da8b23268c2b3db8faac68493ec78.jpg",
  //     label: "Event 1",
  //   },
  //   {
  //     img: "https://i.pinimg.com/736x/e0/96/ba/e096ba2b671f4d0914f77082c1415f19.jpg",
  //     label: "Event 2",
  //   },
  //   {
  //     img: "https://i.pinimg.com/564x/3e/7a/cc/3e7acc5e6087e0387842af21ba061472.jpg",
  //     label: "Event 3",
  //   },
  // ];

  return (
    <>
      {/* {JSON.stringify(featured)} */}
      <Navbar isAuth={!!user.username} />
      <Container sx={{ p: 4 }}>
        <Carousel showThumbs={false} autoPlay={true} infiniteLoop>
          {annoucement.map((el) => (
            <Paper
              sx={{
                position: "relative",
                backgroundColor: "grey.800",
                color: "#fff",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundImage: `url(${el.blog.picture})`,
                height: 340,
              }}
              key={el.blog.id}
            >
              {/* Increase the priority of the hero background image */}
              {<img style={{ display: "none" }} src={el.blog.picture} />}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  right: 0,
                  left: 0,
                  backgroundColor: "rgba(0,0,0,.3)",
                  boxShadow:
                    "inset 220px 0px 75px rgba(0, 0, 0, 0.7) !important",
                }}
              />
              <Grid container sx={{ textAlign: "start" }}>
                <Grid item>
                  <Box
                    sx={{
                      position: "relative",
                      p: { xs: 3, md: 6 },
                      pr: { md: 0 },
                    }}
                  >
                    <Typography
                      component="h1"
                      variant="h3"
                      color="inherit"
                      gutterBottom
                    >
                      {el.blog.title}
                    </Typography>
                    <Typography variant="h5" color="inherit" paragraph>
                      {el.blog.content}
                    </Typography>

                    {/* <Link variant="subtitle1" href="#">
                       {post.linkText}
                     </Link> */}
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          ))}
        </Carousel>
        <div className="text-left">
          <Typography variant="h4" sx={{ mt: 4 }}>
            กระทู้ยอดนิยม
          </Typography>
          <Divider sx={{ mb: 4 }} />
          <Grid container spacing={4}>
            {featured.map((el) => (
              <BlogCard post={el} />
            ))}
          </Grid>
        </div>
        <div>
          <Catagory />
        </div>
      </Container>
    </>
  );
}
