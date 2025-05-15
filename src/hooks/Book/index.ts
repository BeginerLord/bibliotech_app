import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BookCopy, BookModel, CountCopy, CreateBookModel, UpdateBookModel } from "@/models/book_model";
import { PaginatedResponse } from "@/models/PaginatedResponse";
import { createBook, deleteBookByUuid, getActiveBookCopies, getAllBooks, getBookByUuid, getCountCopies, searchBooksByTitle, updateBookByUuid } from "@/service/Books";

export const useGetAllBooks = (
  page: number = 0,
  size: number = 10,
  sortBy: string = "title",
  direction: string = "asc",
  statusEntity: string = "ACTIVE"
) => {
  const { isLoading, data, error } = useQuery<PaginatedResponse<BookModel>>({
    queryKey: ["books", page, size, sortBy, direction, statusEntity],
    queryFn: () => getAllBooks(page, size, sortBy, direction, statusEntity),
    staleTime: 5 * 60 * 1000, // Los datos son válidos durante 5 minutos
    refetchOnWindowFocus: false, // No recargar los datos cuando el usuario regresa a la ventana
  });

  return { isLoading, data, error };
};

export const useCreateBook = () => {
  const queryClient = useQueryClient();
  const { mutate: createBookMutation, isPending: isCreating, error: createError } = useMutation({
    mutationFn: (bookData: CreateBookModel) => createBook(bookData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
    onError: (error) => {
      console.error("Error creating book:", error);
    },
  });

  return { createBookMutation, isCreating, createError };
};

export const useUpdateBook = () => {
  const queryClient = useQueryClient();
  const { mutate: updateBookMutation, isPending: isUpdating, error: updateError } = useMutation({
    mutationFn: ({ uuid, bookData }: { uuid: string, bookData: UpdateBookModel }) => 
      updateBookByUuid(uuid, bookData),
    onSuccess: (updatedBook) => {
      queryClient.invalidateQueries({ queryKey: ["books", updatedBook.bookUuid] });
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
    onError: (error) => {
      console.error("Error updating book:", error);
    },
  });

  return { updateBookMutation, isUpdating, updateError };
};

export const useSearchBooksByTitle = (
  title: string,
  page: number = 0,
  size: number = 10,
  sortBy: string = "title",
  direction: string = "asc"
) => {
  const { data, isLoading, error } = useQuery<PaginatedResponse<BookModel>>({
    queryKey: ["books", "search", title, page, size, sortBy, direction],
    queryFn: () => searchBooksByTitle(title, page, size, sortBy, direction),
    staleTime: 5 * 60 * 1000,
    enabled: !!title, // Don't make the request if no title is provided
  });

  return { data, isLoading, error };
};

export const useGetBookByUuid = (uuid: string) => {
  const { data, isLoading, error } = useQuery<BookModel>({
    queryKey: ["books", uuid],
    queryFn: () => getBookByUuid(uuid),
    staleTime: 5 * 60 * 1000,
    enabled: !!uuid, // Don't make the request if no UUID is provided
  });

  return { data, isLoading, error };
};

export const useDeleteBook = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteBookMutation, isPending: isDeleting, error: deleteError } = useMutation({
    mutationFn: (uuid: string) => deleteBookByUuid(uuid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
    onError: (error) => {
      console.error("Error deleting book:", error);
    },
  });

  return { deleteBookMutation, isDeleting, deleteError };
};

export const useGetActiveBookCopies = (bookId: string) => {
  const { data, isLoading, error } = useQuery<BookCopy[]>({
    queryKey: ["bookCopies", bookId],
    queryFn: () => getActiveBookCopies(bookId),
    staleTime: 5 * 60 * 1000, // Data is valid for 5 minutes
    enabled: !!bookId, // Don't make the request if no bookId is provided
  });

  return { data, isLoading, error };
};

export const useGetCountCopies = () => {
  const { data, isLoading, error } = useQuery<CountCopy>({
    queryKey: ["bookCopies", "count"],
    queryFn: () => getCountCopies(),
    staleTime: 5 * 60 * 1000, // Data is valid for 5 minutes
  });

  return { data, isLoading, error };
};