import { Divider, Fab, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

import TempleBuddhistIcon from "@mui/icons-material/TempleBuddhist";
import ChurchIcon from "@mui/icons-material/Church";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import BrunchDiningIcon from "@mui/icons-material/BrunchDining";
import BlogCard from "./BlogCard";

export default function Catagory() {
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
        กระทู้ทั้งหมด
      </Typography>
      <Divider sx={{ mb:4 }} />
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
          <BlogCard
            post={{
              description: "ABC",
              image:
                "https://i.pinimg.com/564x/3e/7a/cc/3e7acc5e6087e0387842af21ba061472.jpg",
              title: "Title",
              link: "",
            }}
            vertical={true}
          />
          <Grid
            item
            container
            direction="column"
            justifyContent="center"
            alignItems="stretch"
            spacing={2}
            xs={6}
          >
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
        </Grid>
      </Box>
    </div>
  );
}
