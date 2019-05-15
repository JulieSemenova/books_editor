import React, { Component } from 'react';

import BookCard from '../BookCard/BookCard';
import './BookList.css';

class BookList extends Component {
  render() {
    return (
      <div className="bookList">
        <BookCard
          id={'id'}
          title="title"
          authors={[{ name: 'name', surname: 'surname' }]}
          pages={200}
        />
      </div>
    );
  }
}

export default BookList;
