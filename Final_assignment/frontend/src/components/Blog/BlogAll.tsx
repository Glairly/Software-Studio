import { Divider, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

import BlogCard from "./BlogCard";
import {
  Blog,
} from "../../features/blog/blogSlice";

interface BlogProps {
  blogs: Blog[];
  refetchCallback?: Function;
}

export default function BlogAll(props: BlogProps) {
  const { blogs } = props;

  const refreshBlog = async () => {
    if (props.refetchCallback) props.refetchCallback();
  };

  return (
    <div className="mt-10">
      <Typography variant="h5" sx={{ textAlign: "start" }}>
        {/* หมวดหมู่ */}
        กระทู้ทั้งหมด
      </Typography>
      <Divider sx={{ mb: 4 }} />
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
            justifyContent="center"
            alignItems="stretch"
            spacing={2}
          >
            {blogs.map((el) => (
              <BlogCard
                post={el}
                key={el.blog.id}
                showAction={true}
                callback={refreshBlog}
              />
            ))}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
