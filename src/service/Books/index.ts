import { bibliotechapi } from "@/api/api";
import {
  BookModel,
  CreateBookModel,
  UpdateBookModel,
} from "@/models/book_model";
import { PaginatedResponse } from "@/models/PaginatedResponse";

export const getAllBooks = async (
  page: number = 0,
  size: number = 10,
  sortBy: string = "title", // campo por el que ordenar
  direction: string = "asc", // dirección de ordenación (ascendente o descendente)
  statusEntity: string = "ACTIVE" // estado del libro (por ejemplo, ACTIVE o INACTIVE)
): Promise<PaginatedResponse<BookModel>> => {
  const url = `/book?page=${page}&size=${size}&sortBy=${sortBy}&direction=${direction}&statusEntity=${statusEntity}`;
  const { data } = await bibliotechapi.get(url);
  return data as PaginatedResponse<BookModel>;
};

export const updateBookByUuid = async (
  uuid: string,
  bookData: UpdateBookModel
): Promise<BookModel> => {
  const { data } = await bibliotechapi.put(`/book/update/${uuid}`, bookData);
  return data as BookModel;
};

export const createBook = async (
  bookData: CreateBookModel
): Promise<BookModel> => {
  const { data } = await bibliotechapi.post("/book", bookData);
  return data as BookModel;
};

export const searchBooksByTitle = async (
  title: string,
  page: number = 0,
  size: number = 10,
  sortBy: string = "title",
  direction: string = "asc"
): Promise<PaginatedResponse<BookModel>> => {
  const url = `/book/search/${title}?page=${page}&size=${size}&sortBy=${sortBy}&direction=${direction}`;
  const { data } = await bibliotechapi.get(url);
  return data as PaginatedResponse<BookModel>;
};

export const getBookByUuid = async (uuid: string): Promise<BookModel> => {
  const { data } = await bibliotechapi.get(`/book/findByUuid/${uuid}`);
  return data as BookModel;
};

export const deleteBookByUuid = async (uuid: string): Promise<void> => {
  await bibliotechapi.delete(`/book/${uuid}`);
};
