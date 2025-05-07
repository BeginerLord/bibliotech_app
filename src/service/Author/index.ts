import { bibliotechapi } from "@/api/api";
import { AuthorModel, AuthorModelDto, UpdateAuthorModel } from "@/models/author_model";
import { PaginatedResponse } from "@/models/PaginatedResponse";


export const getAllAuthor = async (page: number = 0, size: number = 10, sortBy: string = "name", direction: string = "asc") => {
    const url = `/author?page=${page}&size=${size}&sortBy=${sortBy}&direction=${direction}`;
    const { data } = await bibliotechapi.get(url);

    return data as PaginatedResponse<AuthorModel>;
}

export const saveAuthor = async (category: UpdateAuthorModel) => {
    const { data } = await bibliotechapi.post("/author", category);
    return data as AuthorModel;
}

export const updateAuthorByUuid = async (uuid: string, author: UpdateAuthorModel) => {
    const { data } = await bibliotechapi.put(`/author/update/${uuid}`, author);
    return data as AuthorModelDto;
}


export const getAuthorByUuid = async (uuid: string) => {
    const { data } = await bibliotechapi.get(`/author/uuid/${uuid}`);
    return data as AuthorModel;
}
export const getAuthorByName = async (fullName: string) => {
    const { data } = await bibliotechapi.get(`/author/fullName/${fullName}`);
    return data as AuthorModel;
}




export const deleteAuthortByUuid = async (uuid: string) => {
    const { data } = await bibliotechapi.delete(`/author/${uuid}`);
    return data;
}