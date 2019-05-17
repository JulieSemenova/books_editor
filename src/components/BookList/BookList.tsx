import React, { Component } from 'react';
import { connect } from 'react-redux';

import BookCard from '../BookCard/BookCard';
import './BookList.css';
import { Book, ReduxState } from '../../types';

interface Props {
  bookList: Book[];
}

class BookList extends Component<Props, {}> {
  render() {
    const { bookList } = this.props;
    return (
      <div className="bookList">
        {bookList.length > 0 ? (
          bookList.map((book: Book) => {
            const { id, title, authors, pages } = book;
            return <BookCard id={id} title={title} authors={authors} pages={pages} />;
          })
        ) : (
          <span>Список книг пуст</span>
        )}
      </div>
    );
  }
}

export default connect(({ books }: ReduxState) => ({ bookList: books.books }))(BookList);
