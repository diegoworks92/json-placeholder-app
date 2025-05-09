import { type LoaderFunctionArgs } from "react-router-dom";

export async function postLoader({ params }: LoaderFunctionArgs) {
  const { id } = params; // React Router maneja params correctamente
  if (!id) throw new Response("ID no proporcionado", { status: 400 });

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  if (!response.ok) {
    throw new Response(`Error ${response.status}: No se pudo obtener el post`, {
      status: response.status,
    });
  }
  return response.json(); // Retorna un solo post
}
