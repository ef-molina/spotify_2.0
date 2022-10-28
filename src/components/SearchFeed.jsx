import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchFromAPI } from '../utils/API-Controller';
import { Link } from 'react-router-dom';
import { Flex } from './styles/Containers.style';
import { ScrollRow } from './styles/Dash.style';
import { AlbumCard, ArtistCard, TrackCard } from './Cards';

const SearchFeed = () => {
  const [searchResults, setSearchResults] = useState();
  console.log(searchResults);

  const { query } = useParams();

  useEffect(() => {
    fetchFromAPI(`search?q=${query}&type=album,track,artist`)
      .then((res) => setSearchResults(res))
      .catch((err) => console.error(err));
  }, [query]);

  const searchArtist = searchResults?.artists?.items?.map((artist) => (
    <ArtistCard key={artist.id} artist={artist} />
  ));

  const searchAlbums = searchResults?.albums?.items?.map((album) => (
    <AlbumCard key={album.id} album={album} />
  ));

  const searchTracks = searchResults?.tracks?.items?.map((track) => (
    <TrackCard key={track.id} track={track} />
  ));

  while (!searchResults) return <h2> loading...</h2>;

  return (
    <Flex direction='column' gap='1rem' overflowY='auto'>
      <h2 style={{ paddingLeft: '1rem' }}>Artists:</h2>
      <ScrollRow>{searchArtist}</ScrollRow>
      <h2 style={{ paddingLeft: '1rem' }}>Albums:</h2>
      <ScrollRow>{searchAlbums}</ScrollRow>
      <h2 style={{ paddingLeft: '1rem' }}>Tracks:</h2>
      <ScrollRow>{searchTracks}</ScrollRow>
    </Flex>
  );
};

export default SearchFeed;
