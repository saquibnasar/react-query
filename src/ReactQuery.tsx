import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import "./App.css";
type Post = {
  id: string;
  title: string;
};
// type NewPostMutation = {
//   mutationFn: function (title:string)  {};
//   onSuccess: string;
// };
const POSTS: Post[] = [
  { id: "1", title: "post 1" },
  { id: "1", title: "post 2" },
];

export default function ReactQuery() {
  const queryClient = new QueryClient();

  // /posts -> ["posts"]
  // /posts/1 -> ["posts", post.id]
  // /posts?authorId=1 -> ["posts", { authorId: 1}]
  // /posts/2/comments -> ["posts", post.id, "comments"]

  const postQuery = useQuery({
    queryKey: ["posts"],
    queryFn: ({ queryKey }) =>
      wait(1000).then(() => {
        console.log(queryKey);
        return [...POSTS];
      }),
  });

  const newPostMutation = useMutation({
    mutationFn: async (title: string) => {
      return wait(1000).then(() =>
        POSTS.push({ id: crypto.randomUUID(), title })
      );
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  if (postQuery.isLoading) return <h1>Loadindg...</h1>;
  if (postQuery.isError) return <pre>{JSON.stringify(postQuery.error)}</pre>;

  return (
    <>
      {postQuery?.data?.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
      <button
        // disabled={newPostMutation}
        onClick={() => newPostMutation.mutate("new Post")}
      >
        Add new Item
      </button>
    </>
  );
}
function wait(duration: number): Promise<number> {
  return new Promise((resolve) => setTimeout(resolve, duration));
}
