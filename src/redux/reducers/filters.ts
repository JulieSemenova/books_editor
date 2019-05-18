import { Filters, Action } from '../../types';

export const PICK_FILTER: string = 'filters/PICK_FILTER';
export const TOGGLE_DIRECTION: string = 'filters/TOGGLE_DIRECTION';
export const CLEAR: string = 'filters/CLEAR';

export const initialState: Filters.State = {
  param: 'default',
  direction: 'ASC',
};

export default function reducer(
  state: Filters.State = initialState,
  action: Action = {},
): Filters.State {
  switch (action.type) {
    case PICK_FILTER: {
      const param = action.data;
      return {
        ...state,
        param,
        direction: 'ASC',
      };
    }
    case TOGGLE_DIRECTION: {
      const direction = state.direction === 'ASC' ? 'DESC' : 'ASC';
      return {
        ...state,
        direction,
      };
    }

    case CLEAR: {
      return initialState;
    }
    default:
      return state;
  }
}

export const pickFilter: Filters.AC_PickFilter = (data: string) => {
  return {
    data,
    type: PICK_FILTER,
  };
};

export const toggleDirection: Filters.AC_ToggleDirection = () => {
  return {
    type: TOGGLE_DIRECTION,
  };
};

export const clear: Filters.AC_Clear = () => {
  return {
    type: CLEAR,
  };
};
