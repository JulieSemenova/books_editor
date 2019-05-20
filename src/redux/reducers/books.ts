import { Books, Action } from '../../types';

export const ADD: string = 'books/ADD';
export const DELETE: string = 'books/DELETE';
export const UPDATE: string = 'books/UPDATE';
export const UPLOAD_IMAGE: string = 'books/UPLOAD_IMAGE';

export const initialState: Books.State = {
  books: [],
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
      const bookList = state.books.slice().filter((book: Books.Book) => book.id !== action.data);
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

    case UPLOAD_IMAGE: {
      const updatedBookId = action.data.id;
      const uploadedImageUrl = action.data.image;
      const newBookList = state.books.slice().map((book: Books.Book) => {
        if (book.id === updatedBookId) {
          return { ...book, img: uploadedImageUrl };
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

export const uploadImage: Books.AC_UploadImage = (id: string, image: string) => {
  return {
    data: { id, image },
    type: UPLOAD_IMAGE,
  };
};
