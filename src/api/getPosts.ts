import axios from "axios";
import { DataTYpe } from "../types/types";

export async function getPosts() {
  return axios
    .get("https://reqres.in/api/users", { params: { _sort: "title" } })
    .then((res) => res.data.data);
}

export function getPostsPaginated(page: number) {
  return axios
    .get("https://reqres.in/api/unknown/1", {
      params: { _page: page, _sort: "title", _limit: 2 },
    })
    .then((res) => {
      console.log(res);
      const hasNext = page * 2 <= parseInt(res.headers["x-total-count"]);

      console.log(hasNext);
      return {
        nextPage: hasNext ? page + 1 : undefined,
        previousPage: page > 1 ? page - 1 : undefined,
        posts: res.data,
      };
    });
}

export async function getPost(id: number) {
  return axios
    .get(`https://reqres.in/api/users/${id}`)
    .then((res) => res.data.data);
}

export function createPost({ title, body }: DataTYpe) {
  return axios
    .post("https://reqres.in/api/users", {
      title,
      body,
      userId: 1,
      id: Date.now(),
    })
    .then((res) => res.data);
}
