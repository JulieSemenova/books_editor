import { Books, Action } from '../../types';

export const ADD: string = 'books/ADD';
export const DELETE: string = 'books/DELETE';
export const UPDATE: string = 'books/UPDATE';

export const initialState: Books.State = {
  books: [
    {
      id: 'id',
      title: 'title',
      authors: [{ name: 'name', surname: 'surname' }],
      pages: '200',
      publisher: 'publisher',
      publicationYear: '1900',
      editionDate: '01.01.1900',
      ISBN: 'ISBN',
      img: 'any',
    },
    {
      id: 'id1',
      title: 'title1',
      authors: [{ name: '111111', surname: 'surn11111ame' }],
      pages: '2100',
      publisher: 'publi1sher',
      publicationYear: '1800',
      editionDate: '01.01.1999',
      ISBN: 'ISBN',
      img: 'any',
    },
  ],
};

export default function reducer(
  state: Books.State = initialState,
  action: Action = {},
): Books.State {
  switch (action.type) {
    case ADD: {
      const newBookList = state.books.slice().concat(action.data);

      return {
        ...state,
        books: newBookList,
      };
    }
    case DELETE: {
      const bookList = state.books
        .slice()
        .filter((book: Books.Book) => book.id !== action.data);
      return {
        ...state,
        books: bookList,
      };
    }
    case UPDATE: {
      const updatedBook = action.data.book;
      const updatedBookId = action.data.id;

      const newBookList = state.books.slice().map((book: Books.Book) => {
        if (book.id === updatedBookId) {
          return updatedBook;
        }
        return book;
      });

      return {
        ...state,
        books: newBookList,
      };
    }
    default:
      return state;
  }
}

export const addBook: Books.AC_AddBook = (data: Books.Book) => {
  return {
    data,
    type: ADD,
  };
};

export const deleteBook: Books.AC_DeleteBook = (data: Books.Book['id']) => {
  return {
    data,
    type: DELETE,
  };
};

export const updateBook: Books.AC_UpdateBook = (id: string, book: Books.Book) => {
  return {
    data: { id, book },
    type: UPDATE,
  };
};
