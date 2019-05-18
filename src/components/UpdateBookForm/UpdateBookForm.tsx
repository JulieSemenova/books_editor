import * as React from 'react';

import { Books } from '../../types';
import Input from '../Input/Input';

// import './UpdateBookForm.css';

interface Props {
  book: Books.Book;
}

interface State extends Partial<Books.Book> {}

class UpdateBookForm extends React.Component<Props, State> {
  state: State = {};

  static getDerivedStateFromProps(props: Props, state: State) {}
  handleChange = (key: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      [key]: event.target.value,
    });
  };
  render() {
    const {
      title,
      pages,
      publisher,
      publicationYear,
      editionDate,
      ISBN,
    } = this.props.book;

    return (
      <div>
        <Input
          label="Заголовок"
          name="title"
          required
          value={title}
          onFocus={() => {}}
          onBlur={() => {}}
          onChange={this.handleChange('title')}
          isValid={true}
        />
        <Input
          label="Кол-во страниц"
          name="pages"
          value={pages}
          required
          onFocus={() => {}}
          onBlur={() => {}}
          onChange={() => {}}
          isValid={true}
        />
        <Input
          label="Издательство"
          name="publisher"
          value={publisher}
          onFocus={() => {}}
          onBlur={() => {}}
          onChange={() => {}}
          isValid={true}
        />
        <Input
          label="Год публикации"
          name="publicationYear"
          value={publicationYear}
          onFocus={() => {}}
          onBlur={() => {}}
          onChange={() => {}}
          isValid={true}
        />
        <Input
          label="Дата выхода в тираж"
          name="editionDate"
          value={editionDate}
          onFocus={() => {}}
          onBlur={() => {}}
          onChange={() => {}}
          isValid={true}
        />
        <Input
          label="ISBN"
          name="ISBN"
          value={ISBN}
          onFocus={() => {}}
          onBlur={() => {}}
          onChange={() => {}}
          isValid={true}
        />
      </div>
    );
  }
}

export default UpdateBookForm;
