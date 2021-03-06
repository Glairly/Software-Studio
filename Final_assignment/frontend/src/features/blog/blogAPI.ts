// A mock function to mimic making an async request for data
import axios from "axios";

export function fetchBlog(includeHide?: any) {
  return new Promise<{ status: Boolean; response: any }>(
    async (resolve, reject) => {
      try {
        const res = await axios(
          "https://localhost:7056/Blog/list" +
            `?includeHide=${includeHide ? true : false}`,
          {
            method: "GET",
          }
        );

        resolve({ status: true, response: res.data.result });
      } catch (e) {
        reject({ status: false, response: "" });
      }
    }
  );
}

export function fetchAnnoucement() {
  return new Promise<{ status: Boolean; response: any }>(
    async (resolve, reject) => {
      try {
        const res = await axios("https://localhost:7056/Blog/ListAnnoucement", {
          method: "GET",
        });

        resolve({ status: true, response: res.data.result });
      } catch (e) {
        reject({ status: false, response: "" });
      }
    }
  );
}

export function postBlog(blog: FormData) {
  return new Promise<{ status: Boolean; response: any }>(
    async (resolve, reject) => {
      try {
        const res = await axios("https://localhost:7056/Blog/add", {
          method: "POST",
          data: blog,
        });

        resolve({ status: true, response: res.data.result });
      } catch (e) {
        reject({ status: false, response: "" });
      }
    }
  );
}

export function hideBlog(id: any, status: any) {
  return new Promise<{ status: Boolean; response: any }>(
    async (resolve, reject) => {
      var payload = new FormData();
      payload.append("Id", id);
      payload.append("Status", status);

      try {
        const res = await axios("https://localhost:7056/Blog/Hide", {
          method: "PUT",
          data: payload,
        });

        resolve({ status: true, response: res.data.result });
      } catch (e) {
        reject({ status: false, response: "" });
      }
    }
  );
}

export function removeBlog(id: any) {
  return new Promise<{ status: Boolean; response: any }>(
    async (resolve, reject) => {
      var payload = new FormData();
      payload.append("Id", id);

      try {
        const res = await axios("https://localhost:7056/Blog/Delete", {
          method: "DELETE",
          data: payload,
        });

        resolve({ status: true, response: res.data.result });
      } catch (e) {
        reject({ status: false, response: "" });
      }
    }
  );
}
export function fetchBlogByOwner(id: any) {
  return new Promise<{ status: Boolean; response: any }>(
    async (resolve, reject) => {
      try {
        const res = await axios(
          "https://localhost:7056/Blog/ListByOwner?id=0" + id,
          {
            method: "GET",
          }
        );
        resolve({ status: true, response: res.data.result });
      } catch (e) {
        reject({ status: false, response: "" });
      }
    }
  );
}

export function fetchBlogById(id: any) {
  return new Promise<{ status: Boolean; response: any }>(
    async (resolve, reject) => {
      try {
        const res = await axios(
          "https://localhost:7056/Blog/GetById?id=" + id,
          {
            method: "GET",
          }
        );
        resolve({ status: true, response: res.data.result });
      } catch (e) {
        reject({ status: false, response: "" });
      }
    }
  );
}

export function postLike(owner: any, blog: any) {
  return new Promise<{ status: Boolean; response: any }>(
    async (resolve, reject) => {
      try {
        var payload = new FormData();
        payload.append("Blog", blog);
        payload.append("Owner", owner);
        const res = await axios("https://localhost:7056/Like/Add", {
          method: "POST",
          data: payload,
        });

        if (!res.data.result) throw new Error(res.data.message);
        resolve({ status: true, response: res.data.result });
      } catch (e) {
        alert(e);
        reject({ status: false, response: "" });
      }
    }
  );
}

export function removeLike(owner: any, blog: any) {
  return new Promise<{ status: Boolean; response: any }>(
    async (resolve, reject) => {
      try {
        var payload = new FormData();
        payload.append("Blog", blog);
        payload.append("Owner", owner);
        const res = await axios("https://localhost:7056/Like/Delete", {
          method: "DELETE",
          data: payload,
        });

        if (!res.data.result) throw new Error(res.data.message);
        resolve({ status: true, response: res.data.result });
      } catch (e) {
        alert(e);
        reject({ status: false, response: "" });
      }
    }
  );
}

export function postComment(owner: any, blog: any, content: string) {
  return new Promise<{ status: Boolean; response: any }>(
    async (resolve, reject) => {
      try {
        var payload = new FormData();
        payload.append("Blog", blog);
        payload.append("Owner", owner);
        payload.append("Content", content);
        const res = await axios("https://localhost:7056/Comment/Add", {
          method: "POST",
          data: payload,
        });

        if (!res.data.result) throw new Error(res.data.message);
        resolve({ status: true, response: res.data.result });
      } catch (e) {
        alert(e);
        reject({ status: false, response: "" });
      }
    }
  );
}

export function removeComment(id: any) {
  return new Promise<{ status: Boolean; response: any }>(
    async (resolve, reject) => {
      try {
        var payload = new FormData();
        payload.append("Id", id);
        const res = await axios("https://localhost:7056/Comment/Delete", {
          method: "DELETE",
          data: payload,
        });

        if (!res.data.result) throw new Error(res.data.message);
        resolve({ status: true, response: res.data.result });
      } catch (e) {
        alert(e);
        reject({ status: false, response: "" });
      }
    }
  );
}
