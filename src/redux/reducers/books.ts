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
  ],
};

export default function reducer(
  state: Books.State = initialState,
  action: Action = {},
): Books.State {
  switch (action.type) {
    case ADD: {
      const addedBook = action.data;
      return {
        ...state,
        books: state.books.concat(addedBook),
      };
    }
    case DELETE: {
      const bookList = state.books.slice().filter((book: any) => book.id !== action.data.id);
      return {
        ...state,
        books: bookList,
      };
    }
    case UPDATE: {
      const updatedBook = action.data.book;
      const newBookList = state.books.slice();
      newBookList.map((book: any) => {
        if (book.id === action.data.id) {
          newBookList[action.data.id] = updatedBook;
        }
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

export const addBook = (book: any) => {
  return {
    book,
    type: ADD,
  };
};

export const deleteBook = (id: string) => {
  return {
    type: DELETE,
  };
};

export const updateBook = (data: { id: string; book: any }) => {
  return {
    data,
    type: UPDATE,
  };
};
