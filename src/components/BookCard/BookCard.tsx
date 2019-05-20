import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Books } from '../../types';
import Button from '../Button/Button';
import { deleteBook } from '../../redux/reducers/books';
import Popup from '../Popup/Popup';
import EditBookForm from '../EditBookForm/EditBookForm';

import './BookCard.css';

interface Props extends RouteComponentProps {
  book: Books.Book;
  deleteBook: Books.AC_DeleteBook;
}

interface State {
  isUpdateModalOpen: boolean;
}

class BookCard extends React.Component<Props, State> {
  readonly state: State = {
    isUpdateModalOpen: false,
  };

  handleDeleteBook = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    this.props.deleteBook(this.props.book.id);
  };

  toggleModal = () => {
    this.setState({
      isUpdateModalOpen: !this.state.isUpdateModalOpen,
    });
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
    } = this.props.book;
    return (
      <article className="bookCard">
        <div className="bookCard_imgContainer">
          {img ? (
            <img alt={`${title}`} className="bookCard_img" width="190" src={img} />
          ) : (
            <img
              alt="Изображение обложки"
              src="http://dummyimage.com/60x120/c0c0c0.gif&text=Empty"
            />
          )}
        </div>
        <h2 className="bookCard_title">{title}</h2>
        <div className="bookCard_aboutBook">
          <div className="bookCard_info">
            Авторы:{' '}
            {authors.map((author: Books.Author) => (
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
            Издательство: <span className="bookCard_infoValue">{publisher ? publisher : '-'}</span>
          </div>
          <div className="bookCard_info">
            Год публикации:{' '}
            <span className="bookCard_infoValue">{publicationYear ? publicationYear : '-'}</span>
          </div>
          <div className="bookCard_info">
            Дата выхода в тираж:{' '}
            <span className="bookCard_infoValue">{editionDate ? editionDate : '-'}</span>
          </div>
          <div className="bookCard_info">
            ISBN: <span className="bookCard_infoValue">{ISBN ? ISBN : '-'}</span>
          </div>
        </div>

        <div className="bookCard_buttons">
          <Button
            title="🗑️"
            onClick={(e: React.MouseEvent<HTMLElement>) => this.handleDeleteBook(e)}
          />
          <Button title="✏️" onClick={this.toggleModal} />
        </div>
        <Popup
          title="Редактирование книги"
          onClick={this.toggleModal}
          isVisible={this.state.isUpdateModalOpen}
        >
          <EditBookForm onClick={this.toggleModal} book={this.props.book} />
        </Popup>
      </article>
    );
  }
}

const connectedElem = connect(
  null,
  { deleteBook },
)(BookCard);

export default withRouter(connectedElem);
