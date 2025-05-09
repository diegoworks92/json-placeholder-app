import { createBrowserRouter } from "react-router-dom";
import PostList from "../components/PostList";
import App from "../App";
import Users from "../components/Users";
import { postsLoader } from "../loaders/postsLoaders";
import { PostDetail } from "../components/PostDetail";
import { postLoader } from "../loaders/postLoader";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { path: "/", Component: PostList, loader: postsLoader },
      { path: "posts/:id", Component: PostDetail, loader: postLoader }, // Mantiene ruta de detalles
      { path: "/users", Component: Users },
    ],
  },
]);
