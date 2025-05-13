import { Edit, Eye, Loader2, Trash2, CheckCircle } from "lucide-react"
import { UserModel } from "@/models/persons_model"

type UserTableRowProps = {
  user: UserModel
  onEdit: (user: UserModel) => void
  onDelete?: (user: UserModel) => void
  onActivate?: (user: UserModel) => void
  onDeactivate?: (user: UserModel) => void
  isUpdating: boolean
  isDeleting: boolean
  isChangingStatus: boolean
}

export default function UserTableRow({
  user,
  onEdit,
  onDelete,
  onActivate,
  onDeactivate,
  isUpdating,
  isDeleting,
  isChangingStatus,
}: UserTableRowProps) {
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="font-medium text-gray-900">{user.firstName} {user.lastName}</div>
        <div className="text-sm text-gray-500">{user.email}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-gray-700">{user.dni}</td>
      <td className="px-6 py-4 whitespace-nowrap text-gray-700">{user.phoneNumber}</td>
      <td className="px-6 py-4">
        <div className="truncate max-w-[200px] text-gray-700">{user.address}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {user.status === "ACTIVE" ? (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
            Activo
          </span>
        ) : (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
            Archivado
          </span>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex justify-end space-x-2">
          <button className="p-1 rounded-full hover:bg-gray-100" title="Ver detalles">
            <Eye size={18} className="text-gray-500" />
          </button>
          
          <button 
            className="p-1 rounded-full hover:bg-gray-100" 
            title="Editar"
            onClick={() => onEdit(user)}
            disabled={isUpdating}
          >
            {isUpdating ? 
              <Loader2 size={18} className="text-blue-500 animate-spin" /> : 
              <Edit size={18} className="text-blue-500" />
            }
          </button>
          
          {user.status === "ACTIVE" && onDeactivate && (
            <button 
              className="p-1 rounded-full hover:bg-gray-100" 
              title="Archivar" 
              onClick={() => onDeactivate(user)}
              disabled={isChangingStatus}
            >
              {isChangingStatus ? 
                <Loader2 size={18} className="text-amber-500 animate-spin" /> : 
                <Trash2 size={18} className="text-amber-500" />
              }
            </button>
          )}
          
          {user.status === "ARCHIVED" && onActivate && (
            <button 
              className="p-1 rounded-full hover:bg-gray-100" 
              title="Activar" 
              onClick={() => onActivate(user)}
              disabled={isChangingStatus}
            >
              {isChangingStatus ? 
                <Loader2 size={18} className="text-green-500 animate-spin" /> : 
                <CheckCircle size={18} className="text-green-500" />
              }
            </button>
          )}
          
          {onDelete && (
            <button 
              className="p-1 rounded-full hover:bg-gray-100" 
              title="Eliminar permanentemente" 
              onClick={() => onDelete(user)}
              disabled={isDeleting}
            >
              {isDeleting ? 
                <Loader2 size={18} className="text-rose-500 animate-spin" /> : 
                <Trash2 size={18} className="text-rose-500" />
              }
            </button>
          )}
        </div>
      </td>
    </tr>
  )
}