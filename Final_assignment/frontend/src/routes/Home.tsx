import React from "react";
import { useAppSelector } from "../app/hooks";
import { selectUser } from "../features/auth/authSlice";
import { Paper, Button, Container, Grid, Typography, Divider } from "@mui/material";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import Navbar from "../components/Navbar";
import BlogCard from "../components/Blog/BlogCard";
import Catagory from "../components/Blog/Catagory";

export default function Home() {
  const user = useAppSelector(selectUser);

  const carousels = [
    {
      img: "https://i.pinimg.com/564x/2d/8d/a8/2d8da8b23268c2b3db8faac68493ec78.jpg",
      label: "Event 1",
    },
    {
      img: "https://i.pinimg.com/736x/e0/96/ba/e096ba2b671f4d0914f77082c1415f19.jpg",
      label: "Event 2",
    },
    {
      img: "https://i.pinimg.com/564x/3e/7a/cc/3e7acc5e6087e0387842af21ba061472.jpg",
      label: "Event 3",
    },
  ];

  return (
    <>
      <Navbar isAuth={!!user.username} />
      <Container sx={{ p:4 }}>
        <Carousel showThumbs={false} autoPlay={true}>
          {carousels.map((el) => (
            <div
              className="bg-cover bg-center rounded-lg"
              key={el.label}
              style={{ backgroundImage: `url(${el.img})`, height: "360px" }}
            >
              <p className="legend">{el.label}</p>
            </div>
          ))}
        </Carousel>
        <div className="text-left">
          <Typography variant="h4" sx={{ mt: 4 }}>
            กระทู้ยอดนิยม
          </Typography>
          <Divider sx={{ mb:4 }} />
          <Grid container spacing={4}>
            <BlogCard
              post={{
                description: "ABC",
                image:
                  "https://i.pinimg.com/564x/3e/7a/cc/3e7acc5e6087e0387842af21ba061472.jpg",
                title: "Title",
                link: "",
              }}
            />
            <BlogCard
              post={{
                description: "ABC",
                image:
                  "https://i.pinimg.com/564x/3e/7a/cc/3e7acc5e6087e0387842af21ba061472.jpg",
                title: "Title",
                link: "",
              }}
            />
          </Grid>
        </div>
        <div>
          <Catagory />
        </div>
      </Container>
    </>
  );
}
