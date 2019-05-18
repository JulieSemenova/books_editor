import * as React from 'react';
import { connect } from 'react-redux';

import { Filters, Action } from '../../types';
import { pickFilter, toggleDirection, clear } from '../../redux/reducers/filters';
import './Filters.css';

interface Props {
  clear: Filters.AC_Clear;
  filters: Filters.State;
  pickFilter: Filters.AC_PickFilter;
  toggleDirection: Filters.AC_ToggleDirection;
}

class FiltersContainer extends React.Component<Props, {}> {
  getFilterClassName = (param: Filters.SortParam) => {
    let className = 'filters_item';
    if (param === this.props.filters.param) {
      className += ' filters_item--active';
    }
    return className;
  };

  getFilterDirectionClassName = (direction: Filters.Diretion) => {
    let className = 'filters_item';
    if (direction === this.props.filters.direction) {
      className += ' filters_item--active';
    }
    return className;
  };

  render() {
    const { clear, pickFilter, toggleDirection } = this.props;

    return (
      <section className="filters">
        <div className="filters_params">
          <span className="filters_paramsTitle">Сортировать по:</span>
          <span
            className={this.getFilterClassName('default')}
            onClick={() => pickFilter('default')}
          >
            умолчанию
          </span>
          <span
            className={this.getFilterClassName('title')}
            onClick={() => pickFilter('title')}
          >
            названию
          </span>
          <span
            className={this.getFilterClassName('year')}
            onClick={() => pickFilter('year')}
          >
            году издания
          </span>
        </div>

        <div className="filters_params">
          <span className="filters_paramsTitle">Направление сортировки:</span>
          <span
            className={this.getFilterDirectionClassName('ASC')}
            onClick={() => toggleDirection()}
          >
            по возрастанию / (а-я)
          </span>
          <span
            className={this.getFilterDirectionClassName('DESC')}
            onClick={() => toggleDirection()}
          >
            по убыванию / (я-а)
          </span>
        </div>

        <div className="filters_clear" onClick={() => clear()}>
          Сбросить фильтры
        </div>
      </section>
    );
  }
}

export default connect(
  ({ filters }: any) => ({ filters }),
  { pickFilter, toggleDirection, clear },
)(FiltersContainer);
