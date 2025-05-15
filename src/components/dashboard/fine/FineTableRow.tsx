import { CreditCard, Loader2, Trash2 } from "lucide-react"
import { FineModel } from "@/models/fine_model"

type FineTableRowProps = {
  fine: FineModel
  onPayFine: (fine: FineModel) => void
  isProcessing: boolean
}

export default function FineTableRow({
  fine,
  onPayFine,
  isProcessing,
}: FineTableRowProps) {
  // Format the amount to show as currency
  const formattedAmount = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'USD'
  }).format(fine.amount / 100); // Assuming amount is in cents

  // Format the date
  const formattedDate = fine.issuedDate ? new Date(fine.issuedDate).toLocaleDateString() : 'N/A';

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="font-medium text-gray-900">{fine.userDni}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-gray-700">{fine.loanId}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="font-medium text-green-600">{formattedAmount}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-gray-700">{formattedDate}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          fine.status === 'PAID' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {fine.status === 'PAID' ? 'Pagada' : 'Pendiente'}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex justify-end space-x-2">
          {fine.status === 'PENDING' && (
            <button 
              className="p-1 rounded-full hover:bg-gray-100" 
              title="Registrar pago" 
              onClick={() => onPayFine(fine)}
              disabled={isProcessing}
            >
              {isProcessing ? 
                <Loader2 size={18} className="text-green-500 animate-spin" /> : 
                <CreditCard size={18} className="text-green-500" />
              }
            </button>
          )}
        </div>
      </td>
    </tr>
  )
}