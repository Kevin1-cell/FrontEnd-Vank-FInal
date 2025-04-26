import { useAuth } from "../context/AuthContext";
import "../styles/ClienteHome.css";

const productosSugeridos = [
  { nombre: "PlayStation 5 Slime", precio: "$2'500,000", imagen: "https://blog.playstation.com/tachyon/2053/09/0b90303359833e289b25769cc2191171edc35004-scaled.jpg" },
  { nombre: "Teclado mecánico", precio: "$500,000", imagen: "https://th.bing.com/th/id/OIP.FgAlmdFQTAfcwT6LpqnFIAHaEK?rs=1&pid=ImgDetMain" },
  { nombre: "Mouse gamer inalámbrico", precio: "$350,000", imagen: "https://th.bing.com/th/id/R.b7baa34f17fbe92911ce4304b10316ea?rik=xRoIG%2fq51ZVzBQ&pid=ImgRaw&r=0" },
  { nombre: "Audífonos inalámbricos", precio: "$600,000", imagen: "https://th.bing.com/th/id/OIP.TcQB_NuA4iKORXFub1x1bwHaHa?rs=1&pid=ImgDetMain" }
];

const ClienteHome = () => {
  const { user, logout } = useAuth();

  return (
    <div className="container">
      {/* Header fijo */}
      <header className="header">
        <h1 className="logo">COLLAB</h1>
        <div className="search-bar">
          <input type="text" placeholder="Buscar producto..." />
          <button className="search-btn">Buscar</button>
        </div>
        <div className="user-info">
          <span>Hola, {user?.username}</span>
          <img
            src="https://th.bing.com/th/id/R.98f7ba11c0008416714360d79b38fcc3?rik=2Ejragac6mGlFQ&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fuser-png-icon-thin-line-user-icon-2232.png&ehk=xfJZe9qWw%2fORWGP1VnUnQPT3r09SLw4ihK%2fyNms%2b2OA%3d&risl=&pid=ImgRaw&r=0"
            alt="Perfil"
            className="profile-pic"
          />
          <button onClick={logout} className="logout-btn">Cerrar Sesión</button>
        </div>
      </header>

      {/* Board de productos sugeridos */}
      <section className="suggested-products">
        <h2>Productos recomendados</h2>
        <div className="suggested-grid">
          {productosSugeridos.map((producto, index) => (
            <div key={index} className="suggested-card">
              <img src={producto.imagen} alt={producto.nombre} className="suggested-img" />
              <h3>{producto.nombre}</h3>
              <p>{producto.precio}</p>
              <button className="buy-btn">Comprar</button>
            </div>
          ))}
        </div>
      </section>

      {/* Contenido principal con disposición en 2x2 */}
      <main className="main-content">
        <div className="product-grid">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="product-card">
              <img
                src="https://www.notebookcheck.net/fileadmin/Notebooks/News/_nc4/Xbox-Wireless-Controller-Sky-Cipher.jpg"
                alt="Producto"
                className="product-img"
              />
              <h3>X-box</h3>
              <p>$1'000,000</p>
              <button className="buy-btn">Añadir al Carrito</button>
            </div>
          ))}
        </div>
      </main>

      {/* Footer con más información */}
      <footer className="footer">
        <div className="footer-content">
          <p>@COLAB2025 - Todos los derechos reservados</p>
          <p>Contacto: juanca16207@gmail.com | Tel: +57 310 8684060</p>
          <p>
            <a href="/politicas">Política de Privacidad</a> | 
            <a href="/terminos">Términos de Uso</a>
          </p>
          <p>Síguenos en nuestras redes sociales: 
            <a href="https://twitter.com/collab" target="_blank">Twitter</a> |
            <a href="https://facebook.com/collab" target="_blank">Facebook</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ClienteHome;