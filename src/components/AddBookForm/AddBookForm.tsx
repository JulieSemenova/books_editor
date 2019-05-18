import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Books, Author } from '../../types';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { fullYearValudate } from '../../constants';
import { addBook } from '../../redux/reducers/books';

import './AddBookForm.css';

type ValidAuthor = { name: boolean | null; surname: boolean | null };
interface State {
  fields: {
    [key: string]: string;
  };
  fieldsValid: {
    [key: string]: boolean | null;
  };
  authors: Author[];
  isAuthorsValid: ValidAuthor[];
  isFormValid: boolean;
}

interface Props {
  onClick: () => void;
  addBook: Books.AC_AddBook;
}

class AddBookForm extends Component<Props, State> {
  readonly state: State = {
    fields: {
      title: '',
      pages: '',
      publisher: '',
      publicationYear: '',
      editionDate: '',
      ISBN: '',
    },
    authors: [
      {
        name: '',
        surname: '',
      },
    ],
    isAuthorsValid: [{ name: null, surname: null }],
    fieldsValid: {
      title: null,
      pages: null,
      publisher: null,
      publicationYear: null,
      editionDate: null,
      ISBN: null,
    },
    isFormValid: false,
  };

  private handleChange = (key: string) => (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    this.setState(
      {
        ...this.state,
        fields: {
          ...this.state.fields,
          [key]: event.target.value,
        },
      },
      () => this.validateForm(),
    );
  };

  private handleChangeAuthor = (key: keyof Author, elemIndex: number) => (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const authorsNew = this.state.authors.slice();

    authorsNew.map((author: Author, index: number) => {
      if (index === elemIndex) {
        author[key] = event.target.value;
      }
    });

    this.setState({
      ...this.state,
      authors: authorsNew,
    });
  };

  private handleFocus = (key: string) => {
    this.setState({
      ...this.state,
      fieldsValid: {
        ...this.state.fieldsValid,
        [key]: null,
      },
      isFormValid: false,
    });
  };

  private handleFocusAuthor = (key: string, elemIndex: number) => {
    const newAuthor = this.state.isAuthorsValid.slice();
    newAuthor.map((author: any, index: number) => {
      if (index === elemIndex) {
        author[key] = null;
      }
    });

    this.setState({
      ...this.state,
      isAuthorsValid: newAuthor,
    });
  };

  private validateInput = (
    key: string,
    type: 'number' | 'letters' | 'regexp',
    validateRule: {
      min?: number;
      max?: number;
      pattern?: RegExp;
    },
    required?: boolean,
  ) => {
    const value = this.state.fields[key];

    let isValid = true;

    if (required && (!value || value === '')) {
      isValid = false;
    } else {
      if (type === 'letters' && value !== '') {
        const valueLength = value.length;
        if (validateRule.max && valueLength > validateRule.max) {
          isValid = false;
        }
      }

      if (type === 'number' && value !== '') {
        const digits = /^[0-9]+$/;

        if (!digits.test(value)) {
          isValid = false;
        }
        if (validateRule.min && +value < validateRule.min) {
          isValid = false;
        }
        if (validateRule.max && +value > validateRule.max) {
          isValid = false;
        }
      }

      if (type === 'regexp') {
        if (validateRule.pattern && value && !validateRule.pattern.test(value)) {
          isValid = false;
        }
      }
    }

    this.setState({
      ...this.state,
      fieldsValid: {
        ...this.state.fieldsValid,
        [key]: isValid,
      },
    });

    this.validateForm();
  };

  private validateAuthor = (key: keyof Author, elemIndex: number) => {
    const validateMax = 20;
    const value = this.state.authors[elemIndex][key];
    const valueLength = value.length;

    let isValid = true;
    if (!value || !value.length) {
      isValid = false;
    }
    if (valueLength > validateMax) {
      isValid = false;
    }

    const newValidArray = this.state.isAuthorsValid.slice();
    newValidArray.map((author: any, index: number) => {
      if (index === elemIndex) {
        author[key] = isValid;
      }
    });

    this.setState({
      ...this.state,
      isAuthorsValid: newValidArray,
    });

    this.validateForm();
  };

  validateForm = () => {
    let fieldsFormValid: boolean = Object.keys(this.state.fieldsValid).every(
      (key: any) => {
        if (this.state.fieldsValid[key] !== null && !this.state.fieldsValid[key]) {
          return false;
        }
        return true;
      },
    );

    let authorsFormValid: boolean =
      !!this.state.authors.length &&
      this.state.isAuthorsValid.every((author: any) => {
        return !!author.name && !!author.surname;
      });

    this.setState({
      isFormValid: fieldsFormValid && authorsFormValid,
    });
  };

  private addAuthor = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    const author = {
      name: '',
      surname: '',
    };

    const authorValid = {
      name: null,
      surname: null,
    };

