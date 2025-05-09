"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Loader2 } from "lucide-react"
import { useCreateCategory, useDeleteCategoryByUuid, useGetAllCategory, useUpdateCategory } from "@/hooks/Category"
import { CategoryModel } from "@/models/category_model"

import CategoryTableHeader from "./CategoryTableHeader"
import CategoryTableRow from "./CategoryTableRow"
import EditCategoryModal from "./EditCategoryModal"
import DeleteCategoryModal from "./DeleteCategoryModal"
import CategoryTablePagination from "./CategoryTablePagination"
import SaveCategoryModal from "./SaveCategoryModal"

export default function CategoryTable() {
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(10)
  const [sortField, setSortField] = useState("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [searchTerm, setSearchTerm] = useState("")

  // Estado para el modal de creación
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  // Estado para el modal de edición
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [currentCategory, setCurrentCategory] = useState<CategoryModel | null>(null)
  const [editFormData, setEditFormData] = useState<Partial<CategoryModel>>({})
  
  // Estado para el modal de confirmación de eliminación
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState<CategoryModel | null>(null)
  
  const { isLoading, data } = useGetAllCategory(page, size, sortField, sortDirection)
  const { deleteCategoryMutate, isDeleting } = useDeleteCategoryByUuid()
  const { updateCategoryMutate, isUpdating } = useUpdateCategory()
  const { createCategoryMutation, isCreating } = useCreateCategory()
  
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Función para abrir el modal de nueva categoría
  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true)
  }

    // Función para crear una nueva categoría
  const handleCreateCategory = async (category: CategoryModel) => {
    try {
      await createCategoryMutation(category)
      setIsCreateModalOpen(false)
      alert("Categoría creada correctamente")
    } catch (error) {
      console.error("Error al crear la categoría:", error)
      alert("Error al crear la categoría")
    }
  }

  // Abrir modal de edición
  const handleEdit = (category: CategoryModel) => {
    setCurrentCategory(category)
    setEditFormData({ ...category })
    setIsEditModalOpen(true)
  }
  
  // Manejar cambios en el formulario de edición
  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditFormData({
      ...editFormData,
      [name]: value,
    })
  }
  
  // Guardar cambios de edición
  const handleSaveEdit = async () => {
    if (!currentCategory || !editFormData || !editFormData.name || !editFormData.description) return
    
    try {
      await updateCategoryMutate({ 
        uuid: currentCategory.uuid, 
        category: editFormData as CategoryModel 
      })
      setIsEditModalOpen(false)
      alert("Categoría actualizada correctamente")
    } catch (error) {
      alert("Error al actualizar la categoría")
      console.error("Error al actualizar la categoría:", error)
    }
  }
  
  // Abrir modal de confirmación de eliminación
  const handleDeleteClick = (category: CategoryModel) => {
    setCategoryToDelete(category)
    setIsDeleteModalOpen(true)
  }

  // Confirmar eliminación
  const handleConfirmDelete = async () => {
    if (!categoryToDelete) return
    
    try {
      await deleteCategoryMutate(categoryToDelete.uuid)
      setIsDeleteModalOpen(false)
      alert("La categoría se ha eliminado correctamente")
    } catch (error) {
      alert("Error: No se pudo eliminar la categoría")
      console.error("Error al eliminar categoría:", error)
    }
  }

  // Filtra las categorías según el término de búsqueda
  const filteredCategories = data?.content?.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase())
  ) || []

  const handlePrevPage = () => {
    if (page > 0) {
      setPage(page - 1)
    }
  }

  const handleNextPage = () => {
    if (data && !data.last) {
      setPage(page + 1)
    }
  }
  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <CategoryTableHeader 
          searchTerm={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
           onCreateClick={handleOpenCreateModal}
        />

        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex justify-center items-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
              <span className="ml-2 text-gray-600">Cargando categorías...</span>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("name")}
                  >
                    <div className="flex items-center">
                      Nombre
                      {sortField === "name" &&
                        (sortDirection === "asc" ? <ChevronUp size={15} /> : <ChevronDown size={15} />)}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("description")}
                  >
                    <div className="flex items-center">
                      Descripción
                      {sortField === "description" &&
                        (sortDirection === "asc" ? <ChevronUp size={15} /> : <ChevronDown size={15} />)}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((category) => (
                    <CategoryTableRow
                      key={category.uuid}
                      category={category}
                      onEdit={handleEdit}
                      onDelete={handleDeleteClick}
                      isUpdating={isUpdating}
                      isDeleting={isDeleting}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-10 text-center text-gray-500">
                      No se encontraron categorías
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        <CategoryTablePagination
          page={page}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
          filteredCount={filteredCategories.length}
          totalElements={data?.totalElements || 0}
          isLastPage={!data || data.last}
        />
      </div>

      {/* Modals */}
       <SaveCategoryModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleCreateCategory}
        isCreating={isCreating}
      />

      <EditCategoryModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveEdit}
        category={currentCategory}
        formData={editFormData}
        onChange={handleEditFormChange}
        isUpdating={isUpdating}
      />

      <DeleteCategoryModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        category={categoryToDelete}
        isDeleting={isDeleting}
      />
    </>
  )
}