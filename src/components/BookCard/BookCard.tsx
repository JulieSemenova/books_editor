import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { Author } from '../../types';
import Button from '../Button/Button';
import './BookCard.css';

interface Props extends RouteComponentProps {
  id: string;
  title: string;
  authors: Author[];
  pages: number;
  publisher?: string;
  publicationDate?: string;
  editionDate?: string;
  img?: string;
}

class BookCard extends React.Component<Props> {
  handleGoTo = (e: React.MouseEvent<HTMLElement>) => {
    this.props.history.push(`/${this.props.id}`);
  };

  render() {
    const { title, authors, pages, img } = this.props;
    return (
      <article
        className="bookCard"
        onClick={(e: React.MouseEvent<HTMLElement>) => this.handleGoTo(e)}
      >
        {img ? (
          <img alt={`${title}`} className="bookCard_img" src={img} />
        ) : (
          <img
            alt={'Изображение обложки'}
            src="http://dummyimage.com/60x120/c0c0c0.gif&text=Empty"
          />
        )}
        <h2 className="bookCard_title">{title}</h2>
        <div className="bookCard_author">
          Авторы:
          {authors.map((author: Author) => (
            <p key={author.name}>
              {author.surname} {author.name}
            </p>
          ))}
        </div>
        <div>Количество страниц: {pages}</div>
        <div className="bookCard_buttons">
          <Button
            title="👁️"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => this.handleGoTo(e)}
          />
          <Button title="🗑️" onClick={(e: any) => e.stopPropagation()} />
          <Button title="✏️" onClick={(e: any) => e.stopPropagation()} />
        </div>
      </article>
    );
  }
}

export default withRouter(BookCard);
