import { bibliotechapi } from "@/api/api";
import { UserModel, UserModelDto, UpdateUserModel, CountUserDto } from "@/models/persons_model";
import { PaginatedResponse } from "@/models/PaginatedResponse";

export const getAllUsersActive = async (
    page: number = 0,
    size: number = 10,
    sortBy: string = "email", 
    direction: string = "asc", 
    status: string = "ACTIVE"
): Promise<PaginatedResponse<UserModelDto>> => {
    const url = `/user?page=${page}&size=${size}&sortBy=${sortBy}&direction=${direction}&status=${status}`;
    const { data } = await bibliotechapi.get(url);
    return data as PaginatedResponse<UserModelDto>;
};

export const getAllUsersInactive = async (
    page: number = 0,
    size: number = 10,
    sortBy: string = "email",
    direction: string = "asc", 
    status: string = "ARCHIVED" 
): Promise<PaginatedResponse<UserModelDto>> => {
    const url = `/user?page=${page}&size=${size}&sortBy=${sortBy}&direction=${direction}&status=${status}`;
    const { data } = await bibliotechapi.get(url);
    return data as PaginatedResponse<UserModelDto>;
};

export const updateUserByDni = async (
    dni: string,
    userData: UpdateUserModel
): Promise<UserModelDto> => {
    const { data } = await bibliotechapi.put(`/user/update/${dni}`, userData);
    return data as UserModelDto;
};

export const createUser = async (
    userData: UserModel
): Promise<UserModelDto> => {
    // Aseguramos que el usuario se crea con estado ACTIVE
    const newUser = {
        ...userData,
        statusEntity: "ACTIVE"
    };
    const { data } = await bibliotechapi.post("/user", newUser);
    return data as UserModelDto;
};

export const searchUserByEmail = async (email: string): Promise<UserModelDto> => {
    const { data } = await bibliotechapi.get(`/user/email/${email}`);
    return data as UserModelDto;
};

export const searchUserByDni = async (dni: string): Promise<UserModelDto> => {
    const { data } = await bibliotechapi.get(`/user/dni/${dni}`);
    return data as UserModelDto;
};

export const updateStatusActiveByEmail = async (email: string): Promise<UserModelDto> => {
    const { data } = await bibliotechapi.put(`/user/updateStatusActive/${email}`);
    return data as UserModelDto;
};

export const updateStatusInactiveByEmail = async (email: string): Promise<UserModelDto> => {
    const { data } = await bibliotechapi.put(`/user/updateStatusInactive/${email}`);
    return data as UserModelDto;
};

export const getCountUserActive = async()=>{
    const {data}= await bibliotechapi.get(`/user/count/active`);
    return data as CountUserDto;
}