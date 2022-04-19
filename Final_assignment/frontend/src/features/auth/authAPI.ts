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

export function fetchUser2(id: any) {
  return new Promise<{ status: Boolean; response: any }>(
    async (resolve, reject) => {
      try {
        const res = await axios(
          "https://localhost:7056/Auth/GetbyId2?id=" + id,
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

export function fetchAllUser(IncludeDisabled?: boolean) {
  return new Promise<{ status: Boolean; response: any }>(
    async (resolve, reject) => {
      try {
        const res = await axios(
          "https://localhost:7056/Auth/list" +
            `?IncludeDisabled=${IncludeDisabled}`,
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

export function blockUser(id: any, status: any) {
  return new Promise<{ status: Boolean; response: any }>(
    async (resolve, reject) => {
      const payload = new FormData();
      payload.append("Id", id);
      payload.append("Status", status);

      try {
        const res = await axios("https://localhost:7056/Auth/Block", {
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
