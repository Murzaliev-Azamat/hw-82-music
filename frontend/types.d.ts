export interface Artist {
  _id: string;
  name: string;
  image: string;
  info: string;
}

export interface Album {
  _id: string;
  artist: {
    id: string;
    name: string;
    image: string;
    info: string;
  }
  name: string;
  year: string;
  image: string;
}