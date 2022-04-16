import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { fetchAnnoucement, fetchBlog, postBlog } from "./blogAPI";

export interface Blog {
  blog: {
    id: number;
    owner: number;
    tags: string[];
    title: string;
    content: string;
    picture: string;
  };
  likes: any;
  comments: any;
}

export interface BlogState {
  value: Blog[];
  annoucement: Blog[];
}

const initialState: BlogState = {
  value: [],
  annoucement: [],
};

export const fetchBlogs = createAsyncThunk("blog/fetch", async () => {
  const res = await fetchBlog();
  if (res.status) return res.response;
  else return false;
});

export const fetchAnnoucements = createAsyncThunk(
  "blog/fetchAnnoucement",
  async () => {
    const res = await fetchAnnoucement();
    if (res.status) return res.response;
    else return false;
  }
);

export const postBlogs = createAsyncThunk(
  "blog/postBlog",
  async (blog: FormData) => {
    const res = await postBlog(blog);
    if (res.status) return res.response;
    else return false;
  }
);

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setBlog: (state, action: PayloadAction<Blog[]>) => {
      state.value = action.payload;
    },
    addBlog: (state, action: PayloadAction<Blog>) => {
      state.value.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBlogs.fulfilled, (state, action) => {
      if (action.payload) state.value = action.payload;
    });
    builder.addCase(fetchAnnoucements.fulfilled, (state, action) => {
      if (action.payload) state.annoucement = action.payload;
    });
  },
});

export const { setBlog, addBlog } = blogSlice.actions;

export const selectBlog = (state: RootState) => state.blog.value;
export const selectAnnoucement = (state: RootState) => state.blog.annoucement;

export default blogSlice.reducer;
