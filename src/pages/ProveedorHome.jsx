import { useAuth } from "../context/AuthContext";

const ProveedorHome = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Bienvenido, {user?.username} (Proveedor)</h1>
      <button onClick={logout}>Cerrar Sesión</button>
    </div>
  );
};

export default ProveedorHome;
