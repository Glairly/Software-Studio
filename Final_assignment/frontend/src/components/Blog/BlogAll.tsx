import { Divider, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

import BlogCard from "./BlogCard";
import { Blog } from "../../features/blog/blogSlice";

interface BlogProps {
  blogs: Blog[];
  refetchCallback?: Function;
  hideHeader?: Boolean;
}

export default function BlogAll(props: BlogProps) {
  const { blogs } = props;

  const refreshBlog = async () => {
    if (props.refetchCallback) props.refetchCallback();
  };

  return (
    <div className="mt-12">
      {props.hideHeader ? (
        ""
      ) : (
        <>
          <Typography
            variant="h5"
            sx={{ textAlign: "start", fontWeight: "bold" }}
          >
            {/* หมวดหมู่ */}
            กระทู้ทั้งหมด
          </Typography>
          <Divider sx={{ mb: 4 }} />
        </>
      )}
      <Box>
        <Grid
          container
          columnSpacing={2}
          direction="row"
          justifyContent="center"
          alignItems="start"
        >
          <Grid
            item
            container
            direction="row"
            justifyContent="start"
            alignItems="stretch"
            spacing={2}
          >
            {blogs.map((el) =>
              el?.blog?.id ? (
                <BlogCard
                  post={el}
                  key={el.blog.id}
                  showAction={true}
                  callback={refreshBlog}
                />
              ) : (
                ""
              )
            )}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
