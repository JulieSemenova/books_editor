import * as React from 'react';

import Button from '../Button/Button';
import Filters from '../Filters/Filters';
import Popup from '../Popup/Popup';
import AddBookForm from '../AddBookForm/AddBookForm';

import './Controls.css';

interface State {
  isModalOpen: boolean;
}

class Controls extends React.Component<{}, State> {
  readonly state: State = {
    isModalOpen: false,
  };

  toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  };

  render() {
    return (
      <>
        <div className="controls">
          <Filters />
          <Button title="Добавить книгу" onClick={this.toggleModal} />
        </div>
        {this.state.isModalOpen && (
          <Popup title={'Добавить книгу'} onClick={this.toggleModal}>
            <AddBookForm />
          </Popup>
        )}
      </>
    );
  }
}

export default Controls;
