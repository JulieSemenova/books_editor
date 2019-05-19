import * as React from 'react';
import { connect } from 'react-redux';
import { v4 } from 'node-uuid';

import { Books, Author } from '../../types';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { fullYearValudate } from '../../constants';
import { addBook, updateBook, uploadImage } from '../../redux/reducers/books';

import './AddBookForm.css';

type ValidAuthor = { name: boolean | null; surname: boolean | null };
interface State {
  fields: {
    [key: string]: string;
  };
  isFieldsValid: {
    [key: string]: boolean | null;
  };
  authors: Author[];
  isAuthorsValid: ValidAuthor[];
  isFormValid: boolean;
  imageUrl: string | undefined;
}

interface Props {
  onClick: () => void;
  addBook: Books.AC_AddBook;
  updateBook: Books.AC_UpdateBook;
  uploadImage: Books.AC_UploadImage;
  book?: Books.Book;
}

class AddBookForm extends React.Component<Props, State> {
  readonly state: State = {
    fields: {
      title: this.props.book ? this.props.book.title : '',
      pages: this.props.book ? this.props.book.pages : '',
      publisher:
        this.props.book && this.props.book.publisher ? this.props.book.publisher : '',
      publicationYear:
        this.props.book && this.props.book.publicationYear
          ? this.props.book.publicationYear
          : '',
      editionDate:
        this.props.book && this.props.book.editionDate ? this.props.book.editionDate : '',
      ISBN: this.props.book && this.props.book.ISBN ? this.props.book.ISBN : '',
      img: this.props.book ? this.props.book.img : '',
    },
    authors: this.props.book
      ? this.props.book.authors
      : [
          {
            name: '',
            surname: '',
          },
        ],
    isAuthorsValid: this.props.book
      ? new Array(this.props.book.authors.length).fill({ name: null, surname: null })
      : [{ name: null, surname: null }],
    isFieldsValid: {
      title: null,
      pages: null,
      publisher: null,
      publicationYear: null,
      editionDate: null,
      ISBN: null,
    },
    isFormValid: this.props.book ? true : false,
    imageUrl: this.props.book ? this.props.book.img : '',
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
        isFieldsValid: {
          ...this.state.isFieldsValid,
          [key]: false,
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
        return (author[key] = event.target.value);
      }
      return author;
    });

    this.setState(
      {
        ...this.state,
        authors: authorsNew,
      },
      () => this.validateForm(),
    );
  };

  handleUploadImage = async (e: any) => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'sickfits');

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/graphql-advanced/image/upload',
      {
        method: 'POST',
        body: data,
      },
    );

    const file = await res.json();
    console.log(file);
    this.setState(
      {
        fields: {
          img: file.secure_url,
        },
      },
      () =>
        this.props.book
          ? this.props.uploadImage(this.props.book.id, file.secure_url)
          : '',
    );
  };

  private handleFocus = (key: string) => {
    this.setState({
      ...this.state,
      isFieldsValid: {
        ...this.state.isFieldsValid,
        [key]: true,
      },
      isFormValid: false,
    });
  };

  private handleFocusAuthor = (key: string, elemIndex: number) => {
    const newAuthor = this.state.isAuthorsValid.slice();
    newAuthor.map((author: any, index: number) => {
      if (index === elemIndex) {
        return (author[key] = true);
      }
      return author;
    });

    this.setState({
      ...this.state,
      isAuthorsValid: newAuthor,
      isFormValid: false,
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
      isFieldsValid: {
        ...this.state.isFieldsValid,
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
        return (author[key] = isValid);
      }
      return author;
    });

    this.setState(
      {
        ...this.state,
        isAuthorsValid: newValidArray,
      },
      () => this.validateForm(),
    );
  };

  validateForm = () => {
    let fieldsFormValid: boolean = Object.keys(this.state.isFieldsValid).every(
      (key: any) => {
        if (this.state.isFieldsValid[key] !== null) {
          return this.state.isFieldsValid[key]!;
        }
        return true;
      },
    );

    let authorsFormValid: boolean =
      !!this.state.authors.length &&
      this.state.isAuthorsValid.every((author: ValidAuthor) => {
        if (author.name !== null) {
          return author.name;
        }
        if (author.surname !== null) {
          return author.surname;
        }
        return true;
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

    const newAuthors = this.state.authors.slice();
    const newAuthorsValidity = this.state.isAuthorsValid.slice();

    this.setState({
      ...this.state,
      authors: newAuthors.concat(author),
      isAuthorsValid: newAuthorsValidity.concat(authorValid),
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
      id: this.props.book ? this.props.book.id : v4(),
    };
    this.props.book
      ? this.props.updateBook(this.props.book.id, bookInfo as Books.Book)
      : this.props.addBook(bookInfo as Books.Book);
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
      img,
    } = this.state.fields;

    return (
      <form onSubmit={this.handleSubmitForm}>
        {img && <img width="150" src={img} alt="Превью обложки" />}
        <Input
          label="Обложка"
          name="img"
          value={''}
          onBlur={() => {}}
          onFocus={() => {}}
          onChange={this.handleUploadImage}
          type="file"
          clue="Загрузите изображение"
        />
        <Input
          label="Заголовок"
          name="title"
          value={title}
          required
          onBlur={() => this.validateInput('title', 'letters', { max: 30 }, true)}
          onFocus={() => this.handleFocus('title')}
          onChange={this.handleChange('title')}
          isValid={this.state.isFieldsValid.title}
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
          isValid={this.state.isFieldsValid.pages}
          clue="Не больше 10 000"
        />
        <Input
          label="Издательство"
          name="publisher"
          value={publisher}
          onBlur={() => this.validateInput('publisher', 'letters', { max: 30 })}
          onFocus={() => this.handleFocus('publisher')}
          onChange={this.handleChange('publisher')}
          isValid={this.state.isFieldsValid.publisher}
          clue="Не больше 30 символов"
        />
        <Input
          label="Год публикации"
          name="publicationYear"
          value={publicationYear}
          onBlur={() => this.validateInput('publicationYear', 'number', { min: 1800 })}
          onFocus={() => this.handleFocus('publicationYear')}
          onChange={this.handleChange('publicationYear')}
          isValid={this.state.isFieldsValid.publicationYear}
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
          isValid={this.state.isFieldsValid.editionDate}
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
          isValid={this.state.isFieldsValid.ISBN}
          clue="????"
        />

        <div className="form_buttons">
          <Button title="Отмена" onClick={this.props.onClick} />
          <Button
            title="Добавить"
            type="primary"
            htmlType="submit"
            // disabled={!this.state.isFormValid}
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
    updateBook,
    uploadImage,
  },
)(AddBookForm);
