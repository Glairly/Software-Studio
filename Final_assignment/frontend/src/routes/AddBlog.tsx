import {
  Container,
  Grid,
  Paper,
  Button,
  Typography,
  TextField,
  Chip,
  Divider,
  Box,
  InputAdornment,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectUser } from "../features/auth/authSlice";
import { postBlogs } from "../features/blog/blogSlice";
import TitleIcon from "@mui/icons-material/Title";
import PanoramaIcon from "@mui/icons-material/Panorama";

export default function AddBlog() {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const [value, setValue] = useState("");
  const [tag, setTag] = useState("");
  const [title, setTitle] = useState("");
  const [picture, setPicture] = useState("");
  const [tags, setTags] = useState([] as Array<string>);

  // quil settinjgs
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction

      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const handleAddTag = (e: any) => {
    if (!tag || tags.includes(tag)) return;
    const _n = [...tags];
    _n.push(tag);
    setTag("");
    (document.querySelector("#tag-input") as HTMLInputElement).value = "";
    setTags(_n);
  };

  const handleClear = () => {
    setValue("");
    setTag("");
    setPicture("");
    setTags([]);
  };

  const handleDelete = (e: string) => {
    setTags([...tags].filter((el) => el !== e));
  };

  const payload = useMemo(() => {
    return {
      Title: title,
      Owner: user.id,
      Tags: tags.join(","),
      Content: value,
      Picture: picture,
    };
  }, [title, value, tags, picture, user.id]);

  const handlePost = () => {
    const _payload = new FormData();

    for (let [key, value] of Object.entries(payload)) {
      // console.log(key, value);
      _payload.append(key, value as string);
    }

    // console.log(_payload);
    dispatch(postBlogs(_payload))
      .then((res) => {
        if (!res.payload) throw new Error();
        alert("Success.");
      })
      .catch((e) => alert("Failed."));
  };

  return (
    <>
      <Container sx={{ p: 4 }}>
        <Grid container direction="column" spacing={4}>
          <Grid
            item
            container
            justifyContent="space-between"
            alignItems="center"
            direction="row"
          >
            <Grid item>
              <Typography variant="h4">เขียนกระทู้</Typography>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                sx={{ borderRadius: "9999px" }}
                size="large"
                color="warning"
                onClick={handleClear}
              >
                เคลียร์
              </Button>
            </Grid>
          </Grid>
          <Grid item sx={{ pt: "0.5rem !important" }}>
            <Divider />
          </Grid>
          <Grid item>
            <TextField
              label="หัวข้อ"
              sx={{ width: "100%" }}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <TitleIcon />
                  </InputAdornment>
                ),
              }}
            ></TextField>
          </Grid>
          <Grid
            item
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <img
                src={picture}
                className="border rounded"
                style={{ minWidth: 640, minHeight: 240 }}
              ></img>
            </Grid>
            <Grid item>
              <TextField
                label="เพิ่มรูปปก"
                onChange={(e) => {
                  setPicture(e.target.value);
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PanoramaIcon />
                    </InputAdornment>
                  ),
                }}
              ></TextField>
            </Grid>
          </Grid>
          <Grid item>
            <ReactQuill
              theme="snow"
              value={value}
              onChange={setValue}
              modules={modules}
            />
          </Grid>
          <Grid
            item
            container
            direction="column"
            justifyContent="start"
            sx={{ textAlign: "start" }}
            spacing={3}
          >
            <Grid item>
              <Typography variant="h6">แท็ก</Typography>
            </Grid>
            <Grid item sx={{ pt: "0px !important" }}>
              <Divider />
            </Grid>
            <Grid item>
              {tags.map((el) => (
                <Chip
                  sx={{ mx: 1 }}
                  label={el}
                  key={el}
                  size="medium"
                  color="info"
                  onDelete={() => handleDelete(el)}
                />
              ))}
            </Grid>
            <Grid
              item
              container
              alignItems="center"
              direction="row"
              spacing={2}
            >
              <Grid item>
                <TextField
                  label="เพิ่มแท็ก"
                  id="tag-input"
                  onChange={(e) => {
                    setTag(e.target.value);
                  }}
                ></TextField>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  sx={{ borderRadius: "9999px" }}
                  size="large"
                  color="success"
                  onClick={handleAddTag}
                >
                  เพิ่ม
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Divider />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              sx={{ borderRadius: "9999px", px: 10 }}
              size="large"
              color="success"
              onClick={handlePost}
            >
              <Typography variant="h5">โพส</Typography>
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
