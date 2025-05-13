export interface LoanModel {
  loanId: string;
  userCedula: string;
  nameBook: string;
  copyId: string;
  startDate: string;    // formato "YYYY-MM-DD"
  dueDate: string;      // formato "YYYY-MM-DD"
  returnDate?: string;  // formato "YYYY-MM-DD", opcional
  statusEntity: string; // "ACTIVE" | "ARCHIVED"
}

export interface CreateLoanModel {
  userCedula: string;
  copyId: string;
  startDate: string;    // formato "YYYY-MM-DD"
  dueDate: string;      // formato "YYYY-MM-DD"
}

export interface UpdateLoanModel {
  dueDate: string;      // formato "YYYY-MM-DD"
  returnDate?: string;  // formato "YYYY-MM-DD", opcional
}

export interface LoanPaginationParams {
  page?: number;        // default: 0
  size?: number;        // default: 10
  sortBy?: string;      // default: "startDate"
  direction?: string;   // default: "asc"
  status?: string;      // default: "ACTIVE"
}

