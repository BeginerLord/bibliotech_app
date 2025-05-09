import { Edit, Eye, Loader2, Trash2 } from "lucide-react"
import { AuthorModel } from "@/models/author_model"

type AuthorTableRowProps = {
  author: AuthorModel
  onEdit: (author: AuthorModel) => void
  onDelete: (author: AuthorModel) => void
  isUpdating: boolean
  isDeleting: boolean
}

export default function AuthorTableRow({
  author,
  onEdit,
  onDelete,
  isUpdating,
  isDeleting,
}: AuthorTableRowProps) {
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="font-medium text-gray-900">{author.fullName}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-gray-700">{author.nationality}</td>
      <td className="px-6 py-4 whitespace-nowrap text-gray-700">{author.birthDate}</td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex justify-end space-x-2">
          <button className="p-1 rounded-full hover:bg-gray-100" title="Ver detalles">
            <Eye size={18} className="text-gray-500" />
          </button>
          <button 
            className="p-1 rounded-full hover:bg-gray-100" 
            title="Editar"
            onClick={() => onEdit(author)}
            disabled={isUpdating}
          >
            {isUpdating ? 
              <Loader2 size={18} className="text-blue-500 animate-spin" /> : 
              <Edit size={18} className="text-blue-500" />
            }
          </button>
          <button 
            className="p-1 rounded-full hover:bg-gray-100" 
            title="Eliminar" 
            onClick={() => onDelete(author)}
            disabled={isDeleting}
          >
            {isDeleting ? 
              <Loader2 size={18} className="text-rose-500 animate-spin" /> : 
              <Trash2 size={18} className="text-rose-500" />
            }
          </button>
        </div>
      </td>
    </tr>
  )
}