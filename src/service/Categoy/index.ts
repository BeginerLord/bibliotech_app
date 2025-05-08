import { bibliotechapi } from "@/api/api";
import { CategoryModel, CategoryModelDto } from "@/models/category_model";
import { PaginatedResponse } from "@/models/PaginatedResponse";

export const getAllCategories = async (
  page: number = 0,
  size: number = 10,
  sortBy: string = "name",
  direction: string = "asc"
) => {
  const url = `/category?page=${page}&size=${size}&sortBy=${sortBy}&direction=${direction}`;
  const { data } = await bibliotechapi.get(url);

  return data as PaginatedResponse<CategoryModel>;
};

export const saveCategory = async (category: CategoryModelDto) => {
  const { data } = await bibliotechapi.post("/category", category);
  return data as CategoryModel;
};

export const updateCategoryByUuid = async (
  uuid: string,
  category: CategoryModelDto
) => {
  const { data } = await bibliotechapi.put(
    `/category/update/${uuid}`,
    category
  );
  return data as CategoryModel;
};

export const getCategoryByUuid = async (uuid: string) => {
  const { data } = await bibliotechapi.get(`/category/uuid/${uuid}`);
  return data as CategoryModel;
};
export const getCategoryByName = async (name: string) => {
  const { data } = await bibliotechapi.get(`/category/name/${name}`);
  return data as CategoryModel;
};

export const getCategoryByDescription = async (description: string) => {
  const { data } = await bibliotechapi.get(
    `/category/description/${description}`
  );
  return data as CategoryModel;
};

export const deleteCategoryByUuid = async (uuid: string) => {
  const { data } = await bibliotechapi.delete(`/category/${uuid}`);
  return data;
};
