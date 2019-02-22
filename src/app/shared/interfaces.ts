export interface Author {
  id: number | null;
  name: string;
}

export interface AuthorResolved {
  author: Author;
  error?: any;
}

export interface AuthorListResolved {
  authors: Author[];
  error?: any;
}

export interface Book {
  id: number | null;
  title: string;
  author: string;
  genre: string;
  goodreadsId: number | null;
  description: string;
  coverImage: string;
  read: boolean;
}

export interface BookResolved {
  book: Book;
  error?: any;
}

export interface BookListResolved {
  books: Book[];
  error?: any;
}
