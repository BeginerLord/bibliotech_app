import { bibliotechapi } from "@/api/api";
import { FineCount, FineModelDto } from "@/models/fine_model";
import { PaginatedResponse } from "@/models/PaginatedResponse";

export const getAllFines = async (page: number = 0,
    size: number = 10,
    sortBy: string = "issuedDate",
    direction: string = "asc",
    status?: string): Promise<PaginatedResponse<FineModelDto>> => {
    const url = `/fines?page=${page}&size=${size}&sortBy=${sortBy}&direction=${direction}&status=${status}`;
    const { data } = await bibliotechapi.get(url);
    return data as PaginatedResponse<FineModelDto>;
};

export const saveFines = async () => {
    const { data } = await bibliotechapi.post("/fines");
    return data as FineModelDto;
};


export const getFinesByDni = async (dni: string) => {
    const { data } = await bibliotechapi.get(`/fines/user/${dni}`);
    return data as FineModelDto;
};


export const getCountFines = async () => {
    const { data } = await bibliotechapi.get(`/fines/count/active`);
    return data as FineCount;
};


export const deleteFinesByFineId = async (fineId: string) => {
    const { data } = await bibliotechapi.delete(`/fines/${fineId}/pay`);
    return data;
};
