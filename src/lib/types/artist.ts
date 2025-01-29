export type Artist = {
  id: string;
  name: string;
  listeners: string;
  url: string;
};

export type SimilarArtist = {
  name: string;
  url: string;
  id?: string;
};

export type ArtistDetailedInfo = {
  name: string;
  bio: string;
  tags: string[];
  similar: Array<SimilarArtist>;
};
