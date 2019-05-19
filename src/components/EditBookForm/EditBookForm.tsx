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

const EmptyAuthor: Author = {
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
};

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
      authors: [EmptyAuthor],
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
        authors: newAuthors.concat(EmptyAuthor),
      },
    });
  };

  renderAuthors = () => {
    const { authors } = this.state.fields;
    return authors.map((author: Author, index: number) => {
      return (
        <div key={`author:${index}`} className="form_item form_item--author">
          {Object.keys(author).map((key: string) => {
            const formItem = author[key as keyof Author];
            return (
              <Input
                label={formItem.label}
                name={`author:${index}_${key}`}
                key={v4()}
                value={formItem.value}
                required={formItem.required}
                isValid={formItem.isValid}
                onChange={this.handleChangeAuthor(key as keyof Author, index)}
                clue={formItem.clue}
                onBlur={() => {}}
              />
            );
          })}
          {authors.length > 1 && (
            <Button size="small" title="🗑️" onClick={e => this.removeAuthor(index, e)} />
          )}
        </div>
      );
    });
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

  handleSubmitForm = () => {};

  render() {
    const { fields } = this.state;
    const bookFields = Object.keys(fields).filter(
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
        <div>
          <span>Авторы</span>
          <Button title="+ автора" size="small" onClick={this.addAuthor} />
          {this.renderAuthors()}
        </div>

        {bookFields.map((key: any) => {
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
      </form>
    );
  }
}

export default EditBookForm;
