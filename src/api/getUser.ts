import axios from "axios";

export async function getUser(id: number) {
  return axios
    .get(`https://reqres.in/api/users?page=${id}`)
    .then((res) => res.data);
}
