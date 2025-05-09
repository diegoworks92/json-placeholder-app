import type { PostType } from "./PostList";
import { useLoaderData } from "react-router";
export const PostDetail = () => {
  const post = useLoaderData() as PostType; // Recibe datos precargados
  return (
    <>
      <h2> PostDetail</h2>
      <ul>
        {post ? (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ) : (
          <p>Post no encontrado</p>
        )}
      </ul>
    </>
  );
};
