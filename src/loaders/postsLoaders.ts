export async function postsLoader() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!response.ok) {
    throw new Response("Error en la API", { status: 404 });
  }
  return response.json(); // React Router manejará los datos
}
