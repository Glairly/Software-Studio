import { Divider, Fab, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

import TempleBuddhistIcon from "@mui/icons-material/TempleBuddhist";
import ChurchIcon from "@mui/icons-material/Church";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import BrunchDiningIcon from "@mui/icons-material/BrunchDining";
import BlogCard from "./BlogCard";
import { useAppSelector } from "../../app/hooks";
import { Blog, selectBlog } from "../../features/blog/blogSlice";

interface BlogProps {
  blogs: Blog[];
}

export default function Catagory(props: BlogProps) {
  const { blogs } = props;

  const catalog = [
    {
      icon: <TempleBuddhistIcon color="warning" />,
    },
    {
      icon: <ChurchIcon color="info" />,
    },
    {
      icon: <CardGiftcardIcon color="secondary" />,
    },
    {
      icon: <DirectionsWalkIcon color="error" />,
    },
    {
      icon: <BrunchDiningIcon color="success" />,
    },
  ];

  return (
    <div className="mt-10">
      <Typography variant="h5" sx={{ textAlign: "start" }}>
        {/* หมวดหมู่ */}
        กระทู้ที่น่าสนใจ
      </Typography>
      <Divider sx={{ mb: 4 }} />
      <Box>
        {/* <Grid
          container
          columnSpacing={2}
          justifyContent="center"
          alignItems="center"
        >
          {catalog.map((el) => (
            <Grid item>
              <Fab sx={{ background: "white !important" }}>{el.icon}</Fab>
            </Grid>
          ))}
        </Grid> */}
        <Grid
          container
          columnSpacing={2}
          direction="row"
          justifyContent="center"
          alignItems="start"
        >
          {blogs.length ? <BlogCard post={blogs[0]} vertical={true} /> : ""}
          <Grid
            item
            container
            direction="column"
            justifyContent="center"
            alignItems="stretch"
            spacing={2}
            xs={6}
          >
            {blogs.slice(1, 1 + 3).map((el) => (
              <BlogCard post={el} key={el.blog.id} />
            ))}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
