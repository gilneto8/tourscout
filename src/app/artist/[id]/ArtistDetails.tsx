'use client';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import ExpandableDiv from '@/components/ui/expandableDiv';
import { Tag } from 'lucide-react';
import sanitizeHtml from 'sanitize-html';

type Artist = {
  name: string;
  bio: string;
  tags: string[];
  similar: Array<{
    name: string;
    url: string;
    mbid?: string;
  }>;
};

export default function ClientArtistDetails({ artist }: { artist: Artist }) {
  const router = useRouter();

  const handleSimilarArtistClick = (similar: any) => {
    if (similar.mbid) {
      router.push(`/artist/${similar.mbid}`);
    } else {
      window.open(similar.url, '_blank');
    }
  };

  return (
    <div className='max-w-4xl mx-auto p-4'>
      <Card className='mb-6'>
        <CardHeader>
          <CardTitle>{artist.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            <div>
              <h3 className='font-semibold mb-2'>Biography</h3>
              <ExpandableDiv
                bio={sanitizeHtml(artist.bio, {
                  allowedTags: [],
                  allowedAttributes: {},
                })}
              />
            </div>

            <div>
              <h3 className='font-semibold mb-2'>Tags</h3>
              <div className='flex flex-wrap gap-2'>
                {artist.tags.map((tag: string) => (
                  <span key={tag} className='px-3 py-1 bg-blue-100 text-blue-800 rounded-full flex items-center gap-1'>
                    <Tag size={16} />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className='font-semibold mb-2'>Similar Artists</h3>
              <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                {artist.similar.map((similar) => (
                  <button
                    key={similar.name}
                    onClick={() => handleSimilarArtistClick(similar)}
                    className='p-2 border rounded hover:bg-gray-50'
                  >
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