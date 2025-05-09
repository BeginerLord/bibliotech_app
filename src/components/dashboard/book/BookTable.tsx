"use client";
import { useState } from "react";
import { useCreateBook, useDeleteBook, useGetAllBooks, useUpdateBook } from "@/hooks/Book";
import { Loader2, ChevronDown, ChevronUp } from "lucide-react";
import { BookModel, UpdateBookModel } from "@/models/book_model";


import BookTableHeader from "./BookTableHeader";
import BookTableRow from "./BookTableRow";
import BookTablePagination from "./BookTablePagination";
import SaveBookModal from "./SaveBookModal";
import EditBookModal from "./EditBookModal";
import DeleteBookModal from "./DeleteBookModal";
import { useGetAllCategory } from "@/hooks/Category";

export default function BookTable() {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [sortField, setSortField] = useState("title");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusEntity, setStatusEntity] = useState("ACTIVE");

  // Estados para modales
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState<BookModel | null>(null);
  const [bookToDelete, setBookToDelete] = useState<BookModel | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<UpdateBookModel>>({});

  // Obtener datos
  const { isLoading, data } = useGetAllBooks(
    page,
    size,
    sortField,
    sortDirection,
    statusEntity
  );

  // Obtener categorías para el formulario
  const { data: categoriesData } = useGetAllCategory(0, 100, "name", "asc");
  const categories = categoriesData?.content?.map(cat => ({
    categoryUuid: cat.uuid,
    name: cat.name
  })) || [];

  // Hooks para operaciones CRUD
  const { createBookMutation, isCreating } = useCreateBook();
  const { updateBookMutation, isUpdating } = useUpdateBook();
  const { deleteBookMutation, isDeleting } = useDeleteBook();

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredBooks = data?.content?.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.authorFullnames.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.isbn.includes(searchTerm)
  ) || [];

  const handlePrevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (data && !data.last) {
      setPage(page + 1);
    }
  };

  // Crear nuevo libro
  const handleCreateClick = () => {
    setIsCreateModalOpen(true);
  };

  const handleCreateBook = async (book: any) => {
    try {
      await createBookMutation(book);
      setIsCreateModalOpen(false);
      alert("Libro creado correctamente");
    } catch (error) {
      console.error("Error al crear el libro:", error);
      alert("Error al crear el libro");
    }
  };

  // Editar libro
  const handleEditClick = (book: BookModel) => {
  setCurrentBook(book);
  setEditFormData({
    uuid: book.bookUuid,  // Add this to match the API expected format
    title: book.title,
    quantityPage: book.quantityPage,
    isbn: book.isbn,
    categoryUuid: book.uuidCategoria,
    cantidadDeCopies: book.cantidadEjemplares,
    authorsUuids: book.authorUuids ? book.authorUuids.split(",") : [],
    statusEntity: book.statusEntity,
    publicationDate: book.publicationDate || new Date().toISOString().split('T')[0] // Add default if not provided
  });
  setIsEditModalOpen(true);
};

  const handleEditFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "quantityPage" || name === "cantidadDeCopies") {
      setEditFormData({
        ...editFormData,
        [name]: Number(value),
      });
    } else {
      setEditFormData({
        ...editFormData,
        [name]: value,
      });
    }
  };

const handleSaveEdit = async () => {
  if (!currentBook || !editFormData) return;
  
  try {
    await updateBookMutation({ 
      uuid: currentBook.bookUuid,
      bookData: editFormData as UpdateBookModel 
    });
    setIsEditModalOpen(false);
    alert("Libro actualizado correctamente");
  } catch (error) {
    alert("Error al actualizar el libro");
    console.error("Error al actualizar el libro:", error);
  }
};

  // Eliminar libro
  const handleDeleteClick = (book: BookModel) => {
    setBookToDelete(book);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!bookToDelete) return;
    
    try {
      await deleteBookMutation(bookToDelete.bookUuid);
      setIsDeleteModalOpen(false);
      alert("El libro se ha eliminado correctamente");
    } catch (error) {
      alert("Error: No se pudo eliminar el libro");
      console.error("Error al eliminar libro:", error);
    }
  };

  // Ver detalle del libro
  const handleViewClick = (book: BookModel) => {
    // Por ahora solo mostramos información en consola
    // En una implementación completa, esto podría abrir un modal de vista detallada
    console.log("Ver detalles del libro", book);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <BookTableHeader
          searchTerm={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          statusEntity={statusEntity}
          onStatusChange={(e) => setStatusEntity(e.target.value)}
          onCreateClick={handleCreateClick}
        />

        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex justify-center items-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
              <span className="ml-2 text-gray-600">Cargando libros...</span>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("title")}
                  >
                    <div className="flex items-center">
                      Título
                      {sortField === "title" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp size={15} />
                        ) : (
                          <ChevronDown size={15} />
                        ))}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("authorFullnames")}
                  >
                    <div className="flex items-center">
                      Autor
                      {sortField === "authorFullnames" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp size={15} />
                        ) : (
                          <ChevronDown size={15} />
                        ))}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    ISBN
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("quantityPage")}
                  >
                    <div className="flex items-center">
                      Páginas
                      {sortField === "quantityPage" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp size={15} />
                        ) : (
                          <ChevronDown size={15} />
                        ))}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("nameCategoria")}
                  >
                    <div className="flex items-center">
                      Categoría
                      {sortField === "nameCategoria" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp size={15} />
                        ) : (
                          <ChevronDown size={15} />
                        ))}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Ejemplares
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
                {filteredBooks.length > 0 ? (
                  filteredBooks.map((book) => (
                    <BookTableRow
                      key={book.isbn}
                      book={book}
                      onEdit={handleEditClick}
                      onDelete={handleDeleteClick}
                      onView={handleViewClick}
                      isUpdating={isUpdating && currentBook?.bookUuid === book.bookUuid}
                      isDeleting={isDeleting && bookToDelete?.bookUuid === book.bookUuid}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-10 text-center text-gray-500">
                      No se encontraron libros
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        <BookTablePagination
          page={page}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
          filteredCount={filteredBooks.length}
          totalElements={data?.totalElements || 0}
          isLastPage={!data || data.last}
        />
      </div>

      {/* Modales */}
      <SaveBookModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleCreateBook}
        isCreating={isCreating}
        categories={categories}
      />
      
      <EditBookModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveEdit}
        book={currentBook}
        formData={editFormData}
        onChange={handleEditFormChange}
        isUpdating={isUpdating}
      />
      
      <DeleteBookModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        book={bookToDelete}
        isDeleting={isDeleting}
      />
    </>
  );
}