    this.setState({
      ...this.state,
      authors: this.state.authors.concat(author),
      isAuthorsValid: this.state.isAuthorsValid.concat(authorValid),
      isFormValid: false,
    });
  };

  private removeAuthor = (elemIndex: number, e: any) => {
    e.preventDefault();
    const newAuthorArray = this.state.authors
      .slice()
      .filter((author: Author, index: number) => index !== elemIndex);
    const newAuthorValidityArray = this.state.isAuthorsValid
      .slice()
      .filter((author: ValidAuthor, index: number) => index !== elemIndex);

    this.setState({
      ...this.state,
      authors: newAuthorArray,
      isAuthorsValid: newAuthorValidityArray,
    });
    this.validateForm();
  };

  renderAuthors = () => {
    const { authors } = this.state;
    return (
      <div>
        <span>Авторы</span>
        <Button title="+ автора" size="small" onClick={this.addAuthor} />
        {authors.map((author: Author, index: number) => {
          return (
            <div key={`author:${index}`} className="form_item form_item--author">
              <Input
                label="Имя"
                name="name"
                value={author.name}
                required
                onBlur={() => this.validateAuthor('name', index)}
                onFocus={() => this.handleFocusAuthor('name', index)}
                onChange={this.handleChangeAuthor('name', index)}
                isValid={this.state.isAuthorsValid[index].name}
                clue="Не больше 20 символов"
              />
              <Input
                label="Фамилия"
                name="surname"
                value={author.surname}
                required
                onBlur={() => this.validateAuthor('surname', index)}
                onFocus={() => this.handleFocusAuthor('surname', index)}
                onChange={this.handleChangeAuthor('surname', index)}
                isValid={this.state.isAuthorsValid[index].surname}
                clue="Не больше 20 символов"
              />
              {authors.length > 1 && (
                <Button
                  size="small"
                  title="🗑️"
                  onClick={e => this.removeAuthor(index, e)}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { fields, authors } = this.state;
    const bookInfo = {
      ...fields,
      authors,
      id: `${fields.title}+${authors[0].name}`,
    };
    this.props.addBook(bookInfo as Books.Book);
    this.props.onClick();
  };

  render() {
    const {
      title,
      pages,
      publisher,
      publicationYear,
      editionDate,
      ISBN,
    } = this.state.fields;

    return (
      <form onSubmit={this.handleSubmitForm}>
        <Input
          label="Заголовок"
          name="title"
          value={title}
          required
          onBlur={() => this.validateInput('title', 'letters', { max: 30 }, true)}
          onFocus={() => this.handleFocus('title')}
          onChange={this.handleChange('title')}
          isValid={this.state.fieldsValid.title}
          clue="Не больше 30 символов"
        />
        {this.renderAuthors()}
        <Input
          label="Кол-во страниц"
          name="pages"
          value={pages}
          required
          onBlur={() => this.validateInput('pages', 'number', { max: 10000 }, true)}
          onFocus={() => this.handleFocus('pages')}
          onChange={this.handleChange('pages')}
          isValid={this.state.fieldsValid.pages}
          clue="Не больше 10 000"
        />
        <Input
          label="Издательство"
          name="publisher"
          value={publisher}
          onBlur={() => this.validateInput('publisher', 'letters', { max: 30 })}
          onFocus={() => this.handleFocus('publisher')}
          onChange={this.handleChange('publisher')}
          isValid={this.state.fieldsValid.publisher}
          clue="Не больше 30 символов"
        />
        <Input
          label="Год публикации"
          name="publicationYear"
          value={publicationYear}
          onBlur={() => this.validateInput('publicationYear', 'number', { min: 1800 })}
          onFocus={() => this.handleFocus('publicationYear')}
          onChange={this.handleChange('publicationYear')}
          isValid={this.state.fieldsValid.publicationYear}
          clue="Формат ГГГГ, не раньше 1800"
        />
        <Input
          label="Дата выхода в тираж"
          name="editionDate"
          value={editionDate}
          onBlur={() =>
            this.validateInput('editionDate', 'regexp', { pattern: fullYearValudate })
          }
          onFocus={() => this.handleFocus('editionDate')}
          onChange={this.handleChange('editionDate')}
          isValid={this.state.fieldsValid.editionDate}
          clue="Формат ДД.ММ.ГГГГ, не раньше 01.01.1800"
        />
        <Input
          label="ISBN"
          name="ISBN"
          value={ISBN}
          onBlur={() =>
            this.validateInput('ISBN', 'regexp', { pattern: fullYearValudate })
          }
          onFocus={() => this.handleFocus('ISBN')}
          onChange={this.handleChange('ISBN')}
          isValid={this.state.fieldsValid.ISBN}
          clue="????"
        />

        <div className="form_buttons">
          <Button title="Отмена" onClick={this.props.onClick} />
          <Button
            title="Добавить"
            type="primary"
            htmlType="submit"
            disabled={this.state.isFormValid !== null && !this.state.isFormValid}
          />
        </div>
      </form>
    );
  }
}

export default connect(
  null,
  {
    addBook,
  },
)(AddBookForm);
