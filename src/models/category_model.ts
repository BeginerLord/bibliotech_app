export interface CategoryModel {
    uuid: string,
    description: string,
    name: string
}


export type CategoryModelDto = Omit<CategoryModel, "uuid">;
export type UpdateCategoryModel = Partial<CategoryModel>;