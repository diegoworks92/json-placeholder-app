import { NavLink, useLoaderData } from "react-router-dom";

export type PostType = {
  title: string;
  body: string;
  id: number;
};

const PostList = () => {
  const posts = useLoaderData() as PostType[]; // Recibe datos precargados
  /*   const {
    data: posts,
    loading,
    error,
  } = useFetch<PostType[]>("https://jsonplaceholder.typicode.com/posts"); */
  return (
    <>
      <h2>Lista de Publicaciones</h2>
      <ul>
        {posts.map((post: PostType) => (
          <li key={post.id}>
            <NavLink to={`/posts/${post.id}`}>{post.title}</NavLink>
          </li>
        ))}
      </ul>
    </>

    /*     <div>
      <h2>PostList</h2>
      {loading && <p>Cargando datos...</p>}
      {Array.isArray(posts)
        ? posts.map((post) => <li key={post.id}>{post.title}</li>)
        : error && <p>{error}</p>}
    </div> */
  );
};

export default PostList;
