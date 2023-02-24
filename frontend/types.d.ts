export interface Artist {
  _id: string;
  name: string;
  image: string;
  info: string;
}

export interface Album {
  _id: string;
  artist: {
    _id: string;
    name: string;
    image: string;
    info: string;
  }
  name: string;
  year: string;
  image: string;
}

export interface Track {
  _id: string;
  album: {
    _id: string;
    artist: {
      _id: string;
      name: string;
      image: string;
      info: string;
    }
    name: string;
    year: string;
    image: string;
  }
  name: string;
  time: string;
  trackNumber: number;
}