import React, { useState, useEffect } from 'react';
import { fetchFromAPI } from '../utils/API-Controller';
import { ArtistCard } from './Cards';
import { Flex, Grid } from './styles/Containers.style';
import { Link } from 'react-router-dom';

const Artists = () => {
  const [artists, setArtists] = useState();
  if (artists) console.log(artists);

  useEffect(() => {
    console.log('Artists page loaded.');
    fetchFromAPI('me/top/artists?limit=30')
      .then((res) => setArtists(res))
      .catch((err) => console.error(err));
  }, []);

  const artistsArray = artists?.items.map((artist) => (
    <ArtistCard key={artist.id} artist={artist} />
  ));

  while (!artistsArray) return <h2> loading...</h2>;

  return (
    <Flex direction='column' overflowY='scroll'>
      <Grid>{artistsArray}</Grid>
    </Flex>
  );
};

export default Artists;
