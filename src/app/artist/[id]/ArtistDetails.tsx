'use client';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import ExpandableDiv from '@/components/ui/expandableDiv';
import { Tag } from 'lucide-react';
import sanitizeHtml from 'sanitize-html';
import { ArtistDetailedInfo, SimilarArtist } from '@/lib/types/artist';

export default function ArtistDetails({ artist }: { artist: ArtistDetailedInfo }) {
  const router = useRouter();

  const handleSimilarArtistClick = (similar: SimilarArtist) => {
    if (similar.id) {
      router.push(`/artist/${similar.id}`);
    } else {
      window.open(similar.url, '_blank');
    }
  };

  return (
    <div className="mx-auto max-w-4xl p-4">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{artist.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 font-semibold">Biography</h3>
              <ExpandableDiv
                content={sanitizeHtml(artist.bio, {
                  allowedTags: [],
                  allowedAttributes: {},
                })}
              />
            </div>

            <div>
              <h3 className="mb-2 font-semibold">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {artist.tags.map((tag: string) => (
                  <span key={tag} className="flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-blue-800">
                    <Tag size={16} />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-2 font-semibold">Similar Artists</h3>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {artist.similar.map(similar => (
                  <button key={similar.name} onClick={() => handleSimilarArtistClick(similar)} className="rounded border p-2 hover:bg-gray-50">
                    {similar.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
