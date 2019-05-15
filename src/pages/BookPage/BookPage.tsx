import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

// import './BookPage.css';

const BookPage: React.FC = () => {
  return (
    <div className="bookPage page">
      <NavLink to={'/'}>На главную</NavLink>
      <p>bookPage</p>
    </div>
  );
};

export default withRouter(BookPage);
