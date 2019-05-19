import * as React from 'react';
import { v4 } from 'node-uuid';

import Input from '../Input/Input';
import Button from '../Button/Button';
import { Books } from '../../types';
import { fullYearValidate } from '../../constants';

type Author = {
  name: FormSimpleInput;
  surname: FormSimpleInput;
};
type ValidateRules = {
  type?: 'letters' | 'numbers' | 'regexp';
  min?: number;
  max?: number;
  pattern?: RegExp;
};

type FormSimpleInput = {
  value: string;
  isValid: boolean | null;
  validateRules: ValidateRules;
  required: boolean;
  label?: string;
  clue?: string;
};
interface Props {
  onClick?: () => void;
}
interface State {
  fields: {
    title: FormSimpleInput;
    pages: FormSimpleInput;
    publisher: FormSimpleInput;
    publicationYear: FormSimpleInput;
    editionDate: FormSimpleInput;
    ISBN: FormSimpleInput;
    authors: Author[];
  };
  img: string;
  isFormValid: boolean;
}

class EditBookForm extends React.Component<Props, State> {
  state: State = {
    fields: {
      title: {
        value: '',
        isValid: null,
        label: 'Заголовок',
        clue: 'Не больше 30 символов',
        validateRules: {
          type: 'letters',
          max: 30,
        },
        required: true,
      },
      pages: {
        value: '',
        isValid: null,
        required: true,
        label: 'Кол-во страниц',
        clue: 'Не больше 10 000',
        validateRules: {
          type: 'numbers',
          max: 10000,
        },
      },
      publisher: {
        value: '',
        isValid: null,
        required: false,
        label: 'Издательство',
        clue: 'Не больше 30 символов',
        validateRules: {
          type: 'letters',
          max: 30,
        },
      },
      publicationYear: {
        value: '',
        isValid: null,
        required: false,
        label: 'Год публикации',
        clue: 'Не раньше 1800',
        validateRules: {
          type: 'numbers',
          min: 1800,
        },
      },
      editionDate: {
        value: '',
        isValid: null,
        required: false,
        label: 'Дата выхода в тираж',
        clue: 'Формат ДД.ММ.ГГГГ, не раньше 01.01.1800',
        validateRules: {
          type: 'regexp',
          pattern: fullYearValidate,
        },
      },
      ISBN: {
        value: '',
        isValid: null,
        required: false,
        label: 'ISBN',
        validateRules: {
          type: 'regexp',
        },
      },
      authors: [
        {
          name: {
            value: '',
            isValid: null,
            required: true,
            label: 'Имя',
            validateRules: {
              type: 'letters',
              max: 20,
            },
          },
          surname: {
            value: '',
            isValid: null,
            required: true,
            label: 'Фамилия',
            validateRules: {
              type: 'letters',
              max: 20,
            },
          },
        },
      ],
    },
    img: '',
    isFormValid: true,
  };

  handleChange = (key: keyof State['fields']) => (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    this.setState({
      ...this.state,
      fields: {
        ...this.state.fields,
        [key]: {
          ...this.state.fields[key],
          value: event.target.value,
        },
      },
    });
  };

  private handleChangeAuthor = (key: keyof Author, elemIndex: number) => (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newAuthorArray = this.state.fields.authors.slice();
    newAuthorArray.map((author: Author, index: number) => {
      if (index === elemIndex) {
        return (author[key].value = event.target.value);
      }
      return author;
    });

    this.setState({
      ...this.state,
      fields: {
        ...this.state.fields,
        authors: newAuthorArray,
      },
    });
  };

  private removeAuthor = (elemIndex: number, e: any) => {
    e.preventDefault();
    const newAuthorArray = this.state.fields.authors
      .slice()
      .filter((_: Author, index: number) => index !== elemIndex);

    this.setState({
      ...this.state,
      fields: {
        ...this.state.fields,
        authors: newAuthorArray,
      },
    });
  };

  private addAuthor = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    const newAuthors = this.state.fields.authors.slice();

