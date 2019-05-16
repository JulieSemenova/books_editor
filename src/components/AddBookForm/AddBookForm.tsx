import React, { Component } from 'react';

import { Book, Author } from '../../types';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { fullYearValudate } from '../../constants';
import './AddBookForm.css';

interface State extends Book {}

class AddBookForm extends Component<{}, State> {
  readonly state: State = {
    title: '',
    authors: [{ name: '', surname: '' }],
    pages: '',
    publisher: '',
    editionDate: '',
    publicationYear: '',
    ISBN: '',
  };

  private handleChange = (key: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ ...this.state, [key]: event.target.value });
  };
  private handleChangeAuthor = (key: keyof Author, elemIndex: number) => (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const authorsNew = this.state.authors.slice();
    authorsNew.map((author: Author, index) => {
      if (index === elemIndex) {
        author[key] = event.target.value;
      }
    });

    this.setState({ ...this.state, authors: authorsNew });
  };

  private addAuthor = (e: any) => {
    e.preventDefault();

    const author = {
      name: '',
      surname: '',
    };

    this.setState({
      ...this.state,
      authors: this.state.authors.concat(author),
    });
  };

  private removeAuthor = (e: any, deletedIndex: number) => {
    e.preventDefault();
    const newAuthorList = this.state.authors.filter(
      (author: Author, index: number) => index !== deletedIndex,
    );

    this.setState({
      ...this.state,
      authors: newAuthorList,
    });
  };

  render() {
    const { title, authors, pages, publisher, publicationYear, editionDate, ISBN } = this.state;

    return (
      <form>
        <Input
          label="Заголовок"
          name="title"
          value={title}
          required
          dataType="letters"
          validateLength={30}
          onChange={this.handleChange('title')}
        />
        <div>
          <div>
            Авторы
            <Button title="+ автора" size="small" onClick={(e: any) => this.addAuthor(e)} />
          </div>
          {authors.map((author: Author, index: number) => {
            return (
              <div key={`author:${index}`} className="form_item form_item--author">
                <Input
                  label="Имя"
                  name="name"
                  value={author.name}
                  required
                  dataType="letters"
                  validateLength={20}
                  onChange={this.handleChangeAuthor('name', index)}
                />
                <Input
                  label="Фамилия"
                  name="surname"
                  value={author.surname}
                  required
                  dataType="letters"
                  validateLength={20}
                  onChange={this.handleChangeAuthor('surname', index)}
                />
                {authors.length !== 1 && (
                  <Button title="✖️" size="small" onClick={e => this.removeAuthor(e, index)} />
                )}
              </div>
            );
          })}
        </div>
        <Input
          label="Стр."
          name="pages"
          value={pages}
          required
          validateMin={1}
          validateMax={10000}
          dataType="number"
          onChange={this.handleChange('pages')}
        />
        <Input
          label="Издательство"
          name="publisher"
          value={publisher}
          validateLength={30}
          dataType="letters"
          onChange={this.handleChange('publisher')}
        />
        <Input
          label="Год публикации"
          name="publicationYear"
          value={publicationYear}
          validateMin={1800}
          dataType="number"
          onChange={this.handleChange('publicationYear')}
        />
        <Input
          label="Дата выхода в тираж"
          name="editionDate"
          value={editionDate}
          dataType="regexp"
          validateFormat={fullYearValudate}
          onChange={this.handleChange('editionDate')}
        />
        <Input
          label="ISBN"
          name="ISBN"
          value={ISBN}
          dataType="regexp"
          validateFormat={fullYearValudate}
          onChange={this.handleChange('ISBN')}
        />
        <div className="form_buttons">
          <Button title="Отмена" onClick={(e: any) => e.preventDefault()} />
          <Button title="Добавить" type="primary" onClick={(e: any) => e.preventDefault()} />
        </div>
      </form>
    );
  }
}

export default AddBookForm;
