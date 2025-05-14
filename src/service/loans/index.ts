import { bibliotechapi } from "@/api/api";
import {
  LoanModel,
  CreateLoanModel,
  UpdateLoanModel,
  LoanPaginationParams
} from "@/models/loans_model";
import { PaginatedResponse } from "@/models/PaginatedResponse";

export const getAllLoans = async ({
  page = 0,
  size = 10,
  sortBy = "startDate",
  direction = "asc",
  status = "ACTIVE"
}: LoanPaginationParams = {}): Promise<PaginatedResponse<LoanModel>> => {
  const url = `/loan?page=${page}&size=${size}&sortBy=${sortBy}&direction=${direction}&status=${status}`;
  const { data } = await bibliotechapi.get(url);
  return data as PaginatedResponse<LoanModel>;
};


export const createLoan = async (
  loanData: CreateLoanModel
): Promise<LoanModel> => {
  const { data } = await bibliotechapi.post("/loan", loanData);
  return data as LoanModel;
};

export const updateLoanById = async (
  loanId: string,
  loanData: UpdateLoanModel
): Promise<LoanModel> => {
  const { data } = await bibliotechapi.put(`/loan/${loanId}`, loanData);
  return data as LoanModel;
};

export const markLoanAsDelivered = async (loanId: string): Promise<void> => {
  await bibliotechapi.put(`/loan/${loanId}/deliver`);
};


export const getLoansByUserDni = async (
  dni: string,
  page: number = 0,
  size: number = 10,
  sortBy: string = "startDate",
  direction: string = "asc"
): Promise<PaginatedResponse<LoanModel>> => {
  const url = `/loan/user/${dni}?page=${page}&size=${size}&sortBy=${sortBy}&direction=${direction}`;
  const { data } = await bibliotechapi.get(url);
  return data as PaginatedResponse<LoanModel>;
};


export const getLoansCount = async (): Promise<number> => {
  const { data } = await bibliotechapi.get("/loan/count");
  return data as number;
};

export const getActiveBookCopies = async (bookId: string): Promise<string[]> => {
  const { data } = await bibliotechapi.get(`/book/${bookId}/active-copies`);
  return data as string[];
};

export const deleteLoanById = async (loanId: string): Promise<void> => {
  await bibliotechapi.delete(`/loan/delete/${loanId}`);
};

