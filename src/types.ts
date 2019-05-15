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
