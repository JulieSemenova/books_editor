import React from 'react';

import Controls from '../../components/Controls/Controls';
import BookList from '../../components/BookList/BookList';
import './CatalogPage.css';

const CatalogPage: React.FC = () => {
  return (
    <main className="catalogPage page">
      <Controls />
      <BookList />
    </main>
  );
};

export default CatalogPage;
