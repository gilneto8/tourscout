'use client';
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

const searchArtist = async (query: string) => {
  const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
  const data = await response.json();
  return data;
};

const ArtistSearch = () => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(false);

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
    <div className='w-full max-w-4xl mx-auto p-4'>
      <form onSubmit={handleSearch} className='flex gap-2 mb-6'>
        <input
          type='text'
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder='Search for an artist...'
          className='flex-1 p-2 border rounded'
        />
        <button
          type='submit'
          disabled={loading}
          className='px-4 py-2 bg-blue-500 text-white rounded flex items-center gap-2 disabled:opacity-50'
        >
          <Search size={20} />
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {artists
          .filter((artist: any) => artist.listeners > 1000)
          .map((artist: any, index: number) => (
            <div
              key={index}
              className='p-4 border rounded hover:shadow-lg transition-shadow cursor-pointer'
              onClick={() => router.push(`/artist/${artist.id}`)}
            >
              <h3 className='font-bold text-lg mb-2'>{artist.name}</h3>
              {artist.listeners && <p className='text-gray-600'>{parseInt(artist.listeners).toLocaleString()} listeners</p>}
            </div>
          ))}
      </div>
    </div>
  );
};

export default ArtistSearch;
