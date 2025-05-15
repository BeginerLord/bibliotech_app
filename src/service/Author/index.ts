import { bibliotechapi } from "@/api/api";
import { AuthorModel, AuthorModelDto, UpdateAuthorModel } from "@/models/author_model";
import { PaginatedResponse } from "@/models/PaginatedResponse";


export const getAllAuthor = async (
    page: number = 0,
    size: number = 10,
    sortBy: string = "fullName",  // Usamos 'fullName' como predeterminado
    direction: string = "asc",
    statusEntity?: string // Hacemos que 'statusEntity' sea opcional
  ) => {
    // Construir la URL completa usando los parámetros
    const url = `${process.env.NEXT_PUBLIC_API_URL}/author?page=${page}&size=${size}&sortBy=${sortBy}&direction=${direction}${statusEntity ? `&statusEntity=${statusEntity}` : ''}`;
  
    // Realizar la solicitud GET usando la instancia de Axios
    const { data } = await bibliotechapi.get(url);
  
    return data as PaginatedResponse<AuthorModel>;
  }
  


export const saveAuthor = async (category: UpdateAuthorModel) => {
    const { data } = await bibliotechapi.post("/author", category);
    return data as AuthorModel;
}

export const updateAuthorByUuid = async (uuid: string, author: UpdateAuthorModel) => {
    const { data } = await bibliotechapi.put(`/author/update/${uuid}`, author);
    return data as AuthorModelDto;
}


export const getAuthorByUuid = async (uuid: string) => {
    const { data } = await bibliotechapi.get(`/author/uuid/${uuid}`);
    return data as AuthorModel;
}
export const getAuthorByName = async (fullName: string) => {
    const { data } = await bibliotechapi.get(`/author/fullName/${fullName}`);
    return data as AuthorModel;
}
export const deleteAuthortByUuid = async (uuid: string) => {
    try {
        const { data } = await bibliotechapi.delete(`/author/${uuid}`);
        return data;
    } catch (error: any) {
        // Capturar específicamente los errores de Axios
        if (error.response) {
            // El servidor respondió con un status fuera del rango de 2xx
            const errorData = error.response.data || {};
            throw new Error(errorData.message || "Error al eliminar el autor");
        } else if (error.request) {
            // La petición fue hecha pero no se recibió respuesta
            throw new Error("No hay respuesta del servidor");
        } else {
            // Algo ocurrió al configurar la petición que desencadenó un error
            throw new Error(error.message || "Error desconocido");
        }
    }
}