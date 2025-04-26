import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/VendedorHome.css";
import { obtenerFacturasVendedor } from "../services/facturacionProvedorService";
import { obtenerFacturasVendedor as obtenerFacturasVendedorV } from '../services/facturacionVendedorService';
import { obtenerProductosPorVendedorId } from "../services/productoVendedorService";
import { obtenerPorPalabraClave } from "../services/productoProvedorService"
import { validarFactura } from "../validator/facturacionProvedorValidator";
import { crearFacturaProveedor } from "../services/facturacionProvedorService"
import toast from "react-hot-toast";

const VendedorDashboard = () => {
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState('productos');


  // Estados para gestión de productos
  const [productosProveedores, setProductosProveedores] = useState([]);
  const [misCompras, setMisCompras] = useState([]);
  const [misProductosPublicados, setMisProductosPublicados] = useState([]);
  const [palabraBuscada, setPalabraBuscada] = useState("");
  const [productosBuscados, setProductosBuscados] = useState([]);
  const [cantidad, setCantidad] = useState(1);

  console.log(misCompras)

  // Estados adicionales de tu código
  const [ventas, setVentas] = useState([]);
  const [cupon, setCupon] = useState("");

  // Modal de edición
  const [modalEditarPrecio, setModalEditarPrecio] = useState({
    abierto: false,
    producto: null,
    nuevoPrecio: 0
  });

  const navigate = useNavigate();

  const obtenerDatosFactura = (itemFactura) => {
    console.log("Datos de la factura:", itemFactura);
    const datosFactura = {
      proveedor_id: itemFactura.proveedor_id,
      vendedor_id: user.rol.usuarioRolId,
      items_factura: [
        {
          cantidad_producto: cantidad,
          producto_id: itemFactura.id
        }
      ]
    };

    if (cupon) {
      datosFactura.cupon = cupon;
    }

    return datosFactura;
  };

  const validarDatosFactura = async (datosFactura) => {
    return await validarFactura(datosFactura);
  };

  const crearFactura = async (datosFactura) => {
    const resultado = await validarDatosFactura(datosFactura);
    
    if (!resultado.valido) {
      toast.error(resultado.errores[Object.keys(resultado.errores)[0]], {
        position: 'bottom-right',
      });
      return;
    }

    try {
      const response = await crearFacturaProveedor(datosFactura);
      toast.success("Factura creada con éxito", {
        position: 'bottom-right',
      });

      const comprasActualizadas = await obtenerFacturasVendedor(user.rol.usuarioRolId);
      setMisCompras(comprasActualizadas.data);
    } catch (error) {
      toast.error(error.response?.data?.error || "Error al crear factura", {
        position: 'bottom-right',
      });
    }
  };

  const handleComprar = async (producto) => {
    const facturaInfo = obtenerDatosFactura(producto);
    await crearFactura(facturaInfo);
  };

  // Cargar todos los datos necesarios
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [
          comprasData,
          ventasData,
          productosData,
        ] = await Promise.all([
          obtenerFacturasVendedor(user.rol.usuarioRolId),
          obtenerFacturasVendedorV(user.rol.usuarioRolId),
          obtenerProductosPorVendedorId(user.rol.usuarioRolId),
        ]);

        setMisCompras(comprasData.data);
        setVentas(ventasData.data);
        setProductosProveedores(productosData.data);
        setMisProductosPublicados(comprasData.data.filter(p => p.publicado));

        console.log(palabraBuscada)
        if (palabraBuscada) {
          console.log("Buscando productos por palabra clave:", palabraBuscada);
          const buscadosData = await obtenerPorPalabraClave(palabraBuscada);
          setProductosBuscados(buscadosData.data);
        }


        console.log("Compras:", comprasData.data);
        console.log("Ventas:", ventasData.data);
        console.log("Productos:", productosData.data);
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    };

    cargarDatos();
  }, [user.rol.usuarioRolId, palabraBuscada]);

  // Función para comprar producto
  const handleComprarProducto = async (productoId) => {
    try {
      // Aquí deberías implementar tu servicio de compra
      // const resultado = await comprarProducto(user.rol.usuarioRolId, productoId);

      // Ejemplo de actualización de estado:
      const productoComprado = productosProveedores.find(p => p.id === productoId);
      setMisCompras([...misCompras, {
        ...productoComprado,
        fechaCompra: new Date().toISOString(),
        publicado: false
      }]);
    } catch (error) {
      console.error("Error comprando producto:", error);
    }
  };


  const handleDespublicarProducto = async (compraId) => {
    try {
      const resultado = await mockServices.despublicarProducto(compraId);
      if (resultado.success) {
        // Actualizar estado
        const updated = misCompras.map(item =>
          item.id === compraId ? { ...item, publicado: false } : item
        );
        setMisCompras(updated);
        setMisProductosPublicados(updated.filter(p => p.publicado));
      }
    } catch (error) {
      console.error("Error despublicando producto:", error);
    }
  };

  const abrirModalEditarPrecio = (producto) => {
    setModalEditarPrecio({
      abierto: true,
      producto,
      nuevoPrecio: producto.precioVenta || producto.precioCompra
    });
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  console.log(activeSection === 'historial-compras');

  console.log(activeSection)
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="dashboard-sidebar">
        <h2>Collab</h2>
        <nav>
          <button
            className={`menu-btn ${activeSection === 'productos' ? 'active' : ''}`}
            onClick={() => setActiveSection('productos')}
          >
            Mis Productos
          </button>
          <button
            className={`menu-btn ${activeSection === 'pedidos' ? 'active' : ''}`}
            onClick={() => setActiveSection('pedidos')}
          >
            Pedidos
          </button>
          <button
            className={`menu-btn ${activeSection === 'historial-ventas' ? 'active' : ''}`}
            onClick={() => setActiveSection('historial-ventas')}
          >
            Historial Ventas
          </button>
          <button
            className={`menu-btn ${activeSection === 'cupones' ? 'active' : ''}`}
            onClick={() => setActiveSection('cupones')}
          >
            Cupones
          </button>
          <button
            className={`menu-btn ${activeSection === 'historial-compras' ? 'active' : ''}`}
            onClick={() => setActiveSection('historial-compras')}
          >
            Mis Compras
          </button>
          <button
            className={`menu-btn ${activeSection === 'perfil' ? 'active' : ''}`}
            onClick={() => setActiveSection('perfil')}
          >
            Mi Perfil
          </button>
        </nav>

        <button className="logout-btn" onClick={() => { logout(); navigate("/login"); }}>
          Cerrar Sesión
        </button>
      </div>

      {/* Contenido principal */}
      <div className="dashboard-content">
        {activeSection === 'productos' && (
          <div className="productos-container">
            <div className="seccion-titulo">
              <h2>Catálogo de Proveedores</h2>
              <input
                type="text"
                placeholder="Buscar productos..."
                value={palabraBuscada}
                onChange={(e) => setPalabraBuscada(e.target.value)}
                className="buscador"
              />
              <input
                type="text"
                placeholder="Ingresar Cupon"
                value={cupon}
                onChange={(e) => setCupon(e.target.value)}
                className="buscadorCupon"
              />
            </div>

            {/* Listado de productos */}
            <div className="productos-grid">
              {productosBuscados.map((producto) => (

                <div key={producto.id} className="product-card">
                  <div className="product-image">
                    {producto.url_imagen ? (
                      <img src={producto.url_imagen} alt={producto.nombre} />
                    ) : (
                      <div className="no-image">Imagen no disponible</div>
                    )}
                  </div>
                  <div className="product-info">
                    <h3>{producto.nombre}</h3>
                    <p>Precio: ${producto.precio}</p>
                    <p>Mínimo: {producto.cantidad_min} unidades</p>
                    <div className="product-actions">
                      <div className="producto-actions">
                        <div className="quantity-selector">
                          <button
                            onClick={() => setCantidad(prev => Math.max(1, prev - 1))}
                            className="quantity-btn"
                          >
                            -
                          </button>
                          <span className="quantity">{cantidad}</span>
                          <button
                            onClick={() => setCantidad(prev => prev + 1)}
                            className="quantity-btn"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => handleComprar(producto)}
                          className="buy-btn"
                        >
                          Comprar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Sección de Mis Productos Publicados */}
            <div className="mis-productos-seccion">
              <h2>Mis Productos Publicados</h2>
              <div className="mis-productos-grid">
                {misCompras.map(producto => (
                  <div key={producto.id} className="producto-card publicado">
                    {/* ... (contenido con opciones de edición) ... */}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === 'historial-compras' && (
          <div className="historial-compras-container">
            <h2>Mis Compras</h2>

            {misCompras.length === 0 ? (
              <h2>No tienes compras en el momento.</h2>
            )
              : (
                <table>
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Precio</th>
                      <th>Fecha</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {misCompras.map(compra => (
                      <tr key={compra.id}>
                        <td>{compra.nombre}</td>
                        <td>${compra.precio}</td>
                        <td>{new Date(compra.fechaCompra).toLocaleDateString()}</td>
                        <td>{compra.publicado ? 'Publicado' : 'No publicado'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
          </div>
        )}


        {/* Sección de Cupones */}
      
      </div>
    </div>
  );
};

export default VendedorDashboard;