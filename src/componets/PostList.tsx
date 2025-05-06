import { useFetch } from "../hook/useFetch";

type PostType = {
  title: string;
  body: string;
  id: number;
};

const PostList = () => {
  const {
    data: posts,
    loading,
    error,
  } = useFetch<PostType[]>("https://jsonplaceholder.typicode.com/posts");
  return (
    <div>
      <h2>PostList</h2>
      {loading && <p>Cargando datos...</p>}
      {Array.isArray(posts)
        ? posts.map((post) => <li key={post.id}>{post.title}</li>)
        : error && <p>{error}</p>}
    </div>
  );
};

export default PostList;
