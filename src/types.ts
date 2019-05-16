export type Book = {
  title: string;
  authors: Author[];
  pages: string;
  publisher?: string;
  publicationYear?: string;
  editionDate?: string;
  ISBN?: string;
  img?: any;
};
export type Author = {
  name: string;
  surname: string;
};

export interface ReduxState {
  filters: Filters.State;
}

export interface Action {
  type?: string;
  data?: any;
  [key: string]: any;
}

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
