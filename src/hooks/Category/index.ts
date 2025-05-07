import { CategoryModel } from "@/models/category_model";
import { PaginatedResponse } from "@/models/PaginatedResponse";
import { saveCategory, updateCategoryByUuid, getAllCategories, getCategoryByName, getCategoryByUuid, getCategoryByDescription, deleteCategoryByUuid } from "@/service/Categoy";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Hook para crear una categoría
export const useCreateCategory = () => {
    const queryClient = useQueryClient();
    const { mutate: createCategoryMutation, isLoading: isCreating } = useMutation({
        mutationFn: saveCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["category"] });
        },
        onError: (error) => {
            console.error("Error al crear categoría:", error);
        },
    });

    return { createCategoryMutation, isCreating };
};

// Hook para obtener todas las categorías con paginación y ordenación
export const useGetAllCategory = (page: number = 0, size: number = 10, sortBy: string = "name", direction: string = "asc") => {
    const { isLoading, data } = useQuery<PaginatedResponse<CategoryModel>>({
        queryKey: ["category", page, size, sortBy, direction],
        queryFn: () => getAllCategories(page, size, sortBy, direction),
        staleTime: 10 * 60 * 1000, // Mantener los datos frescos por 10 minutos
        refetchOnWindowFocus: false, // No recargar los datos cuando el usuario regresa a la ventana
    });

    return { isLoading, data };
};

// Hook para actualizar una categoría por UUID
export const useUpdateCategory = () => {
    const queryClient = useQueryClient();
    const { mutate: updateCategoryMutate, isLoading: isUpdating } = useMutation({
        mutationFn: ({ uuid, category }: { uuid: string, category: CategoryModel }) => updateCategoryByUuid(uuid, category),
        onSuccess: (updatedCategory) => {
            queryClient.invalidateQueries({ queryKey: ["category", updatedCategory.uuid] });
            queryClient.invalidateQueries({ queryKey: ["category"] });
        },
        onError: (error) => {
            console.error("Error al actualizar categoría:", error);
        },
    });

    return { updateCategoryMutate, isUpdating };
};

// Hook para buscar una categoría por nombre
export const useFindCategoryName = (name: string) => {
    const { data, isLoading } = useQuery({
        queryKey: ["category", name],
        queryFn: () => getCategoryByName(name),
        staleTime: 5 * 60 * 1000, // Los datos son válidos durante 5 minutos
        enabled: !!name, // No hacer la petición si no se pasa un nombre
    });
    return { data, isLoading };
};

// Hook para buscar una categoría por UUID
export const useFindCategoryByUuid = (uuid: string) => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["category", uuid],
        queryFn: () => getCategoryByUuid(uuid),
        staleTime: 5 * 60 * 1000, // Los datos son válidos durante 5 minutos
        enabled: !!uuid, // No hacer la petición si no se pasa un uuid
    });
    return { data, isLoading, isError, error };
};

// Hook para buscar una categoría por descripción
export const useFindCategoryByDescription = (description: string) => {
    const { data, isLoading } = useQuery({
        queryKey: ["category", description],
        queryFn: () => getCategoryByDescription(description),
        staleTime: 5 * 60 * 1000, // Los datos son válidos durante 5 minutos
        enabled: !!description, // No hacer la petición si no se pasa una descripción
    });
    return { data, isLoading };
};

// Hook para eliminar una categoría por UUID
export const useDeleteCategoryByUuid = () => {
    const queryClient = useQueryClient();
    const { mutate: deleteCategoryMutate, isLoading: isDeleting } = useMutation({
        mutationFn: deleteCategoryByUuid,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["category"] });
        },
        onError: (error) => {
            console.error("Error al eliminar categoría:", error);
        },
    });

    return { deleteCategoryMutate, isDeleting, };
};
