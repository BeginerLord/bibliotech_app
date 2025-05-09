import { BookModel } from "@/models/book_model";
import { Edit, Eye, Loader2, Trash2 } from "lucide-react";

type BookTableRowProps = {
  book: BookModel;
  onEdit?: (book: BookModel) => void;
  onDelete?: (book: BookModel) => void;
  onView?: (book: BookModel) => void;
  isUpdating?: boolean;
  isDeleting?: boolean;
};

export default function BookTableRow({
  book,
  onEdit,
  onDelete,
  onView,
  isUpdating = false,
  isDeleting = false,
}: BookTableRowProps) {
  return (
    <tr
      key={book.isbn}
      data-bookuuid={book.bookUuid}
      data-uuidcategoria={book.uuidCategoria}
      data-authoruuids={book.authorUuids}
      className="hover:bg-gray-50 transition-colors"
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="font-medium text-gray-900">{book.title}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-gray-700">
        {book.authorFullnames}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-gray-700">{book.isbn}</td>
      <td className="px-6 py-4 whitespace-nowrap text-gray-700">
        {book.quantityPage}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-gray-700">
        {book.nameCategoria}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {book.cantidadEjemplares} ejemplares
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex justify-end space-x-2">
          <button
            className="p-1 rounded-full hover:bg-gray-100"
            title="Ver detalles"
            onClick={() => onView && onView(book)}
          >
            <Eye size={18} className="text-gray-500" />
          </button>
          <button
            className="p-1 rounded-full hover:bg-gray-100"
            title="Editar"
            onClick={() => onEdit && onEdit(book)}
            disabled={isUpdating}
          >
            {isUpdating ? (
              <Loader2 size={18} className="text-blue-500 animate-spin" />
            ) : (
              <Edit size={18} className="text-blue-500" />
            )}
          </button>
          <button
            className="p-1 rounded-full hover:bg-gray-100"
            title="Eliminar"
            onClick={() => onDelete && onDelete(book)}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <Loader2 size={18} className="text-rose-500 animate-spin" />
            ) : (
              <Trash2 size={18} className="text-rose-500" />
            )}
          </button>
        </div>
      </td>
    </tr>
  );
}