import { Filters, Action } from '../../types';

export const TOGGLE: string = 'filters/TOGGLE';
export const CLEAR: string = 'filters/CLEAR';

export const initialState: Filters.State = {
  year: {
    direction: 'ASC',
    isActive: false,
  },
  title: {
    direction: 'ASC',
    isActive: false,
  },
};

export default function reducer(
  state: Filters.State = initialState,
  action: Action = {},
): Filters.State {
  switch (action.type) {
    case TOGGLE: {
      return {};
    }

    case CLEAR: {
      return initialState;
    }
    default:
      return state;
  }
}

export const toggle: Filters.AC_Add = (sortParam: string) => {
  return {
    sortParam,
    type: TOGGLE,
  };
};

export const clear: Filters.AC_Clear = () => {
  return {
    type: CLEAR,
  };
};
