'use client';
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Artist } from '@/lib/types/artist';

const searchArtist = async (query: string): Promise<Array<Artist>> => {
  const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
  const data = await response.json();
  return data;
};

const ArtistSearch = () => {
  const router = useRouter();
  const [query, setQuery] = useState<string>('');
  const [artists, setArtists] = useState<Array<Artist>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async (e: React.FormEvent) => {
    setArtists([]);
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const results = await searchArtist(query);
      setArtists(results);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-4xl p-4">
      <form onSubmit={handleSearch} className="mb-6 flex gap-2">
        <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search for an artist..." className="flex-1 rounded border p-2" />
        <button type="submit" disabled={loading} className="flex items-center gap-2 rounded bg-blue-500 px-4 py-2 text-white disabled:opacity-50">
          <Search size={20} />
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {artists
          .filter(artist => parseInt(artist.listeners) > 1000)
          .map((artist, index) => (
            <div
              key={index}
              className="cursor-pointer rounded border p-4 transition-shadow hover:shadow-lg"
              onClick={() => router.push(`/artist/${artist.id}`)}
            >
              <h3 className="mb-2 text-lg font-bold">{artist.name}</h3>
              {artist.listeners && <p className="text-gray-600">{parseInt(artist.listeners).toLocaleString()} listeners</p>}
            </div>
          ))}
      </div>
    </div>
  );
};

export default ArtistSearch;
