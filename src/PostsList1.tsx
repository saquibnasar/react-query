import { useQuery } from "@tanstack/react-query";
import { getPosts } from "./api/getPosts";
import { ApiType } from "./PostsList2";

export default function PostsList1() {
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    placeholderData: [{ id: 1, title: "Initial Data" }],
  });

  if (postsQuery.isLoading) {
    return <h1>Loading...</h1>;
  }
  if (postsQuery.status === "error") {
    return <h3>{JSON.stringify(postsQuery.error)}</h3>;
  }

  return (
    <div>
      <h1>Posts List 1</h1>
      fdfsfsda
      <ol>
        {postsQuery?.data?.map((post: ApiType) => {
          return <li key={post.id}>{post.first_name}</li>;
        })}
      </ol>
    </div>
  );
}
