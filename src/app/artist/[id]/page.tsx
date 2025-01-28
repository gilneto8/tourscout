import ArtistDetails from './ArtistDetails';
import { LastFMAPI } from '@/lib/api/lastfm';

const ArtistDetail = async ({ params }: { params: { id: string } }) => {
  const lastfm = new LastFMAPI(process.env.LASTFM_API_KEY!);
  const artist = await lastfm.getArtistInfo(params.id);
  return <ArtistDetails artist={artist} />;
};

export default ArtistDetail;
