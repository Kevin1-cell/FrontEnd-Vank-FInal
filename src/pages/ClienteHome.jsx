import { useAuth } from "../context/AuthContext";
import "../styles/ClienteHome.css";

const ClienteHome = () => {
  const { user, logout } = useAuth();

  return (
    <div className="container">
      {/* Header fijo */}
      <header className="header">
        <h1 className="logo">COLAB</h1>
        <div className="search-bar">
          <input type="text" placeholder="Buscar producto..." />
        </div>
        <div className="user-info">
          <span>Hola, {user?.username}</span>
          <img
            src="/ruta-a-imagen-de-perfil"
            alt="Perfil"
            className="profile-pic"
          />
          <button onClick={logout} className="logout-btn">
            Cerrar Sesión
          </button>
        </div>
      </header>

      {/* Contenido principal con scroll */}
      <main className="main-content">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="product-card">
            <img
              src="https://www.notebookcheck.net/fileadmin/Notebooks/News/_nc4/Xbox-Wireless-Controller-Sky-Cipher.jpg"
              alt="Producto"
              className="product-img"
            />
            <h3>X-box</h3>
            <p>$1'000,000</p>
            <button className="buy-btn">Comprar</button>
          </div>
        ))}
      </main>

      {/* Footer fijo */}
      <footer className="footer">
        <p>@COLAB2025</p>
      </footer>
    </div>
  );
};

export default ClienteHome;
