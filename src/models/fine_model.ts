export interface FineModel {
  id: string;
  loanId: string;
  userDni: string;
  amount: number;
  /** ajusta el literal-type a los estados que manejes en tu sistema */
  status: string;
  /** ISO-8601 (yyyy-MM-dd) o Date si luego lo parseas */
  issuedDate: string;
}

export type FineModelDto = Omit<FineModel, "uuid">;
export type UpdateFineModel = Partial<FineModel>;
export interface FineCount {
    count:string
}