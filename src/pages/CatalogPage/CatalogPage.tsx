import React from 'react';

import Controls from '../../components/Controls/Controls';
import BookList from '../../components/BookList/BookList';
import AddBookForm from '../../components/AddBookForm/AddBookForm';
import './CatalogPage.css';

const CatalogPage: React.FC = () => {
  return (
    <main className="catalogPage page">
      <Controls />
      <BookList />
      <AddBookForm />
    </main>
  );
};

export default CatalogPage;
