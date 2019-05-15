import React, { Component } from 'react';

import BookCard from '../../components/BookCard/BookCard';

class BooksCatalog extends Component {
  render() {
    return (
      <div>
        BooksCatalog
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

export default BooksCatalog;
