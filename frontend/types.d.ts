export interface Post {
  id: string;
  author: string;
  message: string;
  image: string | null;
}

export interface PostApi {
  author: string;
  message: string;
  image: File | null;
}