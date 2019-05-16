import { Filters } from './types/Filters.types';

export type Author = {
  name: string;
  surname: string;
};

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

export interface ReduxState {
  filters: Filters.State;
}

export interface Action {
  type?: string;
  data?: any;
  [key: string]: any;
}
