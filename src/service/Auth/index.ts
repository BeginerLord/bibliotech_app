import { bibliotechapi } from "@/api/api";
import { UserModel } from "@/models/persons_model";
import { jwtDecode } from "jwt-decode";


interface JwtPayload {
  authorities: string;
}

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    // Realizar la solicitud de inicio de sesión
    const { data } = await bibliotechapi.post("/auth/login", { email, password });

    // Guardar el token JWT en localStorage
    localStorage.setItem("accessToken", data.accessToken);

    // Decodificar el token JWT para obtener las autoridades 
    const decodedToken = jwtDecode<JwtPayload>(data.accessToken);
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

export const singup = async(user:UserModel)=>{
  const {data} = await bibliotechapi.post("/auth/sign-up",user);
  return data as UserModel;
}
