import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import {
  fetchAnnoucement,
  fetchBlog,
  postBlog,
  fetchBlogByOwner,
} from "./blogAPI";

export interface Blog {
  blog: {
    id: number;
    owner: number;
    tags: string;
    title: string;
    content: string;
    picture: string;
    hidden: Boolean;
  };
  likes: any;
  comments: any;
}

export interface BlogState {
  value: Blog[];
  annoucement: Blog[];
  myblogs: Blog[];
}

const initialState: BlogState = {
  value: [],
  annoucement: [],
  myblogs: [],
};

export const fetchBlogs = createAsyncThunk(
  "blog/fetch",
  async (includeHide: boolean = false) => {
    const res = await fetchBlog(includeHide);
    if (res.status) return res.response;
    else return false;
  }
);

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

export const fetchBlogByOwners = createAsyncThunk(
  "blog/postBlog",
  async (id: any) => {
    const res = await fetchBlogByOwner(id);
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
    builder.addCase(fetchBlogByOwners.fulfilled, (state, action) => {
      if (action.payload) state.myblogs = action.payload;
    });
  },
});

export const { setBlog, addBlog } = blogSlice.actions;

export const selectBlog = (state: RootState) => state.blog.value;
export const selectAnnoucement = (state: RootState) => state.blog.annoucement;
export const selectMyBlog = (state: RootState) => state.blog.myblogs;

export default blogSlice.reducer;
