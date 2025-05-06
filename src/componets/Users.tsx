import type { User } from "../App";
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
};

const Users = () => {
  const { data: users } = useFetch<UsersProps[]>(
    "https://jsonplaceholder.typicode.com/users"
  );
  return (
    <>
      <h2>Users</h2>

      <ul>
        {Array.isArray(users) ? (
          users.map((item: User) => <li key={item.id}>{item.name}</li>)
        ) : (
          <p>No hay usuarios</p>
        )}
      </ul>
    </>
  );
};

export default Users;
