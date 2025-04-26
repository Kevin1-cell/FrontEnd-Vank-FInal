const obtenerUsuarioCache = () => {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;  // Cambié toJson() por JSON.parse()
  };
  
  const cambiarAgregarUsuarioCache = (usuario) => {
    localStorage.setItem('usuario', JSON.stringify(usuario));
  };
  
  const eliminarUsuarioCache = () => {
    localStorage.removeItem('usuario');
  };
  
  export default {
    obtenerUsuarioCache,
    cambiarAgregarUsuarioCache,
    eliminarUsuarioCache
  };
  