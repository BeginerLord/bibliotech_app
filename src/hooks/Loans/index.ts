import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LoanModel, CreateLoanModel, UpdateLoanModel, LoanPaginationParams } from "@/models/loans_model";
import { PaginatedResponse } from "@/models/PaginatedResponse";
import { 
  getAllLoans, 
  createLoan, 
  updateLoanById, 
  markLoanAsDelivered, 
  getLoansByUserDni, 
  getLoansCount, 
  getActiveBookCopies,
  deleteLoanById
} from "@/service/loans";

export const useGetAllLoans = (params: LoanPaginationParams = {}) => {
  const { 
    page = 0, 
    size = 10, 
    sortBy = "startDate", 
    direction = "asc", 
    status = "ACTIVE" 
  } = params;

  const { isLoading, data, error } = useQuery<PaginatedResponse<LoanModel>>({
    queryKey: ["loans", page, size, sortBy, direction, status],
    queryFn: () => getAllLoans({ page, size, sortBy, direction, status }),
    staleTime: 5 * 60 * 1000, // Los datos son válidos durante 5 minutos
    refetchOnWindowFocus: false, // No recargar los datos cuando el usuario regresa a la ventana
  });

  return { isLoading, data, error };
};

export const useCreateLoan = () => {
  const queryClient = useQueryClient();
  const { mutate: createLoanMutation, isPending: isCreating, error: createError } = useMutation({
    mutationFn: (loanData: CreateLoanModel) => createLoan(loanData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["loans"] });
    },
    onError: (error) => {
      console.error("Error creating loan:", error);
    },
  });

  return { createLoanMutation, isCreating, createError };
};

export const useUpdateLoan = () => {
  const queryClient = useQueryClient();
  const { mutate: updateLoanMutation, isPending: isUpdating, error: updateError } = useMutation({
    mutationFn: ({ loanId, loanData }: { loanId: string, loanData: UpdateLoanModel }) => 
      updateLoanById(loanId, loanData),
    onSuccess: (updatedLoan) => {
      queryClient.invalidateQueries({ queryKey: ["loans", updatedLoan.loanId] });
      queryClient.invalidateQueries({ queryKey: ["loans"] });
    },
    onError: (error) => {
      console.error("Error updating loan:", error);
    },
  });

  return { updateLoanMutation, isUpdating, updateError };
};

export const useMarkLoanAsDelivered = () => {
  const queryClient = useQueryClient();
  const { mutate: markAsDeliveredMutation, isPending: isDelivering, error: deliverError } = useMutation({
    mutationFn: (loanId: string) => markLoanAsDelivered(loanId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["loans"] });
    },
    onError: (error) => {
      console.error("Error marking loan as delivered:", error);
    },
  });

  return { markAsDeliveredMutation, isDelivering, deliverError };
};

export const useGetLoansByUserDni = (
  dni: string,
  page: number = 0,
  size: number = 10,
  sortBy: string = "startDate",
  direction: string = "asc"
) => {
  const { data, isLoading, error } = useQuery<PaginatedResponse<LoanModel>>({
    queryKey: ["loans", "user", dni, page, size, sortBy, direction],
    queryFn: () => getLoansByUserDni(dni, page, size, sortBy, direction),
    staleTime: 5 * 60 * 1000,
    enabled: !!dni, // Don't make the request if no dni is provided
  });

  return { data, isLoading, error };
};

export const useGetLoansCount = () => {
  const { data, isLoading, error } = useQuery<number>({
    queryKey: ["loans", "count"],
    queryFn: () => getLoansCount(),
    staleTime: 5 * 60 * 1000,
  });

  return { data, isLoading, error };
};

export const useGetActiveBookCopies = (bookId: string) => {
  const { data, isLoading, error } = useQuery<string[]>({
    queryKey: ["books", bookId, "active-copies"],
    queryFn: () => getActiveBookCopies(bookId),
    staleTime: 5 * 60 * 1000,
    enabled: !!bookId, // Don't make the request if no bookId is provided
  });

  return { data, isLoading, error };
};

export const useDeleteLoan = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteLoanMutation, isPending: isDeleting, error: deleteError } = useMutation({
    mutationFn: (loanId: string) => deleteLoanById(loanId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["loans"] });
    },
    onError: (error) => {
      console.error("Error deleting loan:", error);
    },
  });

  return { deleteLoanMutation, isDeleting, deleteError };
};