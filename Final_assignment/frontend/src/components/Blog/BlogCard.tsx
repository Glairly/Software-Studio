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

interface FeaturedPostProps {
  post: {
    description: string;
    image: string;
    title: string;
    link?: string;
  };
  vertical?: boolean;
}

export default function BlogCard(props: FeaturedPostProps) {
  const { post, vertical } = props;

  return (
    <Grid item xs={12} md={6}  >
      <CardActionArea component="a" href="#">
        <Card
          sx={{ display: "flex", flexDirection: vertical ? "column" : "row" }}
        >
          <CardMedia
            component="img"
            sx={{
              width: !vertical ? 200 : "auto",
              height: vertical ? 480 : "auto",
              display: { xs: "none", sm: "block" },
            }}
            image={post.image}
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
              {post.title}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {post.description}
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
                  <Typography sx={{ mt: 1 }}>1k</Typography>
                </Grid>
                <Grid item>
                  <Fab size="small" sx={{ background: "white !important" }}>
                    <ChatBubbleOutlineRoundedIcon color="info" />
                  </Fab>
                  <Typography sx={{ mt: 1 }}>1k</Typography>
                </Grid>
              </Grid>
            </Typography>
          </CardContent>
        </Card>
      </CardActionArea>
    </Grid>
  );
}
