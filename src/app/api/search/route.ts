'use server';
import { LastFMAPI } from '@/lib/api/lastfm';
import { NextResponse } from 'next/server';

const lastfm = new LastFMAPI(process.env.LASTFM_API_KEY!);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter required' }, { status: 400 });
  }

  try {
    const results = await lastfm.searchArtist(query);
    return NextResponse.json(results);
  } catch (error) {
    console.error('LastFM API error:', error);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}
