import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Fab } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";

import { Blog } from "../../features/blog/blogSlice";

interface FeaturedPostProps {
  post: Blog;
  vertical?: boolean;
}

export default function BlogCard(props: FeaturedPostProps) {
  const { post, vertical } = props;

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea
        component="a"
        href={`/viewblog?id=${post.blog.id as unknown as string}`}
      >
        <Card
          sx={{ display: "flex", flexDirection: vertical ? "column" : "row" }}
        >
          <CardMedia
            component="img"
            sx={{
              width: !vertical ? 200 : "auto",
              height: vertical ? 480 : 260,
              display: { xs: "none", sm: "block" },
            }}
            image={post.blog.picture}
          />
          <CardContent
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              textAlign: "start",
              paddingBottom: "0.5rem !important",
            }}
          >
            <Typography component="h2" variant="h5">
              {post.blog.title}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ maxHeight: "100px" }}
              paragraph
            >
              <span
                dangerouslySetInnerHTML={{
                  __html: post.blog.content.slice(0, 200) + "...",
                }}
              ></span>
            </Typography>
            <div className="flex-grow"></div>
            <Typography
              variant="subtitle1"
              sx={{ textAlign: "center" }}
              color="warning"
            >
              <Grid container justifyContent="end" alignItems="end" spacing={2}>
                <Grid item justifyContent="center" alignItems="center">
                  <Fab
                    size="small"
                    disableRipple
                    disableFocusRipple
                    sx={{ background: "white !important" }}
                  >
                    <FavoriteBorderOutlinedIcon color="error" />
                  </Fab>
                  <Typography sx={{ mt: 1 }}>{post.likes || 0}</Typography>
                </Grid>
                <Grid item>
                  <Fab size="small" sx={{ background: "white !important" }}>
                    <ChatBubbleOutlineRoundedIcon color="info" />
                  </Fab>
                  <Typography sx={{ mt: 1 }}>{post.comments || 0}</Typography>
                </Grid>
              </Grid>
            </Typography>
          </CardContent>
        </Card>
      </CardActionArea>
    </Grid>
  );
}
