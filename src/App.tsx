import { NavLink, Outlet } from "react-router";
import "./App.css";

function App() {
  return (
    <>
      <h1>JSON Placeholder</h1>
      <nav>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Publicaciones
        </NavLink>
        <NavLink
          to="/users"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Ir a usuarios
        </NavLink>
      </nav>
      <Outlet />
    </>
  );
}

export default App;
