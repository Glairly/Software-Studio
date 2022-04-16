// A mock function to mimic making an async request for data
import axios from "axios";

export function fetchBlog() {
  return new Promise<{ status: Boolean; response: any }>(async (resolve, reject) => {
    try {
      const res = await axios("https://localhost:7056/Blog/list", {
        method: "GET",
      });

      resolve({ status: true, response: res.data.result });
    } catch (e) {
      reject({ status: true, response: "" });
    }
  });
}

export function fetchAnnoucement() {
    return new Promise<{ status: Boolean; response: any }>(async (resolve, reject) => {
      try {
        const res = await axios("https://localhost:7056/Blog/ListAnnoucement", {
          method: "GET",
        });
  
        resolve({ status: true, response: res.data.result });
      } catch (e) {
        reject({ status: true, response: "" });
      }
    });
  }
  