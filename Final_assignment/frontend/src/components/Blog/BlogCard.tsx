import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import {
  IconButton,
  Fab,
  MenuItem,
  Menu,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { Blog } from "../../features/blog/blogSlice";
import { Link } from "react-router-dom";
import { hideBlog, removeBlog } from "../../features/blog/blogAPI";

interface FeaturedPostProps {
  post: Blog;
  vertical?: boolean;
  showAction?: boolean;
  callback?: Function;
}

export default function BlogCard(props: FeaturedPostProps) {
  const { post, vertical } = props;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteBlog = async () => {
    try {
      await removeBlog(post.blog.id);
      alert("Success.");
      if (props.callback) props.callback();
    } catch (e) {}

    handleClose();
  };

  const handleHideBlog = async () => {
    try {
      var status = !post.blog.hidden;
      await hideBlog(post.blog.id, status);
      alert("Success.");
      if (props.callback) props.callback();
    } catch (e) {}

    handleClose();
  };

  return (
    <Grid item xs={12} md={6}>
      {/* <CardActionArea
        component="a"
        href={`/viewblog?id=${post.blog.id as unknown as string}`}
      > */}
      <Card
        sx={{
          display: "flex",
          flexDirection: vertical ? "column" : "row",
          position: "relative",
          flexGrow: 1,
          maxHeight: vertical ? 480 + 280 : 260,
        }}
        elevation={0}
      >
        <CardMedia
          component="img"
          sx={{
            width: !vertical ? 200 : "auto",
            height: vertical ? 400 : 260,
            display: { xs: "none", sm: "block" },
          }}
          image={
            post.blog.picture ||
            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
          }
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
          {/* title */}
          <Typography component="h2" variant="h5" sx={{ fontWeight: "bold" }}>
            {post.blog.title}
          </Typography>
          {/* tags */}
          <Typography component="h2" variant="subtitle2" color="gray">
            {post?.blog?.tags?.split(",").slice(0, 2).join(" ??? ")}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ maxHeight: "100px", overflow: "hidden", mt: 2 }}
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
            <Grid container justifyContent="start" alignItems="end">
              {/* Icons */}
              {!post.blog.hidden ? (
                <>
                  <Grid
                    item
                    direction="row"
                    justifyContent="end"
                    alignItems="center"
                    sx={{ display: "flex" }}
                  >
                    <Grid item>
                      <Fab
                        disableFocusRipple
                        disableTouchRipple
                        disableRipple
                        disabled
                        size="small"
                        sx={{ background: "white !important" }}
                      >
                        <FavoriteBorderOutlinedIcon color="error" />
                      </Fab>
                    </Grid>
                    <Grid item>
                      <Typography sx={{ mx: 1 }}>{post.likes || 0}</Typography>
                    </Grid>
                    <Grid item sx={{ ml: 2 }}>
                      <Fab
                        disableFocusRipple
                        disableTouchRipple
                        disableRipple
                        size="small"
                        disabled
                        sx={{ background: "white !important" }}
                      >
                        <ChatBubbleOutlineRoundedIcon color="info" />
                      </Fab>
                    </Grid>
                    <Grid item>
                      <Typography sx={{ mx: 1 }}>
                        {post.comments || 0}
                      </Typography>
                    </Grid>
                  </Grid>
                </>
              ) : (
                <Typography sx={{ color: "red", fontWeight: "bold" }}>
                  <VisibilityOffIcon fontSize="small" /> ???????????????????????????????????????
                </Typography>
              )}

              <Grid item justifySelf="start" flexGrow={1}></Grid>

              <Grid item justifySelf="start">
                <Link
                  className="text-orange-600"
                  to={`/viewblog?id=${post.blog.id as unknown as string}`}
                >
                  ????????????????????? {`>`}
                </Link>
              </Grid>
            </Grid>
          </Typography>
        </CardContent>
        {props.showAction ? (
          <IconButton
            size="small"
            sx={{
              position: "absolute",
              top: "0.5rem",
              right: "0.5rem",
              bgcolor: "white",
              color: "black",
              boxShadow: "0",
            }}
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
        ) : (
          ""
        )}

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleDeleteBlog}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>??????</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleHideBlog}>
            {post.blog.hidden ? (
              <>
                <ListItemIcon>
                  <VisibilityIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>????????????</ListItemText>
              </>
            ) : (
              <>
                <ListItemIcon>
                  <VisibilityOffIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>????????????</ListItemText>
              </>
            )}
          </MenuItem>
        </Menu>
      </Card>
      {/* </CardActionArea> */}
    </Grid>
  );
}
