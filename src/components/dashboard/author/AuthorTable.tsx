"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Loader2 } from "lucide-react"
import { useCreateAuthor, useGetAllAuthors, useUpdateAuthors, useDeleAuthorByUuid } from "@/hooks/Author"
import { AuthorModel, CreateAuthorDto, UpdateAuthorModel } from "@/models/author_model"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import AuthorTableHeader from "./AuthorTableHeader"
import AuthorTableRow from "./AuthorTableRow"
import AuthorTablePagination from "./AuthorTablePagination"
import SaveAuthorModal from "./SaveAuthorModal"
import EditAuthorModal from "./EditAuthorModal"
import DeleteAuthorModal from "./DeleteAuthorModal"

export default function AuthorTable() {
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(10)
  const [sortField, setSortField] = useState("fullName")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusEntity, setStatusEntity] = useState<"ACTIVE" | "INACTIVE">("ACTIVE")

  // Estado para el modal de creación
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  // Estado para el modal de edición
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [currentAuthor, setCurrentAuthor] = useState<AuthorModel | null>(null)
  const [editFormData, setEditFormData] = useState<UpdateAuthorModel>({})

  // Estado para el modal de confirmación de eliminación
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [authorToDelete, setAuthorToDelete] = useState<AuthorModel | null>(null)

  const { isLoading, data } = useGetAllAuthors(page, size, sortField, sortDirection, statusEntity)
  const { useDeleAuthorMutation, isPending: isDeleting } = useDeleAuthorByUuid()
  const { updateAuthorMutate, isPending: isUpdating } = useUpdateAuthors()
  const { createAuthorMutation, isPending: isCreating } = useCreateAuthor()

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Función para abrir el modal de nuevo autor
  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true)
  }

  // Función para crear un nuevo autor
  const handleCreateAuthor = async (author: CreateAuthorDto) => {
    try {
      await createAuthorMutation(author)
      setIsCreateModalOpen(false)
      alert("Autor creado correctamente")
    } catch (error) {
      console.error("Error al crear el autor:", error)
      alert("Error al crear el autor")
    }
  }

  // Abrir modal de edición
  const handleEdit = (author: AuthorModel) => {
    setCurrentAuthor(author)
    setEditFormData({ ...author })
    setIsEditModalOpen(true)
  }

  // Manejar cambios en el formulario de edición
  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditFormData({
      ...editFormData,
      [name]: value,
    })
  }

  // Guardar cambios de edición
  const handleSaveEdit = async () => {
    if (!currentAuthor || !editFormData) return

    try {
      await updateAuthorMutate({
        uuid: currentAuthor.uuid,
        author: editFormData as AuthorModel
      })
      setIsEditModalOpen(false)
      alert("Autor actualizado correctamente")
    } catch (error) {
      alert("Error al actualizar el autor")
      console.error("Error al actualizar el autor:", error)
    }
  }

  // Abrir modal de confirmación de eliminación
  const handleDeleteClick = (author: AuthorModel) => {
    setAuthorToDelete(author)
    setIsDeleteModalOpen(true)
  }

  // Confirmar eliminación
 const handleConfirmDelete = async () => {
    if (!authorToDelete) return

    try {
      await useDeleAuthorMutation(authorToDelete.uuid)
      setIsDeleteModalOpen(false)
      toast.success("El autor se ha eliminado correctamente", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    } catch (error: any) {
      setIsDeleteModalOpen(false)
      
      // Mejorar la detección de errores de integridad referencial
      const errorMsg = error?.message || "Error desconocido"
      
      if (errorMsg.includes("relacionad con libros") || 
          errorMsg.toLowerCase().includes("integrity") || 
          errorMsg.toLowerCase().includes("constraint")) {
        toast.error("No se puede eliminar el autor porque tiene libros asociados. Debe eliminar los libros primero.", {
          position: "top-right",
          autoClose: 6000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          icon: <span role="img" aria-label="locked">🔒</span>,
        })
      } else {
        toast.error(`Error al eliminar el autor: ${errorMsg}`, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
      }
      console.error("Error al eliminar autor:", error)
    }
  }

  // Filtra los autores según el término de búsqueda
  const filteredAuthors = data?.content?.filter(
    (author) =>
      author.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      author.nationality.toLowerCase().includes(searchTerm.toLowerCase())
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
     <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <AuthorTableHeader
          searchTerm={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          onCreateClick={handleOpenCreateModal}
        />

        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex justify-center items-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
              <span className="ml-2 text-gray-600">Cargando autores...</span>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("fullName")}
                  >
                    <div className="flex items-center">
                      Nombre
                      {sortField === "fullName" &&
                        (sortDirection === "asc" ? <ChevronUp size={15} /> : <ChevronDown size={15} />)}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("nationality")}
                  >
                    <div className="flex items-center">
                      Nacionalidad
                      {sortField === "nationality" &&
                        (sortDirection === "asc" ? <ChevronUp size={15} /> : <ChevronDown size={15} />)}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("birthDate")}
                  >
                    <div className="flex items-center">
                      Fecha de Nacimiento
                      {sortField === "birthDate" &&
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
                {filteredAuthors.length > 0 ? (
                  filteredAuthors.map((author) => (
                    <AuthorTableRow
                      key={author.uuid}
                      author={author}
                      onEdit={handleEdit}
                      onDelete={handleDeleteClick}
                      isUpdating={isUpdating}
                      isDeleting={isDeleting}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-10 text-center text-gray-500">
                      No se encontraron autores
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        <AuthorTablePagination
          page={page}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
          filteredCount={filteredAuthors.length}
          totalElements={data?.totalElements || 0}
          isLastPage={!data || data.last}
        />
      </div>

      {/* Modals */}
      <SaveAuthorModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleCreateAuthor}
        isCreating={isCreating}
      />

      <EditAuthorModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveEdit}
        author={currentAuthor}
        formData={editFormData}
        onChange={handleEditFormChange}
        isUpdating={isUpdating}
      />

      <DeleteAuthorModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        author={authorToDelete}
        isDeleting={isDeleting}
      />
    </>
  )
}