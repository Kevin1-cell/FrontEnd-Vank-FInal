import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import '../styles/ProveedorHome.css';
import { obtenerProductosPorProvedorId, editarProductoProveedor, crearProductoProveedor } from '../services/productoProvedorService';
import { validarCrearProducto, validarEditarProducto } from '../validator/productoProvedorValidator';
import { obtenerFacturasProvedor } from '../services/facturacionProvedorService';

const Chart = ({ type, data }) => {
  return (
    <div className="chart-container">
      <div className="chart-placaeholder">
        {type === 'bar' && '📊 Gráfico de Barras: ' + JSON.stringify(data)}
        {type === 'pie' && '🥧 Gráfico Circular: ' + JSON.stringify(data)}
        {type === 'line' && '📈 Gráfico de Líneas: ' + JSON.stringify(data)}
      </div>
    </div>
  );
};

const ProveedorDashboard = () => {
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState('productos');
  const [productos, setProductos] = useState([]);
  const [currentProduct, setCurrentProduct] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    cantidad_min: '',
    url_imagen: '',
    proveedor_id: user?.rol?.usuarioRolId || ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showIAModal, setShowIAModal] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [historialVentas, setHistorial] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productosData, facturasData] = await Promise.all([
          obtenerProductosPorProvedorId(user?.rol?.usuarioRolId),
          obtenerFacturasProvedor(user?.rol?.usuarioRolId)
        ]);
        setProductos(productosData.data);
        setHistorial(facturasData.data.map(f => ({
          id: f.id,
          valor_total: f.valor_total,
          fecha: f.fecha,
          descuento_aplicado: f.descuento_aplicado
        })));
      } catch (error) {
        console.error("Error cargando datos:", error);
        toast.error("Error al cargar datos", { position: 'bottom-right' });
      }
    };
    fetchData();
  }, [user?.rol?.usuarioRolId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct({ ...currentProduct, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      const resultado = await validarEditarProducto(currentProduct);
      if (!resultado.valido) {
        toast.error(resultado.errores[Object.keys(resultado.errores)[0]], { position: 'bottom-right' });
        return;
      }

      try {
        await editarProductoProveedor(currentProduct);
        setProductos(productos.map(p => p.id === currentProduct.id ? currentProduct : p));
        toast.success("Producto actualizado", { position: 'bottom-right' });
      } catch (error) {
        toast.error("Error al actualizar producto", { position: 'bottom-right' });
      }
    } else {
      const resultado = await validarCrearProducto(currentProduct);
      if (!resultado.valido) {
        toast.error(resultado.errores[Object.keys(resultado.errores)[0]], { position: 'bottom-right' });
        return;
      }

      try {
        const nuevoProducto = await crearProductoProveedor(currentProduct);
        setProductos([...productos, nuevoProducto.data]);
        toast.success("Producto agregado", { position: 'bottom-right' });
      } catch (error) {
        toast.error("Error al crear producto", { position: 'bottom-right' });
      }
    }
    resetForm();
  };

  const resetForm = () => {
    setCurrentProduct({
      nombre: '',
      descripcion: '',
      precio: '',
      cantidad_min: '',
      url_imagen: '',
      proveedor_id: user?.rol?.usuarioRolId || ''
    });
    setIsEditing(false);
  };

  const handleEdit = (producto) => {
    setCurrentProduct(producto);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    setProductos(productos.filter(p => p.id !== id));
    toast.success("Producto eliminado", { position: 'bottom-right' });
  };

  const handleLogout = () => {
    logout();
    navigate("/Login");
  };

  const navigate = useNavigate();

  // =================================================================
  // IMPLEMENTACIÓN REAL DE IA (Computer Vision)
  // =================================================================

  const IAProductoModal = ({ show, onClose, onAddProduct }) => {
    const [imageUrl, setImageUrl] = useState('');
    const [generating, setGenerating] = useState(false);
    const [productInfo, setProductInfo] = useState(null);

    const AZURE_ENDPOINT = "https://myvisionservicevankversity.cognitiveservices.azure.com/";
    const AZURE_KEY = "35dsRtlujhtZO9kiqQugKc1lI6rRc6yYmW7uwT0bLUgLze1DTe7YJQQJ99BDACYeBjFXJ3w3AAAFACOGxbc6";

    const analizarImagen = async () => {
      setGenerating(true);
      toast.loading("Analizando imagen con IA...", { position: 'bottom-right' });
      
      try {
        const response = await axios.post(
          `${AZURE_ENDPOINT}vision/v3.2/analyze?visualFeatures=Description,Tags,Categories`,
          { url: imageUrl },
          {
            headers: {
              'Ocp-Apim-Subscription-Key': AZURE_KEY,
              'Content-Type': 'application/json'
            }
          }
        );

        const data = response.data;
        const descripcion = data.description.captions[0]?.text || "Producto de calidad";
        const etiquetas = data.tags.map(t => t.name).join(', ');
        const categorias = data.categories.map(c => c.name).join(', ');

        // Lógica de generación de precio (similar a tu C#)
        const getRandomPrice = (tags) => {
          let base = Math.floor(Math.random() * (800000 - 50000) + 50000);
          if (tags.some(t => t.toLowerCase().includes('shoe'))) base += 150000;
          if (tags.some(t => t.toLowerCase().includes('house'))) base += 2000000;
          if (tags.some(t => t.toLowerCase().includes('phone'))) base += 800000;
          return base;
        };

        const productoGenerado = {
          name: `Producto - ${descripcion.split(' ').slice(0, 3).join(' ')}`,
          description: `DESCRIPCIÓN: ${descripcion}\nETIQUETAS: ${etiquetas}\nCATEGORÍAS: ${categorias}`,
          price: getRandomPrice(data.tags.map(t => t.name)),
          minQuantity: Math.floor(Math.random() * 10) + 1
        };

        setProductInfo(productoGenerado);
        toast.success("¡Análisis completado!", { position: 'bottom-right' });
      } catch (error) {
        console.error("Error en Computer Vision:", error);
        toast.error("Error al analizar la imagen", { position: 'bottom-right' });
        setProductInfo({
          name: "Error en análisis",
          description: "No se pudo analizar la imagen. Verifica la URL o intenta con otra imagen.",
          price: 0,
          minQuantity: 1
        });
      } finally {
        setGenerating(false);
        toast.dismiss();
      }
    };

    if (!show) return null;

    return (
      <div className="ia-modal-overlay">
        <div className="ia-modal">
          <button className="ia-modal-close" onClick={onClose}>×</button>
          <h3>Generar producto con IA</h3>
          
          <div className="ia-modal-content">
            <div className="input-group">
              <label>URL de la imagen del producto</label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://ejemplo.com/imagen.jpg"
              />
            </div>

            {imageUrl && (
              <div className="image-preview">
                <img src={imageUrl} alt="Vista previa" />
              </div>
            )}

            <button
              className="ia-generate-btn"
              onClick={analizarImagen}
              disabled={!imageUrl || generating}
            >
              {generating ? 'Generando...' : 'Generar información'}
            </button>

            {productInfo && (
              <div className="ia-generated-info">
                <h4>Información Generada:</h4>
                <p><strong>Nombre:</strong> {productInfo.name}</p>
                <p><strong>Descripción:</strong> {productInfo.description}</p>
                <p><strong>Precio sugerido:</strong> ${productInfo.price.toLocaleString()} COP</p>
                <p><strong>Cantidad mínima:</strong> {productInfo.minQuantity}</p>

                <button
                  className="ia-add-btn"
                  onClick={() => {
                    onAddProduct(productInfo);
                    onClose();
                  }}
                >
                  Agregar Producto
                </button>
              </div>
            )}

            <div className="ia-disclaimer">
              <p>La IA analizará la imagen y generará: nombre, descripción, precio sugerido y cantidad mínima.</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // =================================================================
  // RENDER PRINCIPAL
  // =================================================================

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="dashboard-sidebar">
        <h2>Collab</h2>
        <nav>
          <button className={`menu-btn ${activeSection === 'productos' ? 'active' : ''}`} onClick={() => setActiveSection('productos')}>
            Mis Productos
          </button>
          <button className={`menu-btn ${activeSection === 'pedidos' ? 'active' : ''}`} onClick={() => setActiveSection('pedidos')}>
            Pedidos
          </button>
          <button className={`menu-btn ${activeSection === 'historial' ? 'active' : ''}`} onClick={() => setActiveSection('historial')}>
            Historial
          </button>
          <button className={`menu-btn ${activeSection === 'estadisticas' ? 'active' : ''}`} onClick={() => setActiveSection('estadisticas')}>
            Cupones de descuento
          </button>
          <button className={`menu-btn ${activeSection === 'perfil' ? 'active' : ''}`} onClick={() => setActiveSection('perfil')}>
            Mi Perfil
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="dashboard-content">
        {activeSection === 'productos' && (
          <div className="productos-container">
            <div className="form-column fixed-form">
              <h2>{isEditing ? 'Editar Producto' : 'Agregar Producto'}</h2>
              <form onSubmit={handleSubmit}>
                <div className="input-group">
                  <label>Nombre del Producto</label>
                  <input
                    type="text"
                    name="nombre"
                    value={currentProduct.nombre}
                    onChange={handleInputChange}
                    placeholder="Ej: Llantas para Toyota Corolla"
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Descripción</label>
                  <textarea
                    name="descripcion"
                    value={currentProduct.descripcion}
                    onChange={handleInputChange}
                    placeholder="Describa las características del producto..."
                    required
                  />
                </div>

                <div className="input-row">
                  <div className="input-group">
                    <label>Precio ($)</label>
                    <input
                      type="number"
                      name="precio"
                      value={currentProduct.precio}
                      onChange={handleInputChange}
                      placeholder="Ej: 99.99"
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label>Cantidad Mínima</label>
                    <input
                      type="number"
                      name="cantidad_min"
                      value={currentProduct.cantidad_min}
                      onChange={handleInputChange}
                      placeholder="Ej: 10"
                      required
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label>URL de la Imagen</label>
                  <input
                    type="text"
                    name="url_imagen"
                    value={currentProduct.url_imagen}
                    onChange={handleInputChange}
                    placeholder="https://ejemplo.com/imagen-producto.jpg"
                  />
                </div>

                <div className="form-actions">
                  <button type="submit" className="submit-btn">
                    {isEditing ? 'Guardar Cambios' : 'Agregar Producto'}
                  </button>
                  {isEditing && (
                    <button type="button" onClick={resetForm} className="cancel-btn">
                      Cancelar
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="catalog-column scrollable-catalog">
              <h2>Mi Catálogo ({productos.length})</h2>
              {productos.length > 0 ? (
                <div className="product-grid">
                  {productos.map(producto => (
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
                          <button onClick={() => handleEdit(producto)} className="edit-btn">
                            Editar
                          </button>
                          <button onClick={() => handleDelete(producto.id)} className="delete-btn">
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-catalog">
                  <p>No hay productos registrados</p>
                  <p>Comienza agregando tu primer producto</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Otras secciones (pedidos, historial, etc.) */}
        {activeSection === 'pedidos' && (
          <div className="section-placeholder">
            <h2>Pedidos</h2>
            <p>Gestiona los pedidos de los vendedores aquí</p>
          </div>
        )}

        {activeSection === 'historial' && (
          <div className="historial-container">
            <h2>Historial de Ventas</h2>
            <div className="historial-table-container">
              <table className="historial-table">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Total</th>
                    <th>Descuento</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {historialVentas.map((venta) => (
                    <tr key={venta.id}>
                      <td>{venta.fecha}</td>
                      <td>${venta.valor_total.toLocaleString()}</td>
                      <td>${venta.descuento_aplicado.toLocaleString()}</td>
                      <td>completado</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeSection === 'estadisticas' && (
          <div className="estadisticas-container">
            <h2>Cupones</h2>
            <div className="stats-cards">
              <div className="stat-card">
                <h3>Ventas Totales</h3>
                <p>$6,500</p>
              </div>
              <div className="stat-card">
                <h3>Productos Vendidos</h3>
                <p>36</p>
              </div>
              <div className="stat-card">
                <h3>Clientes Activos</h3>
                <p>8</p>
              </div>
            </div>
            <div className="charts-grid">
              <div className="chart-section">
                <h3>Ventas por Mes</h3>
                <Chart type="bar" data={{'Ene': 1200, 'Feb': 1800, 'Mar': 2100, 'Abr': 2400, 'May': 3000}} />
              </div>
              <div className="chart-section">
                <h3>Distribución de Ventas</h3>
                <Chart type="pie" data={{'Aceptados': 12, 'Rechazados': 3, 'Pendientes': 2}} />
              </div>
              <div className="chart-section">
                <h3>Tendencia de Ventas</h3>
                <Chart type="line" data={{'Ene': 1200, 'Feb': 1800, 'Mar': 2100, 'Abr': 2400, 'May': 3000}} />
              </div>
            </div>
          </div>
        )}

        {activeSection === 'perfil' && user && (
          <div className="perfil-container">
            <h2>Mi Perfil</h2>
            <div className="profile-card">
              <div className="profile-header">
                <div className="profile-avatar">
                  {user.nombre.charAt(0).toUpperCase()}
                </div>
                <div className="profile-info">
                  <h3>{user.nombre} {user.apellido}</h3>
                  <p className="profile-role">{user.rol?.nombreUsuario}</p>
                </div>
              </div>
              <div className="profile-details">
                <div className="detail-row">
                  <span className="detail-label">Correo:</span>
                  <span className="detail-value">{user.correo}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Teléfono:</span>
                  <span className="detail-value">{user.telefono || 'No especificado'}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Registrado desde:</span>
                  <span className="detail-value">
                    {new Date(user.fechaRegistro).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Botón flotante de IA */}
      <button className="ia-float-btn" onClick={() => setShowIAModal(true)}>
        <span className="ia-icon">🤖</span>
        <span className="ia-text">Ayuda de IA</span>
      </button>

      {/* Modal de IA */}
      {showIAModal && (
        <IAProductoModal 
          show={showIAModal}
          onClose={() => setShowIAModal(false)}
          onAddProduct={(generatedData) => {
            setCurrentProduct({
              ...currentProduct,
              nombre: generatedData.name,
              descripcion: generatedData.description,
              precio: generatedData.price,
              cantidad_min: generatedData.minQuantity,
              url_imagen: imageUrl
            });
            toast.success("¡Datos generados con IA!", { position: 'bottom-right' });
          }}
        />
      )}
    </div>
  );
};

export default ProveedorDashboard;