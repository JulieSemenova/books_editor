import React, { Component } from 'react';
import { connect } from 'react-redux';

import BookCard from '../BookCard/BookCard';
import { Books, ReduxState } from '../../types';
import './BookList.css';

interface Props {
  bookList: Books.Book[];
}

class BookList extends Component<Props, {}> {
  render() {
    const { bookList } = this.props;
    return (
      <div className="bookList">
        {bookList && bookList.length > 0 ? (
          bookList.map((book: Books.Book) => {
            const { id, title, authors, pages } = book;
            return (
              <BookCard key={id} id={id} title={title} authors={authors} pages={pages} />
            );
          })
        ) : (
          <span>Список книг пуст</span>
        )}
      </div>
    );
  }
}

export default connect(({ books }: ReduxState) => ({ bookList: books.books }))(BookList);
