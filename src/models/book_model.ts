export interface BookModel {
  bookUuid: string;
  isbn: string;
  quantityPage: number;
  title: string;
  nameCategoria: string;
  descriptionCategoria: string;
  uuidCategoria: string;
  cantidadEjemplares: number;
  authorUuids: string;      // cadena con UUIDs separados por ','
  authorFullnames: string;  // cadena con nombres separados por ', '
  statusEntity: string;     // viene como string (p.ej. "ACTIVE"|"INACTIVE")
  publicationDate?: string; // formato "YYYY-MM-DD"
}

export interface CreateBookModel {
  title: string;
  publicationDate: string;   // formato "YYYY-MM-DD"
  quantityPage: number;
  isbn: string;
  categoryUuid: string;
  cantidadDeCopies: number;
  authorsUuids: string[];    // array de UUIDs
}

export interface UpdateBookModel {
  uuid: string;               // UUID del libro a actualizar (cambiado de bookUuid a uuid)
  title: string;
  publicationDate: string;    // "YYYY-MM-DD"
  quantityPage: number;
  isbn: string;
  categoryUuid: string;
  cantidadDeCopies: number;
  authorsUuids: string[];
  statusEntity: string;       // "ACTIVE" | "INACTIVE"
}

export interface CopyModel {
  copyId: string;
  bookTitle: string;
  bookId: string;
  status: string;
}

export interface BookCopy{
  id: string;
}