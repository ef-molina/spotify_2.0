import React, { useState, useEffect } from 'react';
import { fetchFromAPI } from '../utils/API-Controller';
import { AlbumCard } from './Cards';
import { Flex, Grid, Grid2 } from './styles/Containers.style';
import { Link } from 'react-router-dom';

const Albums = () => {
  const [albums, setAlbums] = useState();

  if (albums) console.log(albums);

  useEffect(() => {
    console.log('Albums page loaded.');
    fetchFromAPI('me/albums?limit=30')
      .then((res) => setAlbums(res))
      .catch((err) => console.error(err));
  }, []);

  const albumsArray = albums?.items.map(({ album }) => (
    <AlbumCard key={album.id} album={album} />
  ));

  while (!albumsArray) return <h2> loading...</h2>;

  return (
    <Flex direction='column' overflowY='scroll'>
      <Grid>{albumsArray}</Grid>
    </Flex>
  );
};

export default Albums;
