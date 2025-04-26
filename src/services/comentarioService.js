import ApiConfig from "../config/ApiConfig";
import cacheConfig from "../config/cacheConfig";
import {apiKey} from "../config/ApiConfig";
import axios from "axios";

export const crearComentario = (comentario) => {
    const crearComentario = axios.post(
        `${ApiConfig.urlApi}/comentario`,
        {
            ...comentario
        },
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${cacheConfig.obtenerUsuarioCache().token}`,
            },
        }
    )

    return crearComentario;
}

export const obtenerComentariosPorProductoId = (id) => {
    const obtenerComentario = axios.get(
        `${ApiConfig.urlApi}/comentario/producto/${id}`,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${cacheConfig.obtenerUsuarioCache().token}`,
            },
        }
    )

    return obtenerComentario;
}

export const obtenerComentariosPorClienteId = (id) => {
    const obtenerComentario = axios.get(
        `${ApiConfig.urlApi}/comentario/cliente/${id}`,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${cacheConfig.obtenerUsuarioCache().token}`,
            },
        }
    )

    return obtenerComentario;
}

export const analisisComentarios = async (producto_id) => {
    const comentarios = await obtenerComentariosPorProductoId(producto_id);

    const textoComentarios = comentarios.map((comentario) => comentario.contenido).join(`--- Comentario ---`);

    const promt = `Analiza los siguientes comentarios y dame un resumen de los puntos positivos y negativos. y que podria mejorar como emprendedor, dame estrategias o motivacion si estoy haciendo las cosas bien. Comentarios: ${textoComentarios}`;

    const analisis = axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
        contents : [{
            "parts":[{"text": "Explain how AI works"}]
            }]
           }
        , {
            headers: {
                "Content-Type": "application/json",
            }
        });

    return analisis;
}