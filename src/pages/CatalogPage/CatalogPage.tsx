import React from 'react';

import Filters from '../../components/Filters/Filters';
import BookList from '../../components/BookList/BookList';
import './CatalogPage.css';

const CatalogPage: React.FC = () => {
  return (
    <main className="catalogPage">
      <Filters />
      <BookList />
    </main>
  );
};

export default CatalogPage;
