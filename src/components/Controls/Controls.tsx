import React, { Component } from 'react';

import Button from '../Button/Button';
import Filters from '../Filters/Filters';
import './Controls.css';

class Controls extends Component {
  render() {
    return (
      <div className="controls">
        <Filters />
        <Button title="Добавить книгу" onClick={() => console.log('add')} />
      </div>
    );
  }
}

export default Controls;
