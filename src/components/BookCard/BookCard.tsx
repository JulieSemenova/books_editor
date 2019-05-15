import * as React from 'react';

import Button from '../Button/Button';
import './BookCard.css';

interface Props {
  id: string;
  title: string;
  authors: Author[];
  pages: number;
  publisher?: string;
  publicationDate?: string;
  editionDate?: string;
  img?: string;
}

type Author = {
  name: string;
  surname: string;
};

const BookCard: React.StatelessComponent<Props> = ({
  id,
  title,
  authors,
  pages,
  img,
}: Props): JSX.Element => {
  return (
    <article className="bookCard">
      {img ? (
        <img className="bookCard_img" src={img} />
      ) : (
        <img src="http://dummyimage.com/60x120/c0c0c0.gif&text=Empty" />
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
        <Button title="👁️" onClick={() => console.log('look')} />
        <Button title="🗑️" onClick={() => console.log('delete')} />
        <Button title="✏️" onClick={() => console.log('change')} />
      </div>
    </article>
  );
};

export default BookCard;
