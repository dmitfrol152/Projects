export interface IBooks {
  volumeInfo: {
    title: string;
    imageLinks: {
      smallThumbnail: string;
      thumbnail: string;
    };
    previewLink: string;
  };
}

export type BookStatus = "" | "plan" | "readed" | "reading";
