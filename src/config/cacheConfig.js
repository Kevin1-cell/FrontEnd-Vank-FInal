const obtenerUsuarioCache = () => {
    const usuario = localStorage.getItem('usuario_colab');
    try {
      return usuario ? JSON.parse(usuario) : null;
    } catch (error) {
      console.error('Error al parsear usuario desde localStorage:', error);
      eliminarUsuarioCache()
      return null;
    }
  };
  

const cambiarAgregarUsuarioCache = (usuario) => {
    localStorage.setItem('usuario_colab', JSON.stringify(usuario));
}

const eliminarUsuarioCache = () => {
    localStorage.removeItem('usuario_colab');
}

export default {
    obtenerUsuarioCache,
    cambiarAgregarUsuarioCache,
    eliminarUsuarioCache
}