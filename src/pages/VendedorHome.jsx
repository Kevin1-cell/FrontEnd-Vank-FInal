import { useAuth } from "../context/AuthContext";

const VendedorHome = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Bienvenido, {user?.username} (Vendedor)</h1>
      <button onClick={logout}>Cerrar Sesión</button>
    </div>
  );
};

export default VendedorHome;
