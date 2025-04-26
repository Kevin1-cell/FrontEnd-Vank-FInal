// services/authService.js
import ApiConfig from "../config/ApiConfig";
import axios from "axios";
import cacheService from "../config/cacheConfig";  // Importamos el cacheService

export const loginUser = async (email, password) => {
  // Verificamos si ya hay un usuario en caché
  const usuarioCache = cacheService.obtenerUsuarioCache();
  if (usuarioCache) {
    return usuarioCache;  // Si existe en caché, devolvemos el usuario
  }

  try {
    const loginResponse = await axios.post(
      `${ApiConfig.urlApi}/auth/login`, 
      {
        email,
        contrasenna : password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Si el login es exitoso, guardamos el usuario en el caché
    cacheService.cambiarAgregarUsuarioCache(loginResponse.data);

    return loginResponse.data; // Devolvemos la respuesta del login (usuario)
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (userInfo) => {
  try {
    const registerResponse = await axios.post(
      `${ApiConfig.urlApi}/auth/register`,
      userInfo,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return registerResponse.data;  // Retornamos la respuesta del backend
  } catch (error) {
    throw error;
  }
};
