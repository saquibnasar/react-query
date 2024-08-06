import { useQuery } from "@tanstack/react-query";
import { getPosts } from "./api/getPosts";

export type ApiType = {
  id: number;
  first_name: string;
};

export default function PostsList2() {
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  if (postsQuery.isLoading) return <h1>Loading...</h1>;
  if (postsQuery.status === "error")
    <h1>{JSON.stringify(postsQuery.error)}</h1>;

  return (
    <div>
      <h1>Post List 2</h1>
      <ol>
        {postsQuery.data.map((post: ApiType) => (
          <li key={post.id}>{post.first_name}</li>
        ))}
      </ol>
    </div>
  );
}
