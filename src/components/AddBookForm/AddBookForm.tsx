import React, { Component } from 'react';

import { Book, Author } from '../../types';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { fullYearValudate } from '../../constants';
import './AddBookForm.css';

interface State {
  fields: {
    [key: string]: string;
  };
  fieldsValid: {
    [key: string]: boolean | null;
  };
  authors: Author[];
  isAuthorsValid: [{ name: boolean | null; surname: boolean | null }];
  isFormValid: boolean;
}

interface Props {
  onClick: () => void;
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

  private handleChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      fields: {
        ...this.state.fields,
        [key]: event.target.value,
      },
    });
  };

  private handleFocus = (key: string) => {
    this.setState({
      ...this.state,
      fieldsValid: {
        ...this.state.fieldsValid,
        [key]: null,
      },
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
    if (required && (!value || !value.length)) {
      isValid = false;
    }
    if (type === 'letters') {
      const valueLength = value.length;
      if (validateRule.max && valueLength > validateRule.max) {
        isValid = false;
      }
    }

    if (type === 'number') {
      const digits = /[0-9]/;

      if (value !== '') {
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
    }

    if (type === 'regexp') {
      if (validateRule.pattern && value && !validateRule.pattern.test(value)) {
        isValid = false;
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
    newValidArray[elemIndex][key] = isValid;
    console.log(newValidArray);

    // this.setState({
    //   ...this.state,
    //   isAuthorsValid: newValidArray,
    // });

    this.validateForm();
  };

  validateForm = () => {
    let isFormValid: boolean = Object.keys(this.state.fieldsValid).every((key: any) => {
      if (this.state.fieldsValid[key] !== null && !this.state.fieldsValid[key]) {
        return false;
      }
      return true;
    });

    this.setState({
      isFormValid,
    });
  };

  renderAuthors = () => {
    const { authors } = this.state;
    return (
      <>
        {authors.map((author: Author, index: number) => {
          return (
            <div key={`author:${index}`} className="form_item form_item--author">
              <Input
                label="Имя"
                name="name"
                value={author.name}
                required
                onBlur={() => this.validateAuthor('name', index)}
                onFocus={() => this.handleFocus('title')}
                onChange={this.handleChange('title')}
                isValid={this.state.isAuthorsValid[index].name}
                clue="Не больше 20 символов"
              />
              <Input
                label="Фамилия"
                name="surname"
                value={author.surname}
                required
                onBlur={() => this.validateAuthor('surname', index)}
                onFocus={() => this.handleFocus('title')}
                onChange={this.handleChange('title')}
                isValid={this.state.isAuthorsValid[index].surname}
                clue="Не больше 20 символов"
              />
            </div>
          );
        })}
      </>
    );
  };
  render() {
    const { title, pages, publisher, publicationYear, editionDate, ISBN } = this.state.fields;

    return (
      <form>
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
          onBlur={() => this.validateInput('publicationYear', 'letters', { min: 30 })}
          onFocus={() => this.handleFocus('publicationYear')}
          onChange={this.handleChange('publicationYear')}
          isValid={this.state.fieldsValid.publicationYear}
          clue="Формат ГГГГ, не раньше 1800"
        />
        <Input
          label="Дата выхода в тираж"
          name="editionDate"
          value={editionDate}
          onBlur={() => this.validateInput('editionDate', 'regexp', { pattern: fullYearValudate })}
          onFocus={() => this.handleFocus('editionDate')}
          onChange={this.handleChange('editionDate')}
          isValid={this.state.fieldsValid.editionDate}
          clue="Формат ДД.ММ.ГГГГ, не раньше 01.01.1800"
        />
        <Input
          label="ISBN"
          name="ISBN"
          value={ISBN}
          onBlur={() => this.validateInput('ISBN', 'regexp', { pattern: fullYearValudate })}
          onFocus={() => this.handleFocus('ISBN')}
          onChange={this.handleChange('ISBN')}
          isValid={this.state.fieldsValid.ISBN}
          clue="????"
        />

        <div className="form_buttons">
          <Button title="Отмена" onClick={(e: any) => e.preventDefault()} />
          <Button
            title="Добавить"
            type="primary"
            disabled={this.state.isFormValid !== null && !this.state.isFormValid}
            onClick={(e: any) => e.preventDefault()}
          />
        </div>
      </form>
    );
  }
}

export default AddBookForm;
