import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getPostsPaginated } from "./api/getPosts";
import { ApiType } from "./PostsList2";

export function PostListPaginated() {
  const [page, setPage] = useState(1);

  const { isLoading, status, error, data, isPreviousData } = useQuery({
    queryKey: ["posts", { page }],
    keepPreviousData: true,
    queryFn: () => getPostsPaginated(page),
  });

  if (isLoading) return <h1>Loading...</h1>;
  if (status === "error") return <h1>{JSON.stringify(error)}</h1>;

  return (
    <>
      <h1>
        Post List Paginated
        <br />
        <small>{isPreviousData && "Previous Data"}</small>
      </h1>
      {data?.posts?.map((post: ApiType) => (
        <div key={post.id}>{post.first_name}</div>
      ))}
      {data.previousPage && (
        <button onClick={() => setPage(data.previousPage)}>Previous</button>
      )}{" "}
      {data.nextPage && (
        <button onClick={() => setPage(data.nextPage)}>Next</button>
      )}
    </>
  );
}
