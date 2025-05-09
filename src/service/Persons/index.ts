import { bibliotechapi } from "@/api/api";

import { PaginatedResponse } from "@/models/PaginatedResponse";
import { PersonModelDto, UpdatePersonModel } from "@/models/persons_model";

export const getAllPersonsActive = async (
    page: number = 0,
    size: number = 10,
    sortBy: string = "email", // campo por el que ordenar
    direction: string = "asc", // dirección de ordenación (ascendente o descendente)
    statusEntity: string = "ACTIVE" // estado del libro (por ejemplo, ACTIVE o INACTIVE)
): Promise<PaginatedResponse<PersonModelDto>> => {
    const url = `/user?page=${page}&size=${size}&sortBy=${sortBy}&direction=${direction}&statusEntity=${statusEntity}`;
    const { data } = await bibliotechapi.get(url);
    return data as PaginatedResponse<PersonModelDto>;
};
export const getAllPersonsInactive = async (
    page: number = 0,
    size: number = 10,
    sortBy: string = "email", // campo por el que ordenar
    direction: string = "asc", // dirección de ordenación (ascendente o descendente)
    statusEntity: string = "ARCHIVED" // estado del libro (por ejemplo, ACTIVE o INACTIVE)
): Promise<PaginatedResponse<PersonModelDto>> => {
    const url = `/user?page=${page}&size=${size}&sortBy=${sortBy}&direction=${direction}&statusEntity=${statusEntity}`;
    const { data } = await bibliotechapi.get(url);
    return data as PaginatedResponse<PersonModelDto>;
};
export const updatePersonByDni = async (
    dni: string,
    personData: UpdatePersonModel
): Promise<PersonModelDto> => {
    const { data } = await bibliotechapi.put(`/user/update/${dni}`, personData);
    return data as PersonModelDto;
};

export const createPerson = async (
    personData: PersonModelDto
): Promise<PersonModelDto> => {
    const { data } = await bibliotechapi.post("/user", personData);
    return data as PersonModelDto;
};

export const searchyUserByEmail = async (email: string): Promise<PersonModelDto> => {
    const { data } = await bibliotechapi.get(`/user/email/${email}`);
    return data as PersonModelDto;
};

export const searchyUserByDni = async (dni: string): Promise<PersonModelDto> => {
    const { data } = await bibliotechapi.get(`/user/dni/${dni}`);
    return data as PersonModelDto;
};

export const updateStatusActiveByEmail = async (email: string): Promise<PersonModelDto> => {
    const { data } = await bibliotechapi.put(`/user/updateStatusActive/${email}`);
    return data as PersonModelDto;
}

export const updateStatusInactiveByEmail = async (email: string): Promise<PersonModelDto> => {
    const { data } = await bibliotechapi.put(`/user/updateStatusInactive/${email}`);
    return data as PersonModelDto;
}



