export type LastFMSearchArtistResponse = {
  results: {
    artistmatches: {
      artist: Array<{
        mbid: string;
        name: string;
        listeners: string;
        url: string;
      }>;
    };
  };
};

export type LastFMGetArtistInfoResponse = {
  artist: {
    mbid: string;
    name: string;
    bio: {
      content: string;
    };
    tags: {
      tag: Array<{ name: string }>;
    };
  };
};

export type LastFMGetSimilarArtistsResponse = {
  similarartists: {
    artist: Array<{
      name: string;
      url: string;
      mbid: string;
    }>;
  };
};
