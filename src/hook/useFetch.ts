import { useState, useEffect } from "react";

// Solo para Users.tsx

export const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok)
          throw new Error(
            `Error ${response.status}: La API no respondió correctamente`
          );
        const result: T = await response.json();
        setData(Array.isArray(result) ? result : [result]);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Ha ocurrido un error inesperado");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);
  /* 
  // Función para agregar usuario
  const addUser = async (newUser: T) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      if (!response.ok) throw new Error("Error al agregar usuario");

      const addedUser: T = await response.json();
      setData([...data, addedUser]); // Actualiza el estado local
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    }
  };
 */
  return { data, loading, error };
};
