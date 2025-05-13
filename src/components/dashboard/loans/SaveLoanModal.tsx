import { useState, useEffect } from "react";
import { Dialog, DialogTitle } from "@headlessui/react";
import { CreateLoanModel } from "@/models/loans_model";
import { useGetActiveBookCopies } from "@/hooks/Book";

interface CreateLoanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CreateLoanModel) => void;
  isCreating: boolean;
  users: { cedula: string; fullName: string }[];
  copies: { copyId: string; bookTitle: string }[];
  selectedBookId: string;
  onBookSelect: (bookId: string) => void;
}

export default function CreateLoanModal({
  isOpen,
  onClose,
  onSave,
  isCreating,
  users,
  copies,
  selectedBookId,
  onBookSelect,
}: CreateLoanModalProps) {
  // Remove the local state since we're getting selectedBookId from props
  const { data: activeCopies, isLoading: isLoadingCopies } = useGetActiveBookCopies(selectedBookId);
  
  const [formData, setFormData] = useState<CreateLoanModel>({
    userCedula: "",
    copyId: "",
    startDate: new Date().toISOString().split('T')[0], // Default to today's date
    dueDate: ""
  });

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setFormData({
        userCedula: "",
        copyId: "",
        startDate: new Date().toISOString().split('T')[0],
        dueDate: ""
      });
      // Also reset the selected book ID when opening the modal
      if (selectedBookId) {
        onBookSelect("");
      }
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBookSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const bookId = e.target.value;
    onBookSelect(bookId); // Use the prop function instead of the local setState
    // Reset copyId when changing book selection
    setFormData({
      ...formData,
      copyId: ""
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    // Reset form after submission
    setFormData({
      userCedula: "",
      copyId: "",
      startDate: new Date().toISOString().split('T')[0],
      dueDate: ""
    });
  };

  const handleClose = () => {
    // Reset form when manually closing the modal
    setFormData({
      userCedula: "",
      copyId: "",
      startDate: new Date().toISOString().split('T')[0],
      dueDate: ""
    });
    onClose();
  };

  // Format date as YYYY-MM-DD for input field
  const today = new Date();
  const minDate = today.toISOString().split('T')[0];

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      className="fixed inset-0 z-10 overflow-y-auto"
    >
      <div className="flex min-h-screen items-center justify-center">
        <div className="fixed inset-0 bg-black opacity-30" />

        <div className="relative bg-white rounded-lg max-w-md w-full mx-auto p-6 shadow-xl">
          <DialogTitle as="h3" className="text-lg font-medium text-gray-900 mb-4">
            Crear nuevo préstamo
          </DialogTitle>

          <form onSubmit={handleSubmit}>
            {/* User selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Usuario
              </label>
              <select
                name="userCedula" 
                value={formData.userCedula}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3"
                required
              >
                <option value="">Seleccionar usuario</option>
                {users.map((user) => (
                  <option key={user.cedula} value={user.cedula}>
                    {user.fullName} ({user.cedula})
                  </option>
                ))}
              </select>
            </div>

            {/* Book selection (first step) */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Libro
              </label>
              <select
                value={selectedBookId}
                onChange={handleBookSelection}
                className="w-full border border-gray-300 rounded-md py-2 px-3"
                required
              >
                <option value="">Seleccionar libro</option>
                {copies.map((book) => (
                  <option key={book.copyId} value={book.copyId}>
                    {book.bookTitle}
                  </option>
                ))}
              </select>
            </div>

            {/* Copy selection (second step, only shown after book is selected) */}
            {selectedBookId && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ejemplar
                </label>
                <select
                  name="copyId"
                  value={formData.copyId}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md py-2 px-3"
                  required
                  disabled={isLoadingCopies || !activeCopies?.length}
                >
                  <option value="">Seleccionar ejemplar</option>
                  {isLoadingCopies ? (
                    <option disabled>Cargando ejemplares...</option>
                  ) : activeCopies?.length ? (
                    activeCopies.map((copy) => (
                      <option key={copy.id} value={copy.id}>
                        Ejemplar ID: {copy.id}
                      </option>
                    ))
                  ) : (
                    <option disabled>No hay ejemplares disponibles</option>
                  )}
                </select>
                {isLoadingCopies && (
                  <p className="text-sm text-gray-500 mt-1">Cargando ejemplares disponibles...</p>
                )}
                {!isLoadingCopies && activeCopies?.length === 0 && (
                  <p className="text-sm text-red-500 mt-1">No hay ejemplares disponibles para este libro</p>
                )}
              </div>
            )}

            {/* Due date selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de devolución
              </label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                min={minDate}
                className="w-full border border-gray-300 rounded-md py-2 px-3"
                required
              />
            </div>

            {/* Actions */}
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                disabled={isCreating}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700 disabled:opacity-50"
                disabled={isCreating || !formData.userCedula || !formData.copyId || !formData.dueDate}
              >
                {isCreating ? "Creando..." : "Crear préstamo"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
}