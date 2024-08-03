import axios from "axios";

export async function getPosts() {
  return axios
    .get("https://reqres.in/api/users", {
      params: { _sort: "title" },
    })
    .then((res) => {
      return res.data.data;
    });
}
