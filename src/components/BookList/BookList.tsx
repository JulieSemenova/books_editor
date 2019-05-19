import * as React from 'react';
import { connect } from 'react-redux';

import BookCard from '../BookCard/BookCard';
import { Books, ReduxState, Filters } from '../../types';
import './BookList.css';

interface Props {
  bookList: Books.Book[];
  param: Filters.SortParam;
  direction: Filters.Diretion;
}

class BookList extends React.Component<Props, {}> {
  prepareData = () => {
    const { param, direction, bookList } = this.props;
    if (param === 'title') {
      const sortedBookList = bookList.sort((a: Books.Book, b: Books.Book) => {
        const aString = a.title.toLowerCase();
        const bString = b.title.toLowerCase();

        if (aString > bString) {
          return 1;
        }
        if (aString < bString) {
          return -1;
        }
        return 0;
      });
      return direction === 'ASC' ? sortedBookList : sortedBookList.reverse();
    }

    if (param === 'year') {
      const sortedBookList = bookList.sort((a: Books.Book, b: Books.Book) => {
        const aValue = a.publicationYear ? +a.publicationYear : 0;
        const bValue = b.publicationYear ? +b.publicationYear : 0;
        if (aValue > bValue) {
          return -1;
        }
        if (aValue < bValue) {
          return 1;
        }
        return 0;
      });
      return direction === 'ASC' ? sortedBookList : sortedBookList.reverse();
    }

    return bookList;
  };

  render() {
    const { bookList } = this.props;
    return (
      <div className="bookList">
        {bookList && bookList.length > 0 ? (
          this.prepareData().map((book: Books.Book) => {
            return <BookCard key={book.id} book={book} />;
          })
        ) : (
          <span>Список книг пуст</span>
        )}
      </div>
    );
  }
}

export default connect(({ books, filters }: ReduxState) => ({
  bookList: books.books,
  param: filters.param,
  direction: filters.direction,
}))(BookList);
