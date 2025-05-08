export interface BookModel {
  bookUuid: string;
  isbn: string;
  quantityPage: number;
  title: string;
  nameCategoria: string;
  descriptionCategoria: string;
  uuidCategoria: string;
  cantidadEjemplares: number;
  authorUuids: string;
  authorFullnames: string;
  statusEntity?: "ACTIVE" | "INACTIVE";
  publicationDate?: string;
}

export interface BookModelDto extends Omit<BookModel, 'bookUuid'> {
  // All fields except bookUuid for creation
}

export interface UpdateBookModel {
  uuid?: string;
  title?: string;
  publicationDate?: string;
  quantityPage?: number;
  isbn?: string;
  categoryUuid?: string;
  cantidadDeCopies?: number;
  authorsUuids?: string[];
  statusEntity?: "ACTIVE" | "INACTIVE";
}

// Para crear un nuevo libro según el swagger
export interface CreateBookModel {
  title: string;
  publicationDate: string;
  quantityPage: number;
  isbn: string;
  categoryUuid: string;
  cantidadDeCopies: number;
  authorsUuids: string[];
}