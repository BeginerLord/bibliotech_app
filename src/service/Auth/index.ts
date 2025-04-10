import { bibliotechapi } from "@/api/api";
import { jwtDecode } from "jwt-decode";


interface JwtPayload {
  authorities: string;
}

export const login = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  try {
    // Realizar la solicitud de inicio de sesión
    const { data } = await bibliotechapi.post("/login", { username, password });

    // Guardar el token JWT en localStorage
    localStorage.setItem("accessToken", data.jwt);

    // Decodificar el token JWT para obtener las autoridades
    const decodedToken = jwtDecode<JwtPayload>(data.jwt);
    const authorities = decodedToken.authorities;

    return { ...data, authorities };
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const getAuthorities = () => {
  try {
    // Obtener el token JWT de localStorage
    const jwt = localStorage.getItem("accessToken");

    if (!jwt) {
      return null;
    }

    // Decodificar el token JWT para obtener las autoridades
    const decodedToken = jwtDecode<JwtPayload>(jwt);
    return decodedToken.authorities;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};