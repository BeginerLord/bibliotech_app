import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PaginatedResponse } from "@/models/PaginatedResponse";
import { UserModelDto, UpdateUserModel, UserModel } from "@/models/persons_model";
import {
  createUser,
  getAllUsersActive,
  getAllUsersInactive,
  searchUserByDni,
  searchUserByEmail,
  updateUserByDni,
  updateStatusActiveByEmail,
  updateStatusInactiveByEmail
} from "@/service/Persons"; 

export const useGetAllUsersActive = (
  page: number = 0,
  size: number = 10,
  sortBy: string = "email",
  direction: string = "asc"
) => {
  const { isLoading, data, error } = useQuery<PaginatedResponse<UserModelDto>>({
    queryKey: ["users", page, size, sortBy, direction, "ACTIVE"],
    queryFn: () => getAllUsersActive(page, size, sortBy, direction, "ACTIVE"),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return { isLoading, data, error };
};

export const useGetAllUsersInactive = (
  page: number = 0,
  size: number = 10,
  sortBy: string = "email",
  direction: string = "asc"
) => {
  const { isLoading, data, error } = useQuery<PaginatedResponse<UserModelDto>>({
    queryKey: ["users", page, size, sortBy, direction, "ARCHIVED"],
    queryFn: () => getAllUsersInactive(page, size, sortBy, direction, "ARCHIVED"),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return { isLoading, data, error };
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  const { mutate: createUserMutation, isPending: isCreating, error: createError } = useMutation({
    mutationFn: (userData: UserModel) => createUser({
      ...userData,
      status: "ACTIVE" // Aseguramos que el usuario se crea con estado ACTIVE
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error("Error creating user:", error);
    },
  });

  return { createUserMutation, isCreating, createError };
};

export const useUpdateStatusUserInactive = () => {
  const queryClient = useQueryClient();
  const { mutate: updateStatusUserInactiveMutation, isPending: isStatusInactive } = useMutation({
    mutationFn: ({ email }: { email: string }) => updateStatusInactiveByEmail(email),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error("Error updating user status:", error);
    },
  });
  
  return { updateStatusUserInactiveMutation, isStatusInactive };
};

export const useUpdateStatusUserActive = () => {
  const queryClient = useQueryClient();
  const { mutate: updateStatusUserActiveMutation, isPending: isStatusActive } = useMutation({
    mutationFn: ({ email }: { email: string }) => updateStatusActiveByEmail(email),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error("Error updating user status:", error);
    },
  });
  
  return { updateStatusUserActiveMutation, isStatusActive };
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { mutate: updateUserMutation, isPending: isUpdating, error: updateError } = useMutation({
    mutationFn: ({ dni, userData }: { dni: string, userData: UpdateUserModel }) => 
      updateUserByDni(dni, userData),
    onSuccess: (updatedUser) => {
      queryClient.invalidateQueries({ queryKey: ["users", updatedUser.dni] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error("Error updating user:", error);
    },
  });

  return { updateUserMutation, isUpdating, updateError };
};

export const useGetUserByEmail = (email: string) => {
  const { data, isLoading, error } = useQuery<UserModelDto>({
    queryKey: ["users", email],
    queryFn: () => searchUserByEmail(email),
    staleTime: 5 * 60 * 1000,
    enabled: !!email, // Don't make the request if no email is provided
  });

  return { data, isLoading, error };
};

export const useGetUserByDni = (dni: string) => {
  const { data, isLoading, error } = useQuery<UserModelDto>({
    queryKey: ["users", dni],
    queryFn: () => searchUserByDni(dni),
    staleTime: 5 * 60 * 1000,
    enabled: !!dni, // Don't make the request if no DNI is provided
  });

  return { data, isLoading, error };
};