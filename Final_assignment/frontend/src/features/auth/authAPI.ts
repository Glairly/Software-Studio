import axios from "axios";

export function fetchUser(id: any) {
  return new Promise<{ status: Boolean; response: any }>(
    async (resolve, reject) => {
      try {
        const res = await axios(
          "https://localhost:7056/Auth/GetbyId?id=" + id,
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
