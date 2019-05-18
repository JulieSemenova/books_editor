import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Author, Books } from '../../types';
import Button from '../Button/Button';
import { deleteBook } from '../../redux/reducers/books';

import './BookCard.css';

interface Props extends RouteComponentProps, Books.Book {
  id: string;
  deleteBook: Books.AC_DeleteBook;
}

class BookCard extends React.Component<Props> {
  handleGoTo = (e: React.MouseEvent<HTMLElement>) => {
    this.props.history.push(`/${this.props.id}`);
  };

  handleDeleteBook = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    this.props.deleteBook(this.props.id);
  };

  render() {
    const {
      title,
      authors,
      pages,
      img,
      publisher,
      publicationYear,
      editionDate,
      ISBN,
    } = this.props;
    return (
      <article
        className="bookCard"
        onClick={(e: React.MouseEvent<HTMLElement>) => this.handleGoTo(e)}
      >
        <div className="bookCard_imgContainer">
          {img ? (
            <img alt={`${title}`} className="bookCard_img" src={img} />
          ) : (
            <img
              alt="Изображение обложки"
              src="http://dummyimage.com/60x120/c0c0c0.gif&text=Empty"
            />
          )}
        </div>
        <h2 className="bookCard_title">{title}</h2>
        <div className="bookCard_info">
          Авторы:{' '}
          {authors.map((author: Author) => (
            <span className="bookCard_infoValue" key={author.name}>
              {author.surname} {author.name}
              {authors.length > 1 ? ',' : null}
            </span>
          ))}
        </div>
        <div className="bookCard_info">
          Количество страниц: <span className="bookCard_infoValue">{pages}</span>
        </div>
        <div className="bookCard_info">
          Издательство:{' '}
          <span className="bookCard_infoValue">{publisher ? publisher : '-'}</span>
        </div>
        <div className="bookCard_info">
          Год публикации:{' '}
          <span className="bookCard_infoValue">
            {publicationYear ? publicationYear : '-'}
          </span>
        </div>
        <div className="bookCard_info">
          Дата выхода в тираж:{' '}
          <span className="bookCard_infoValue">{editionDate ? editionDate : '-'}</span>
        </div>
        <div className="bookCard_info">
          ISBN: <span className="bookCard_infoValue">{ISBN ? ISBN : '-'}</span>
        </div>

        <div className="bookCard_buttons">
          <Button
            title="🗑️"
            onClick={(e: React.MouseEvent<HTMLElement>) => this.handleDeleteBook(e)}
          />
          <Button
            title="✏️"
            onClick={(e: React.MouseEvent<HTMLElement>) => e.stopPropagation()}
          />
        </div>
      </article>
    );
  }
}

const connectedElem = connect(
  null,
  { deleteBook },
)(BookCard);

export default withRouter(connectedElem);
