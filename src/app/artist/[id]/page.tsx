import ClientArtistDetails from './ArtistDetails';
import { LastFMAPI } from '@/lib/api/lastfm';

export default async function ArtistPage({ params }: { params: Promise<{ id: string }> }) {
  const lastfm = new LastFMAPI(process.env.LASTFM_API_KEY!);
  const artist = await lastfm.getArtistInfo((await params).id);
  
  return <ClientArtistDetails artist={artist} />;
}