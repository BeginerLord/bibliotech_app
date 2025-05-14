import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PaginatedResponse } from "@/models/PaginatedResponse";
import { deleteFinesByFineId, getAllFines, getCountFines, getFinesByDni, saveFines } from "@/service/Fine";
import { FineCount, FineModelDto } from "@/models/fine_model";

export const useGetAllFinesPendig = (
    page: number = 0,
    size: number = 10,
    sortBy: string = "issuedDate",
    direction: string = "asc",
    status: string = "PENDING"
) => {
    const { isLoading, data, error } = useQuery<PaginatedResponse<FineModelDto>>({
        queryKey: ["fines", page, size, sortBy, direction, status],
        queryFn: () => getAllFines(page, size, sortBy, direction, status),
        staleTime: 5 * 60 * 1000, // Los datos son válidos durante 5 minutos
        refetchOnWindowFocus: false, // No recargar los datos cuando el usuario regresa a la ventana
    });

    return { isLoading, data, error };
};

export const useGetAllFinesPaid = (
    page: number = 0,
    size: number = 10,
    sortBy: string = "issuedDate",
    direction: string = "asc",
    status: string = "PAID"
) => {
    const { isLoading, data, error } = useQuery<PaginatedResponse<FineModelDto>>({
        queryKey: ["fines", page, size, sortBy, direction, status],
        queryFn: () => getAllFines(page, size, sortBy, direction, status),
        staleTime: 5 * 60 * 1000, // Los datos son válidos durante 5 minutos
        refetchOnWindowFocus: false, // No recargar los datos cuando el usuario regresa a la ventana
    });

    return { isLoading, data, error };
};
export const useCountFines = () => {
    const { data, isLoading, error } = useQuery<FineCount>({
        queryKey: ['fines', 'count'],
        queryFn: getCountFines,          // 👈  pasa la función, no una arrow que la devuelva
        staleTime: 5 * 60 * 1000,        // 5 min en caché
        refetchOnWindowFocus: false,     // 👈  propiedad correcta
    });

    return { data, isLoading, error };
};
export const useCreateFine = () => {
    const queryClient = useQueryClient();
    const { mutate: createFineMutation, isPending: isCreating, error: createError } = useMutation({
        mutationFn: saveFines,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["fines"] });
        },
        onError: (error) => {
            console.error("Error creating fines:", error);
        },
    });

    return { createFineMutation, isCreating, createError };
};



export const useGetFinesByDni = (dni: string) => {
    const { data, isLoading, error } = useQuery<FineModelDto>({
        queryKey: ["fines", dni],
        queryFn: () => getFinesByDni(dni),
        staleTime: 5 * 60 * 1000,
        enabled: !!dni, // Don't make the request if no UUID is provided
    });

    return { data, isLoading, error };
};

export const useDeleteFines = () => {
    const queryClient = useQueryClient();
    const { mutate: deleteBookMutation, isPending: isDeleting, error: deleteError } = useMutation({
        mutationFn: (fineId: string) => deleteFinesByFineId(fineId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["fines"] });
        },
        onError: (error) => {
            console.error("Error deleting fines:", error);
        },
    });

    return { deleteBookMutation, isDeleting, deleteError };
};

