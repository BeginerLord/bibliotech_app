import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BookModel, BookModelDto, CreateBookModel, UpdateBookModel } from "@/models/book_model";
import { PaginatedResponse } from "@/models/PaginatedResponse";
import { createBook, deleteBookByUuid, getAllBooks, getBookByUuid, searchBooksByTitle, updateBookByUuid } from "@/service/Books";
import { PersonModelDto, UpdatePersonModel } from "@/models/persons_model";
import { createPerson, getAllPersonsActive, searchyUserByDni, updatePersonByDni, updateStatusActiveByEmail, updateStatusInactiveByEmail } from "@/service/Persons";

export const useGetAllPersonsActives = (
  page: number = 0,
  size: number = 10,
  sortBy: string = "email",
  direction: string = "asc",
  statusEntity: string = "ACTIVE"
) => {
  const { isLoading, data, error } = useQuery<PaginatedResponse<PersonModelDto>>({
    queryKey: ["persons", page, size, sortBy, direction, statusEntity],
    queryFn: () => getAllPersonsActive(page, size, sortBy, direction, statusEntity),
    staleTime: 5 * 60 * 1000, // Los datos son válidos durante 5 minutos
    refetchOnWindowFocus: false, // No recargar los datos cuando el usuario regresa a la ventana
  });

  return { isLoading, data, error };
};

export const useCreatePerson = () => {
  const queryClient = useQueryClient();
  const { mutate: createPersonMutation, isPending: isCreating, error: createError } = useMutation({
    mutationFn: (personData: PersonModelDto) => createPerson(personData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["persons"] });
    },
    onError: (error) => {
      console.error("Error creating persons:", error);
    },
  });

  return { createPersonMutation, isCreating, createError };
};


export const useUpdateStatusPersonInactive =()=>{

  const queryClient= useQueryClient();
  const {mutate: updateStatusPersonInactiveMutation, isPending:isStatusInactive}=useMutation({
    mutationFn:({email} :{email:string})=>updateStatusInactiveByEmail(email),
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:["persons"]});

    },
    onError: (error) => {
      console.error("Error updating persons:", error);
    },
  })
  return {updateStatusPersonInactiveMutation, isStatusInactive}
}

export const useUpdateStatusPersonActive =()=>{

  const queryClient= useQueryClient();
  const {mutate: updateStatusPersonActiveMutation, isPending:isStatusActive}=useMutation({
    mutationFn:({email} :{email:string})=>updateStatusActiveByEmail(email),
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:["persons"]});

    },
    onError: (error) => {
      console.error("Error updating persons:", error);
    },
  })
  return {updateStatusPersonActiveMutation, isStatusActive}
}
export const useUpdatePerson = () => {
  const queryClient = useQueryClient();
  const { mutate: updatePersonMutation, isPending: isUpdating, error: updateError } = useMutation({
    mutationFn: ({ dni, personData }: { dni: string, personData: UpdatePersonModel }) => 
      updatePersonByDni(dni, personData),
    onSuccess: (updatedBook) => {
      queryClient.invalidateQueries({ queryKey: ["persons", updatedBook.dni] });
      queryClient.invalidateQueries({ queryKey: ["persons"] });
    },
    onError: (error) => {
      console.error("Error updating persons:", error);
    },
  });

  return { updatePersonMutation, isUpdating, updateError };
};

 
export const useGetPersonByEmail = (email: string) => {
  const { data, isLoading, error } = useQuery<PersonModelDto>({
    queryKey: ["persons", email],
    queryFn: () => searchyUserByDni(email),
    staleTime: 5 * 60 * 1000,
    enabled: !!email, // Don't make the request if no UUID is provided
  });

  return { data, isLoading, error };
};


export const useGetPersonByDni = (dni: string) => {
  const { data, isLoading, error } = useQuery<PersonModelDto>({
    queryKey: ["persons", dni],
    queryFn: () => searchyUserByDni(dni),
    staleTime: 5 * 60 * 1000,
    enabled: !!dni, // Don't make the request if no UUID is provided
  });

  return { data, isLoading, error };
};

 