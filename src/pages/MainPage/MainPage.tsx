import React from 'react';

import Filters from '../../components/Filters/Filters';
import BooksCatalog from '../../components/BooksCatalog/BooksCatalog';
import './MainPage.css';

const MainPage: React.FC = () => {
  return (
    <main className="mainPage">
      <Filters />
      <BooksCatalog />
    </main>
  );
};

export default MainPage;
