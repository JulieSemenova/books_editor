export type Author = {
  name: string;
  surname: string;
};

export type Book = {
  title: string;
  authors: Author[];
  pages: number;
  publisher?: string;
  publicationDate?: number;
  editionDate?: string;
  ISBN?: string;
  img?: any;
};
