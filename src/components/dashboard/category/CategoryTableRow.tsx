import { Edit, Eye, Loader2, Trash2 } from "lucide-react"
import { CategoryModel } from "@/models/category_model"

type CategoryTableRowProps = {
  category: CategoryModel
  onEdit: (category: CategoryModel) => void
  onDelete: (category: CategoryModel) => void
  isUpdating: boolean
  isDeleting: boolean
}

export default function CategoryTableRow({
  category,
  onEdit,
  onDelete,
  isUpdating,
  isDeleting,
}: CategoryTableRowProps) {
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="font-medium text-gray-900">{category.name}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-gray-700">{category.description}</td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex justify-end space-x-2">
          <button className="p-1 rounded-full hover:bg-gray-100" title="Ver detalles">
            <Eye size={18} className="text-gray-500" />
          </button>
          <button 
            className="p-1 rounded-full hover:bg-gray-100" 
            title="Editar"
            onClick={() => onEdit(category)}
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
            onClick={() => onDelete(category)}
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