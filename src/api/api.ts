import axios from "axios";
import type { GetServerSidePropsContext } from "next";

// Obtener las variables de entorno
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY;

// Crear la instancia de Axios para el cliente
export const bibliotechapi = axios.create({
  baseURL: API_URL,
  headers: {
    "api-key": SECRET_KEY,
  },
});

// Configurar el interceptor de solicitudes para el cliente
bibliotechapi.interceptors.request.use(
  (config) => {
    // Obtener el token directamente del localStorage
    const jwt = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

    if (jwt) {
      // Configurar el header de autorización si el token es válido
      config.headers.Authorization = `Bearer ${jwt}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Crear una función para configurar Axios en el servidor
export const createServerApi = (context: GetServerSidePropsContext) => {
  const token = context.req.cookies["accessToken"]; // Leer el token de las cookies

  return axios.create({
    baseURL: API_URL,
    headers: {
      "api-key": SECRET_KEY,
      ...(token ? { Authorization: `Bearer ${token}` } : {}), // Agregar el token si existe
    },
  });
};