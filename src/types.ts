export type Author = {
  name: string;
  surname: string;
};

export interface ReduxState {
  filters: Filters.State;
  books: Books.State;
}

export interface Action {
  type?: string;
  data?: any;
  [key: string]: any;
}

export namespace Filters {
  export interface State {
    param: SortParam;
    direction: Diretion;
  }
  export type Diretion = 'ASC' | 'DESC';
  export type SortParam = 'year' | 'title' | 'default';
  export type AC_PickFilter = (param: SortParam) => Action;
  export type AC_ToggleDirection = () => Action;
  export type AC_Clear = () => Action;
}

export namespace Books {
  export interface State {
    books: Book[];
  }

  export type Book = {
    id: string;
    title: string;
    authors: Author[];
    pages: string;
    publisher?: string;
    publicationYear?: string;
    editionDate?: string;
    ISBN?: string;
    img?: any;
  };

  export type AC_AddBook = (data: Book) => Action;
  export type AC_DeleteBook = (data: Book['id']) => Action;
  export type AC_UpdateBook = (data: { id: Book['id']; book: Book }) => Action;
}
