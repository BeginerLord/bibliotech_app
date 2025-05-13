import { Edit, Eye, Loader2, Trash2, CheckCircle } from "lucide-react"
import { LoanModel } from "@/models/loans_model"
import { format, isValid, parseISO } from "date-fns"
import { es } from "date-fns/locale"

type LoanTableRowProps = {
  loan: LoanModel
  onEdit: (loan: LoanModel) => void
  onDelete: (loan: LoanModel) => void
  onReturn?: (loan: LoanModel) => void
  isUpdating: boolean
  isDeleting: boolean
  isReturning?: boolean
}

export default function LoanTableRow({
  loan,
  onEdit,
  onDelete,
  onReturn,
  isUpdating,
  isDeleting,
  isReturning = false,
}: LoanTableRowProps) {
  const isActive = loan.statusEntity === "ACTIVE";
  const isOverdue = isActive && new Date(loan.dueDate) < new Date();
  const userName = loan.user ? `${loan.user.firstName} ${loan.user.lastName}` : loan.userCedula;

  // Función auxiliar para formatear fechas usando date-fns (incluido con react-datepicker)
  const formatLoanDate = (dateStr?: string) => {
    if (!dateStr) return "-";
    try {
      const parsedDate = parseISO(dateStr);
      if (!isValid(parsedDate)) return "-";
      return format(parsedDate, "dd/MM/yyyy", { locale: es });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "-";
    }
  };

  return (
    <tr className={`hover:bg-gray-50 transition-colors ${isOverdue ? 'bg-red-50' : ''}`}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="font-medium text-gray-900">{loan.nameBook}</div>
        <div className="text-sm text-gray-500">ID: {loan.copyId.substring(0, 8)}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-gray-900">{userName}</div>
        <div className="text-sm text-gray-500">{loan.userCedula}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-gray-700">{formatLoanDate(loan.startDate)}</td>
      <td className="px-6 py-4 whitespace-nowrap text-gray-700">
        <span className={isOverdue ? 'text-red-600 font-medium' : ''}>{formatLoanDate(loan.dueDate)}</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-gray-700">
        {formatLoanDate(loan.returnDate)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          loan.statusEntity === "ACTIVE" 
            ? 'bg-green-100 text-green-800' 
            : 'bg-gray-100 text-gray-800'
        }`}>
          {loan.statusEntity}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex justify-end space-x-2">
          <button className="p-1 rounded-full hover:bg-gray-100" title="Ver detalles">
            <Eye size={18} className="text-gray-500" />
          </button>
          
          {isActive && onReturn && (
            <button 
              className="p-1 rounded-full hover:bg-gray-100" 
              title="Registrar devolución"
              onClick={() => onReturn(loan)}
              disabled={isReturning}
            >
              {isReturning ? 
                <Loader2 size={18} className="text-green-500 animate-spin" /> : 
                <CheckCircle size={18} className="text-green-500" />
              }
            </button>
          )}
          
          <button 
            className="p-1 rounded-full hover:bg-gray-100" 
            title="Editar"
            onClick={() => onEdit(loan)}
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
            onClick={() => onDelete(loan)}
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