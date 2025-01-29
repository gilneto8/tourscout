import { Artist, ArtistDetailedInfo } from '../types/artist';
import { LastFMGetArtistInfoResponse, LastFMGetSimilarArtistsResponse, LastFMSearchArtistResponse } from '../types/lastfm';

export class LastFMAPI {
  private baseUrl = 'http://ws.audioscrobbler.com/2.0/';

  constructor(private apiKey: string) {}

  private async fetch<T>(method: string, params: Record<string, string>): Promise<T> {
    const searchParams = new URLSearchParams({
      method,
      api_key: this.apiKey,
      format: 'json',
      ...params,
    });

    const response = await fetch(`${this.baseUrl}?${searchParams}`);
    return response.json() as T;
  }

  async searchArtist(query: string): Promise<Artist[]> {
    const data = await this.fetch<LastFMSearchArtistResponse>('artist.search', { artist: query });
    return data.results.artistmatches.artist.map(
      artist =>
        ({
          id: artist.mbid,
          name: artist.name,
          listeners: artist.listeners,
          url: artist.url,
        }) as Artist
    );
  }

  async getArtistInfo(mbid: string): Promise<ArtistDetailedInfo> {
    const [infoData, similarData] = await Promise.all([
      this.fetch<LastFMGetArtistInfoResponse>('artist.getInfo', { mbid }),
      this.fetch<LastFMGetSimilarArtistsResponse>('artist.getSimilar', { mbid }),
    ]);

    return {
      id: infoData.artist.mbid,
      name: infoData.artist.name,
      bio: infoData.artist.bio.content,
      tags: infoData.artist.tags.tag.map(t => t.name),
      similar: similarData.similarartists.artist.map(a => ({
        name: a.name,
        url: a.url,
        id: a.mbid,
      })),
    } as ArtistDetailedInfo;
  }
}
