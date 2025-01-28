export class LastFMAPI {
  private baseUrl = 'http://ws.audioscrobbler.com/2.0/';

  constructor(private apiKey: string) {}

  private async fetch(method: string, params: Record<string, string>) {
    const searchParams = new URLSearchParams({
      method,
      api_key: this.apiKey,
      format: 'json',
      ...params,
    });

    const response = await fetch(`${this.baseUrl}?${searchParams}`);
    return response.json();
  }

  async searchArtist(query: string) {
    const data = await this.fetch('artist.search', { artist: query });
    return data.results.artistmatches.artist.map((artist: any) => ({
      id: artist.mbid,
      name: artist.name,
      listeners: artist.listeners,
      url: artist.url,
    }));
  }

  async getArtistInfo(mbid: string) {
    const [infoData, similarData] = await Promise.all([this.fetch('artist.getInfo', { mbid }), this.fetch('artist.getSimilar', { mbid })]);

    return {
      id: infoData.artist.mbid,
      name: infoData.artist.name,
      bio: infoData.artist.bio.content,
      tags: infoData.artist.tags.tag.map((t: any) => t.name),
      similar: similarData.similarartists.artist.map((a: any) => ({
        name: a.name,
        url: a.url,
        mbid: a.mbid,
      })),
    };
  }
}
