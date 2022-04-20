import {
  Avatar,
  Grid,
  Typography,
  Paper,
  Divider,
  TextField,
  TextareaAutosize,
  Button,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import { fetchUser } from "../../features/auth/authAPI";
import { User } from "../../features/auth/authSlice";
import { styled } from "@mui/material/styles";
import { postComment, removeComment } from "../../features/blog/blogAPI";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

interface CommentProps {
  comment: {
    id: number;
    blog: number;
    owner: number;
    content: string;
  };
  editable?: Boolean;
  removable?: Boolean;
  callback?: Function;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.primary,
}));

export default function Comment(props: CommentProps) {
  const { comment, editable, removable } = props;

  const [user, setUser] = useState({} as User);
  const [newComment, setNewComment] = useState("");

  useMemo(async () => {
    setUser((await fetchUser(comment.owner)).response);
  }, [comment]);

  const handlePostComment = async () => {
    try {
      if (
        newComment &&
        comment.owner !== undefined &&
        comment.blog !== undefined
      )
        await postComment(comment.owner, comment.blog, newComment);

      alert("Success.");
      setNewComment("");
      if (props.callback) props.callback();
    } catch (e) {}
  };

  const handleRemoveComment = async () => {
    try {
      if (comment.id !== undefined) await removeComment(comment.id);

      alert("Success.");
      if (props.callback) props.callback();
    } catch (e) {}
  };

  return (
    <>
      {user.id !== undefined ? (
        <Grid direction="row">
          <Grid item justifyContent="start" alignItems="center">
            <StyledPaper
              sx={{
                mb: 4,
                mx: "auto",
                p: 0,
              }}
            >
              <Grid container>
                <Grid>
                  <Grid
                    item
                    container
                    alignItems="center"
                    direction="row"
                    sx={{ textAlign: "left", p: 4 }}
                  >
                    <Grid item sx={{ mr: 4 }}>
                      <Avatar
                        alt="Remy Sharp"
                        src={user.picture}
                        sx={{ width: 56, height: 56 }}
                        className="mx-auto"
                      />
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="h6"
                        sx={{ mb: 0, maxWidth: !editable ? 100 : "auto" }}
                        paragraph
                      >
                        {!editable ? user.name : "เพิ่มคอมเมนต์"}
                      </Typography>
                      {!editable ? (
                        <Typography
                          variant="subtitle1"
                          sx={{ mb: 0 }}
                          paragraph
                        >
                          {user.role ? "Admin" : "Member"}
                        </Typography>
                      ) : (
                        ""
                      )}
                    </Grid>
                  </Grid>
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid
                  item
                  sx={{
                    p: "0 !important",
                    textAlign: "left",
                    fontSize: "1.1rem",
                    flexGrow: 1,
                  }}
                >
                  {editable ? (
                    <>
                      <div className="flex flex-row h-full">
                        <TextareaAutosize
                          aria-label="minimum height"
                          minRows={3}
                          placeholder="คอมเม้นต์"
                          style={{
                            height: "100%",
                            outline: "none",
                            borderRadius: "0.5rem",
                            padding: "1rem",
                            flexGrow: 1,
                            margin: "0 ",
                          }}
                          className="bg-gray-100"
                          onChange={(e) => setNewComment(e.target.value)}
                        />
                        <Button
                          variant="contained"
                          color="success"
                          style={{ borderRadius: "0px 4px 4px 0px" }}
                          onClick={handlePostComment}
                        >
                          โพส
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-row h-full">
                      <Typography
                        sx={{ p: "1rem", fontSize: "1.1rem", width: "100%" }}
                      >
                        {comment.content}
                      </Typography>
                      {removable ? (
                        <Button
                          variant="contained"
                          color="error"
                          style={{ borderRadius: "0px 4px 4px 0px" }}
                          onClick={handleRemoveComment}
                        >
                          <DeleteOutlineIcon />
                        </Button>
                      ) : (
                        ""
                      )}
                    </div>
                  )}
                </Grid>
              </Grid>
            </StyledPaper>
          </Grid>
        </Grid>
      ) : (
        ""
      )}
    </>
  );
}
