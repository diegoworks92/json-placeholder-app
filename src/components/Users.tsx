import React, { useEffect, useState } from "react";
import { useFetch } from "../hook/useFetch";

type UsersProps = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  isEditingUser: boolean;
};

const Users = () => {
  const { data } = useFetch<UsersProps[]>(
    "https://jsonplaceholder.typicode.com/users"
  );

  const [users, setUsers] = useState<UsersProps[]>([]);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [name, setName] = useState<string>("");

  useEffect(() => {
    if (data) {
      setUsers(data.map((user) => ({ ...user, isEditingUser: false })));
    }
  }, [data]);

  const handleDelete = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleAddUser = () => {
    const newUser: UsersProps = {
      id: Date.now(), // ID único para evitar duplicados
      name: name,
      username: "nuevo_usuario",
      email: `${name}@correo.com`,
      phone: "123-456",
      website: "nuevo.com",
      company: { name: "Nueva Empresa", catchPhrase: "", bs: "" },
      address: {
        street: "",
        suite: "",
        city: "",
        zipcode: "",
        geo: { lat: "", lng: "" },
      },
      isEditingUser: false, // Se inicializa como falso
    };

    setUsers([...users, newUser]); // Actualiza la lista en el estado local
  };

  const handleClick = (id: number) => {
    // Si hay otro usuario en edición, no permitir modificar otro
    if (editingUserId !== null && editingUserId !== id) return;

    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, isEditingUser: !user.isEditingUser } : user
      )
    );

    // Si estamos entrando en edición, almacenar el id
    setEditingUserId(editingUserId === id ? null : id);

    /*     const updatedUsers = users.map((user) =>
      user.id === id
        ? {
            ...user,
            name: user.name,
            isEditingUser: !user.isEditingUser,
          }
        : user
    );
    setUsers(updatedUsers); */
  };

  const handleChange = (
    id: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value.slice(0, 28);

    setUsers(
      users.map((user) => (user.id === id ? { ...user, name: value } : user))
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <h2>Users</h2>

      <ul>
        {users.length > 0 ? (
          users.map((item: UsersProps) => {
            return (
              <div key={item.id} id="user">
                {item.isEditingUser ? (
                  <input
                    placeholder="Modificar"
                    type="text"
                    value={item.name} // Mostramos el nombre actual del usuario
                    maxLength={28} // Limitar a 28 caracteres
                    onChange={(event) => handleChange(item.id, event)} // Guardamos el nuevo valor
                  ></input>
                ) : (
                  <li>{item.name}</li>
                )}
                <div id="user__buttons">
                  <button onClick={() => handleDelete(item.id)} type="button">
                    Eliminar
                  </button>
                  <button
                    onClick={() => handleClick(item.id)}
                    type="submit"
                    disabled={
                      editingUserId !== null && editingUserId !== item.id
                    }
                  >
                    {item.isEditingUser ? "Guardar" : "Modificar"}
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p>No hay usuarios</p>
        )}
      </ul>

      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          /*   value={} */
          onChange={(e) => setName(e.target.value)}
        />

        <button type="submit" onClick={handleAddUser}>
          Añadir usuario
        </button>
      </form>
    </>
  );
};

export default Users;
