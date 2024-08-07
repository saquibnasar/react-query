import { useQuery } from "@tanstack/react-query";
import { getPost } from "./api/getPosts";
import { getUser } from "./api/getUser";

export default function Post({ id }: { id: number }) {
  const postQuery = useQuery({
    queryKey: ["posts", id],
    queryFn: () => getPost(id),
  });

  const userQuery = useQuery({
    queryKey: ["users", postQuery?.data?.id],
    enabled: postQuery?.data?.id != null,
    queryFn: () => getUser(postQuery.data.id),
  });

  if (postQuery.isLoading) return <h1>Loading...</h1>;
  if (postQuery.status === "error") {
    return <h1>{JSON.stringify(postQuery.error)}</h1>;
  }

  return (
    <>
      <h1>
        {postQuery.data.first_name} <br />
        <small>
          {userQuery.isLoading
            ? "Loading User..."
            : userQuery.isError
            ? "Error Loading User"
            : userQuery.data.name}
        </small>
      </h1>
      <p>{postQuery.data.email}</p>
    </>
  );
}
