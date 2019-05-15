import React, { Component } from 'react';

import { Book } from '../../types';
import Input from '../Input/Input';

interface State extends Book {}

class AddBookForm extends Component<{}, State> {
  readonly state: State = {
    title: '',
    authors: [{ name: '', surname: '' }],
    pages: 0,
    publisher: '',
    publicationDate: 0,
    editionDate: '',
    ISBN: '',
  };

  private handleChange = (key: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ ...this.state, [key]: event.target.value });
  };
  render() {
    const { title, authors, pages, publisher, publicationDate, editionDate, ISBN } = this.state;
    return (
      <div>
        <Input
          label="Автор"
          name="title"
          value={title}
          required
          validateFormat={
            /^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:1[89]|2[0-9])\d{2})\s*$/
          }
          onChange={this.handleChange('title')}
        />
      </div>
    );
  }
}

export default AddBookForm;
