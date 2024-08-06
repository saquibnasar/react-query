import { useState } from "react";
import PostsList1 from "./PostsList1";
import PostsList2 from "./PostsList2";
import Post from "./post";
import { CreatePost } from "./CreatePost";
import { PostListPaginated } from "./PostListPaginated";
import { PostListInfinite } from "./PostListInfinite";

export default function App() {
  const [currentPage, setCurrentPage] = useState(<PostsList1 />);

  return (
    <div>
      <button onClick={() => setCurrentPage(<PostsList1 />)}>
        Posts List 1
      </button>
      <button onClick={() => setCurrentPage(<PostsList2 />)}>
        Posts List 2
      </button>
      <button onClick={() => setCurrentPage(<Post id={1} />)}>
        first post
      </button>
      <button
        onClick={() =>
          setCurrentPage(<CreatePost setCurrentPage={setCurrentPage} />)
        }
      >
        New Post
      </button>
      <button onClick={() => setCurrentPage(<PostListPaginated />)}>
        Post List Paginated
      </button>
      <button onClick={() => setCurrentPage(<PostListInfinite />)}>
        Post List Infinite
      </button>
      {currentPage}
    </div>
  );
}
