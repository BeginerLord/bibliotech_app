"use client";

import { useEffect, useState } from "react";
import {
  useGetAllLoans,
  useMarkLoanAsDelivered,
  useUpdateLoan,
  useDeleteLoan,
  useCreateLoan
} from "@/hooks/Loans";
import { CreateLoanModel, LoanModel, UpdateLoanModel } from "@/models/loans_model";
import LoanTableHeader from "./LoanTableHeader";
import LoanTableRow from "./LoanTableRow";
import LoanTablePagination from "./LoanTablePagination";
import EditLoanModal from "./EditLoanModal";
import DeleteLoanModal from "./DeleteLoanModal";
import DeliverLoanModal from "./DeliverLoanModal";
import { Loader2 } from "lucide-react";
import CreateLoanModal from "./SaveLoanModal";
import { useGetAllUsersActive } from "@/hooks/Person";
import { useGetActiveBookCopies, useGetAllBooks } from "@/hooks/Book";

export default function LoanTable() {
  // Table state
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [sortBy, setSortBy] = useState("startDate");
  const [direction, setDirection] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState<"ACTIVE" | "ARCHIVED" | "ALL">("ACTIVE");


  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [users, setUsers] = useState<{ cedula: string; fullName: string }[]>([]);
  const [copies, setcopies] = useState<{ copyId: string; bookTitle: string }[]>([]);
  const [selectedBookId, setSelectedBookId] = useState<string>("");

  // Modal states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeliverModalOpen, setIsDeliverModalOpen] = useState(false);
  const [currentLoan, setCurrentLoan] = useState<LoanModel | null>(null);
  const [editFormData, setEditFormData] = useState<UpdateLoanModel>({
    dueDate: "",
  });

  // Get loans data
  const { isLoading, data } = useGetAllLoans({
    page,
    size,
    sortBy,
    direction,
    status: status === "ALL" ? undefined : status
  });

  // Mutations
  const { updateLoanMutation, isUpdating } = useUpdateLoan();
  const { deleteLoanMutation, isDeleting } = useDeleteLoan();
  const { markAsDeliveredMutation, isDelivering } = useMarkLoanAsDelivered();
  const { createLoanMutation, createError, isCreating: isCreatingLoan } = useCreateLoan();
  const { data: userData } = useGetAllUsersActive(0, 100, "firstName", "asc");
  const { data: copiesData } = useGetAllBooks(0, 100, "bookTitle", "asc");
  const { data: activeCopies, isLoading: isLoadingCopies } = useGetActiveBookCopies(selectedBookId);

  // Filter loans based on search term
  const filteredLoans = data?.content?.filter(loan => {
    const searchLower = searchTerm.toLowerCase();
    return (
      loan.nameBook?.toLowerCase().includes(searchLower) ||
      loan.userCedula?.toLowerCase().includes(searchLower) ||
      (loan.user?.firstName + " " + loan.user?.lastName)?.toLowerCase().includes(searchLower)
    );
  }) || [];

  // Pagination handlers
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

  // Status filter handler
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value as "ACTIVE" | "ARCHIVED" | "ALL");
    setPage(0); // Reset to first page when changing filters
  };

  const handleCreateLoan = async (loanData: CreateLoanModel) => {
    try {
      setIsCreating(true);
      // Actually call the mutation instead of just commenting it out
      await createLoanMutation(loanData);
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error("Error creating loan:", error);
    } finally {
      setIsCreating(false);
    }
  };
  // Edit loan handlers
  const handleEditClick = (loan: LoanModel) => {
    setCurrentLoan(loan);
    setEditFormData({
      dueDate: loan.dueDate,
    });
    setIsEditModalOpen(true);
  };

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name === "endDate" ? "dueDate" : name]: value,
    });
  };

  const handleSaveEdit = async () => {
    if (!currentLoan || !editFormData) return;

    try {
      await updateLoanMutation({
        loanId: currentLoan.loanId,
        loanData: editFormData,
      });
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating loan:", error);
    }
  };

  // Delete loan handlers
  const handleDeleteClick = (loan: LoanModel) => {
    setCurrentLoan(loan);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!currentLoan) return;

    try {
      await deleteLoanMutation(currentLoan.loanId);
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting loan:", error);
    }
  };

  // Deliver loan handlers
  const handleDeliverClick = (loan: LoanModel) => {
    setCurrentLoan(loan);
    setIsDeliverModalOpen(true);
  };

  const handleConfirmDeliver = async () => {
    if (!currentLoan) return;

    try {
      await markAsDeliveredMutation(currentLoan.loanId);
      setIsDeliverModalOpen(false);
    } catch (error) {
      console.error("Error marking loan as delivered:", error);
    }
  };

  const handleBookSelection = (bookId: string) => {
    setSelectedBookId(bookId);
  };
  // Add a useEffect to load users and copies when needed
  useEffect(() => {
    if (userData?.content) {
      const formattedUsers = userData.content.map(user => ({
        cedula: user.dni,
        fullName: `${user.firstName} ${user.lastName}`
      }));
      setUsers(formattedUsers);
    }

    if (copiesData?.content) {
      const formattedCopies = copiesData.content.map(copy => ({
        copyId: copy.bookUuid,
        bookTitle: copy.title
      }));
      setcopies(formattedCopies);
    }
  }, [userData, copiesData]);

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <LoanTableHeader
          searchTerm={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          showActiveOnly={status === "ACTIVE"}
          onStatusChange={handleStatusChange}
          onCreateClick={() => setIsCreateModalOpen(true)} // Añadida esta línea
        />

        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex justify-center items-center py-16">
              <Loader2 className="h-8 w-8 text-emerald-500 animate-spin" />
              <span className="ml-2 text-gray-500">Cargando préstamos...</span>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Libro
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Usuario
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    onClick={() => {
                      setSortBy("startDate");
                      setDirection(direction === "asc" ? "desc" : "asc");
                    }}
                  >
                    Fecha Inicio
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    onClick={() => {
                      setSortBy("dueDate");
                      setDirection(direction === "asc" ? "desc" : "asc");
                    }}
                  >
                    Fecha Devolución
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Fecha Entrega
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
                {filteredLoans.length > 0 ? (
                  filteredLoans.map((loan) => (
                    <LoanTableRow
                      key={loan.loanId}
                      loan={loan}
                      onEdit={handleEditClick}
                      onDelete={handleDeleteClick}
                      onReturn={handleDeliverClick}
                      isUpdating={isUpdating && currentLoan?.loanId === loan.loanId}
                      isDeleting={isDeleting && currentLoan?.loanId === loan.loanId}
                      isReturning={isDelivering && currentLoan?.loanId === loan.loanId}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                      No se encontraron préstamos que coincidan con los filtros actuales.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        <LoanTablePagination
          page={page}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
          filteredCount={filteredLoans.length}
          totalElements={data?.totalElements || 0}
          isLastPage={!data || data.last}
        />
      </div>

      {/* Modals */}
      <EditLoanModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveEdit}
        loan={currentLoan}
        formData={editFormData}
        onChange={handleEditFormChange}
        isUpdating={isUpdating}
      />

      <DeleteLoanModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        loan={currentLoan}
        isDeleting={isDeleting}
      />

      <DeliverLoanModal
        isOpen={isDeliverModalOpen}
        onClose={() => setIsDeliverModalOpen(false)}
        onDeliver={handleConfirmDeliver}
        loan={currentLoan}
        isDelivering={isDelivering}
      />

      <CreateLoanModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleCreateLoan}
        isCreating={isCreating}
        users={users || []}
        copies={copies || []}
        selectedBookId={selectedBookId}
        onBookSelect={handleBookSelection}
      />
    </>
  );
}