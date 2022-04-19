import React, { useEffect, useState, useMemo } from "react";

import { Typography, Divider, Grid } from "@mui/material";
import BlogCard from "../../components/Blog/BlogCard";
import Catagory from "../../components/Blog/Catagory";
import { useAppSelector } from "../../app/hooks";
import { Blog, selectBlog } from "./blogSlice";
import BlogAll from "../../components/Blog/BlogAll";

interface BlogProps {
  blogs: Blog[];
  showAll?: Boolean;
  hideFeatured?: Boolean;
  refreshCallBack?: Function;
}

export default function BlogList(props: BlogProps) {
  const featured = useMemo(() => {
    try {
      return [...props.blogs]
        .sort((a, b) => {
          const _a = a.comments + a.likes;
          const _b = b.comments + b.likes;
          if (_a === _b) return 0;
          return _a > _b ? -1 : 1;
        })
        .slice(0, 2);
    } catch (e) {
      console.log(e);
      return [];
    }
  }, [props.blogs]);

  return (
    <>
      <div className="text-left">
        {!props.hideFeatured ? (
          <>
            {" "}
            <Typography variant="h4" sx={{ mt: 4 }}>
              กระทู้ยอดนิยม
            </Typography>
            <Divider sx={{ mb: 4 }} />
            <Grid container spacing={4}>
              {featured.map((el) => (
                <BlogCard post={el} key={el.blog.id} />
              ))}
            </Grid>{" "}
          </>
        ) : (
          ""
        )}
      </div>
      <div>
        {props.showAll ? (
          <BlogAll
            blogs={props.blogs}
            refetchCallback={props.refreshCallBack}
          />
        ) : (
          <Catagory blogs={props.blogs} />
        )}
      </div>
    </>
  );
}