    this.setState({
      ...this.state,
      fields: {
        ...this.state.fields,
        authors: newAuthors.concat({
          name: {
            value: '',
            isValid: null,
            required: true,
            label: 'Имя',
            validateRules: {
              type: 'letters',
              max: 20,
            },
          },
          surname: {
            value: '',
            isValid: null,
            required: true,
            label: 'Фамилия',
            validateRules: {
              type: 'letters',
              max: 20,
            },
          },
        }),
      },
    });
  };

  renderAuthors = () => {
    const { authors } = this.state.fields;
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
                value={author.name.value}
                required
                onBlur={() => this.validateAuthor('name', index)}
                onChange={this.handleChangeAuthor('name', index)}
                isValid={author.name.isValid}
                clue="Не больше 20 символов"
              />
              <Input
                label="Фамилия"
                name="surname"
                value={author.surname.value}
                required
                onBlur={() => this.validateAuthor('surname', index)}
                onChange={this.handleChangeAuthor('surname', index)}
                isValid={author.surname.isValid}
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

  validateInput = (
    key: string,
    value: string,
    validateRules: ValidateRules,
    required: boolean,
  ) => {
    let isValid = true;
    const { min, max, pattern, type } = validateRules;
    if (required && (!value || value === '')) {
      isValid = false;
    } else {
      if (type === 'letters' && value !== '') {
        const valueLength = value.length;
        if (max && valueLength > max) {
          isValid = false;
        }
      }

      if (type === 'numbers' && value !== '') {
        const digits = /^[0-9]+$/;

        if (!digits.test(value)) {
          isValid = false;
        }
        if (min && +value < min) {
          isValid = false;
        }
        if (max && +value > max) {
          isValid = false;
        }
      }

      if (type === 'regexp') {
        if (pattern && value && !pattern.test(value)) {
          isValid = false;
        }
      }
    }

    this.setState({
      ...this.state,
      fields: {
        ...this.state.fields,
        [key]: {
          ...this.state.fields[key as keyof State['fields']],
          isValid,
        },
      },
    });
  };

  validateAuthor = (key: keyof Author, elemIndex: number) => {
    const { authors } = this.state.fields;
    const value = authors[elemIndex][key].value;
    const { max } = authors[elemIndex][key].validateRules;

    let isValid = true;
    if (!value || !value.length) {
      isValid = false;
    }
    if (value.length > max!) {
      isValid = false;
    }

    const newAuthorsArray = this.state.fields.authors.slice();
    newAuthorsArray.map((author: Author, index: number) => {
      if (index === elemIndex) {
        return (author[key].isValid = isValid);
      }
      return author;
    });

    this.setState({
      ...this.state,
      fields: {
        ...this.state.fields,
        authors: newAuthorsArray,
      },
    });
  };

  checkFormValidation = () => {
    const { fields } = this.state;
    const simpleInputsKeys = Object.keys(fields).filter(
      key => key !== 'authors',
    ) as (keyof State['fields'])[];
    return true;
    // const simpleFieldsValid = simpleInputsKeys.every((key: keyof State['fields']) => (fields[key]).isValid)
  };

  handleSubmitForm = () => {};

  render() {
    const { fields } = this.state;
    const simpleFields = Object.keys(fields).filter(
      key => key !== 'title' && key !== 'authors',
    );
    const titleItem = fields.title;

    return (
      <form onSubmit={this.handleSubmitForm}>
        <Input
          label={titleItem.label}
          name={'title'}
          value={titleItem.value}
          required={titleItem.required}
          isValid={titleItem.isValid}
          onChange={this.handleChange('title')}
          onBlur={() =>
            this.validateInput(
              'title',
              titleItem.value,
              titleItem.validateRules,
              titleItem.required,
            )
          }
          clue={titleItem.clue}
        />
        {this.renderAuthors()}
        {simpleFields.map((key: any) => {
          const formItem = fields[key as keyof State['fields']] as FormSimpleInput;
          return (
            <Input
              label={formItem.label}
              name={key}
              key={key}
              value={formItem.value}
              required={formItem.required}
              isValid={formItem.isValid}
              onChange={this.handleChange(key)}
              onBlur={() =>
                this.validateInput(
                  key,
                  formItem.value,
                  formItem.validateRules,
                  formItem.required,
                )
              }
              clue={formItem.clue}
            />
          );
        })}
        <div className="form_buttons">
          <Button title="Отмена" onClick={this.props.onClick} />
          <Button
            title="Добавить"
            type="primary"
            htmlType="submit"
            disabled={!this.checkFormValidation()}
          />
        </div>
      </form>
    );
  }
}

export default EditBookForm;
