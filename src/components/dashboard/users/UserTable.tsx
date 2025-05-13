"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Loader2 } from "lucide-react"
import { UserModel } from "@/models/persons_model"
import { 
  useCreateUser, 
  useUpdateUser, 
  useGetAllUsersActive, 
  useGetAllUsersInactive,
  useUpdateStatusUserActive, 
  useUpdateStatusUserInactive 
} from "@/hooks/Person" // Cambiado de @/hooks/Person a @/hooks/User

import UserTableHeader from "./UserTableHeader"
import UserTableRow from "./UserTableRow"
import SaveUserModal from "./SaveUserModal"
import EditUserModal from "./EditUserModal"

import UserTablePagination from "./UserTablePagination"
import DeactivateUserModal from "./DesactiveUserModal" 
import ActivateUserModal from "./ActiveUserModal" 

export default function UserTable() {
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(10)
  const [sortField, setSortField] = useState("firstName")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [searchTerm, setSearchTerm] = useState("")
  const [showInactive, setShowInactive] = useState(false)
  
  // Estado para los modales
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isActivateModalOpen, setIsActivateModalOpen] = useState(false)
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false)
  
  // Estado para los usuarios seleccionados
  const [currentUser, setCurrentUser] = useState<UserModel | null>(null)
  const [editFormData, setEditFormData] = useState<Partial<UserModel>>({})
  
  // Obtener datos de usuarios según el estado seleccionado
  const { 
    isLoading, 
    data: userData 
  } = showInactive 
    ? useGetAllUsersInactive(page, size, sortField, sortDirection) // Ya usa ARCHIVED internamente
    : useGetAllUsersActive(page, size, sortField, sortDirection)
  
  // Mutations para las acciones
  const { createUserMutation, isCreating } = useCreateUser()
  const { updateUserMutation, isUpdating } = useUpdateUser()
  const { updateStatusUserActiveMutation, isStatusActive } = useUpdateStatusUserActive()
  const { updateStatusUserInactiveMutation, isStatusInactive } = useUpdateStatusUserInactive()
  
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }
  
  // Función para abrir el modal de crear usuario
  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true)
  }

  // Función para crear un nuevo usuario
  const handleCreateUser = async (userData: UserModel) => {
    try {
      await createUserMutation({
        ...userData,
        status: "ACTIVE" // Cambiado de statusEntity a status
      })
      setIsCreateModalOpen(false)
      alert("Usuario creado correctamente")
    } catch (error) {
      console.error("Error al crear usuario:", error)
      alert("Error al crear el usuario")
    }
  }

  // Abrir modal de edición
  const handleEdit = (user: UserModel) => {
    setCurrentUser(user)
    setEditFormData({ ...user })
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
  
  // Manejar cambios en checkboxes del formulario
  const handleCheckboxChange = (name: string, checked: boolean) => {
    setEditFormData({
      ...editFormData,
      [name]: checked ? "ACTIVE" : "ARCHIVED", // Cambiado de INACTIVE a ARCHIVED
    })
  }
  
  // Guardar cambios de edición
  const handleSaveEdit = async () => {
    if (!currentUser || !editFormData) return
    
    try {
      await updateUserMutation({ 
        dni: currentUser.dni, 
        userData: {
          firstName: editFormData.firstName || "", 
          lastName: editFormData.lastName || "", 
          email: editFormData.email || "", 
          phoneNumber: editFormData.phoneNumber || "", 
          address: editFormData.address || "", 
        }
      })
      setIsEditModalOpen(false)
      alert("Usuario actualizado correctamente")
    } catch (error) {
      alert("Error al actualizar el usuario")
      console.error("Error al actualizar el usuario:", error)
    }
  }
  
  // Abrir modal para desactivar usuario
  const handleDeactivateClick = (user: UserModel) => {
    setCurrentUser(user)
    setIsDeactivateModalOpen(true)
  }
  
  // Abrir modal para activar usuario
  const handleActivateClick = (user: UserModel) => {
    setCurrentUser(user)
    setIsActivateModalOpen(true)
  }
  
  // Confirmar desactivación
  const handleConfirmDeactivate = async () => {
    if (!currentUser) return
    
    try {
      await updateStatusUserInactiveMutation({ email: currentUser.email })
      setIsDeactivateModalOpen(false)
      alert("El usuario ha sido desactivado correctamente")
    } catch (error) {
      alert("Error: No se pudo desactivar al usuario")
      console.error("Error al desactivar usuario:", error)
    }
  }
  
  // Confirmar activación
  const handleConfirmActivate = async () => {
    if (!currentUser) return
    
    try {
      await updateStatusUserActiveMutation({ email: currentUser.email })
      setIsActivateModalOpen(false)
      alert("El usuario ha sido activado correctamente")
    } catch (error) {
      alert("Error: No se pudo activar al usuario")
      console.error("Error al activar usuario:", error)
    }
  }
  
  // Filtra los usuarios según el término de búsqueda
  const filteredUsers = userData?.content?.filter(
    (user) =>
      user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.dni?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || []

  // Navegación de páginas
  const handlePrevPage = () => {
    if (page > 0) {
      setPage(page - 1)
    }
  }

  const handleNextPage = () => {
    if (userData && !userData.last) {
      setPage(page + 1)
    }
  }
  
  const toggleUserView = () => {
    setShowInactive(!showInactive)
    setPage(0) // Reiniciar la paginación al cambiar la vista
  }

  return (
    <>
      <div className="mb-4 flex justify-end">
        <button 
          onClick={toggleUserView}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium bg-white hover:bg-gray-50"
        >
          {showInactive ? "Mostrar usuarios activos" : "Mostrar usuarios archivados"}
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <UserTableHeader 
          searchTerm={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          onCreateClick={handleOpenCreateModal}
        />

        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex justify-center items-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
              <span className="ml-2 text-gray-600">Cargando usuarios...</span>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("firstName")}
                  >
                    <div className="flex items-center">
                      Nombre
                      {sortField === "firstName" &&
                        (sortDirection === "asc" ? <ChevronUp size={15} /> : <ChevronDown size={15} />)}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("dni")}
                  >
                    <div className="flex items-center">
                      DNI
                      {sortField === "dni" &&
                        (sortDirection === "asc" ? <ChevronUp size={15} /> : <ChevronDown size={15} />)}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("phoneNumber")}
                  >
                    <div className="flex items-center">
                      Teléfono
                      {sortField === "phoneNumber" &&
                        (sortDirection === "asc" ? <ChevronUp size={15} /> : <ChevronDown size={15} />)}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Dirección
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Estado
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
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <UserTableRow
                      key={user.dni}
                      user={user}
                      onEdit={handleEdit}
                      onActivate={user.status === "ARCHIVED" ? handleActivateClick : undefined}
                      onDeactivate={user.status === "ACTIVE" ? handleDeactivateClick : undefined}
                      isUpdating={isUpdating && currentUser?.dni === user.dni}
                      isDeleting={false}
                      isChangingStatus={
                        (isStatusActive && currentUser?.dni === user.dni) || 
                        (isStatusInactive && currentUser?.dni === user.dni)
                      }
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                      No se encontraron usuarios
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        <UserTablePagination
          page={page}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
          filteredCount={filteredUsers.length}
          totalElements={userData?.totalElements || 0}
          isLastPage={!userData || userData.last}
        />
      </div>

      {/* Modales */}
      <SaveUserModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleCreateUser}
        isCreating={isCreating}
      />

      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveEdit}
        user={currentUser}
        formData={editFormData}
        onChange={handleEditFormChange}
        onCheckboxChange={handleCheckboxChange}
        isUpdating={isUpdating}
      />

      <ActivateUserModal
        isOpen={isActivateModalOpen}
        onClose={() => setIsActivateModalOpen(false)}
        onConfirm={handleConfirmActivate}
        user={currentUser}
        isProcessing={isStatusActive}
      />

      <DeactivateUserModal
        isOpen={isDeactivateModalOpen}
        onClose={() => setIsDeactivateModalOpen(false)}
        onConfirm={handleConfirmDeactivate}
        user={currentUser}
        isProcessing={isStatusInactive}
      />
    </>
  )
}