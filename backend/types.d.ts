export interface Link {
  id: string;
  url: string;
  shortUrl: string;
}

export type LinkWithoutId = Omit<Link, 'id'>;