import { AuthorModel } from "@/models/author_model";
import { PaginatedResponse } from "@/models/PaginatedResponse";
import { deleteAuthortByUuid, getAllAuthor, getAuthorByName, getAuthorByUuid, saveAuthor, updateAuthorByUuid } from "@/service/Author";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { rt } from "framer-motion/client";

export const useCreateAuthor = () => {
    const queryClient = useQueryClient();

    const { mutate: createAuthorMutation, isPending } = useMutation({
        mutationFn: saveAuthor,
        onSuccess: () => {
            // La clave debe ser "authors" para coincidir con getAllAuthors
            queryClient.invalidateQueries({ queryKey: ["authors"] });
        },
        onError: (error) => {
            console.error("Error al crear autor:", error);
        }
    });

    return { createAuthorMutation, isPending };
};

export const useGetAllAuthors = (
  page: number = 0,
  size: number = 10,
  sortBy: string = "fullName", // 'fullName' como predeterminado
  direction: string = "asc",
  statusEntity?: string // 'statusEntity' opcional
) => {
  const { isLoading, data, error } = useQuery<PaginatedResponse<AuthorModel>>({
    queryKey: ["authors", page, size, sortBy, direction, statusEntity], // Añadimos 'statusEntity' a la clave
    queryFn: () => getAllAuthor(page, size, sortBy, direction, statusEntity), // Pasamos 'statusEntity' a la función
   });

  return { isLoading, data, error };  // Retornamos los datos y el error
};

export const useUpdateAuthors = () => {
    const queryClient = useQueryClient();
    const { mutate: updateAuthorMutate, isPending } = useMutation({
        mutationFn: ({ uuid, author }: { uuid: string, author: AuthorModel }) => updateAuthorByUuid(uuid, author),
        onSuccess: () => {
            // La clave debe ser "authors" para coincidir con getAllAuthors
            queryClient.invalidateQueries({ queryKey: ["authors"] });
        },
        onError: (error) => {
            console.error("Error al actualizar autor:", error);
        }
    });

    return { updateAuthorMutate, isPending };
};


export const useFindAuthorByName = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["author"],
        queryFn: () => getAuthorByName
    })
    return { data, isLoading }
}
export const useFindAuthorByUuid = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["author"],
        queryFn: () => getAuthorByUuid
    })
    return { data, isLoading }
}

export const useDeleAuthorByUuid = () => {
    const queryClient = useQueryClient();
    const { mutateAsync: useDeleAuthorMutation, isPending } = useMutation({
        mutationFn: async (uuid: string) => {
            try {
                const result = await deleteAuthortByUuid(uuid);
                return result;
            } catch (error) {
                // Asegurarse de propagar el error para que se pueda capturar en el componente
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["authors"] });
        },
        onError: (error: any) => {
            console.error("Error al eliminar autor:", error);
        }
    });

    return { useDeleAuthorMutation, isPending };
}