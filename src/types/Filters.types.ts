import { Action } from '../types';

export namespace Filters {
  export interface State {
    [key: string]: {
      isActive: boolean;
      direction: 'ASC' | 'DESC';
    };
  }

  export type AC_Add = (sortParam: string) => Action;
  export type AC_Clear = () => Action;
}
