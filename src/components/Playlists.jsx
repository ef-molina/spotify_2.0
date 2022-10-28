import React, { useState, useEffect } from 'react';
import { fetchFromAPI } from '../utils/API-Controller';
import { PlaylistCard } from './Cards';
import { Flex, Grid, Grid2 } from './styles/Containers.style';
import { Link } from 'react-router-dom';

const Playlists = () => {
  const [playlists, setPlaylists] = useState();
  if (playlists) console.log(playlists);

  useEffect(() => {
    console.log('Playlists page loaded.');
    fetchFromAPI('me/playlists?limit=30')
      .then((res) => setPlaylists(res))
      .catch((err) => console.error(err));
  }, []);

  const playlistsArray = playlists?.items.map((playlist) => (
    <Link to={`/playlists/${playlist?.id}`} key={playlist.id}>
      <PlaylistCard playlist={playlist} />
    </Link>
  ));

  while (!playlistsArray) return <h2> loading...</h2>;

  return (
    <Flex direction='column' overflowY='scroll'>
      <Grid>{playlistsArray}</Grid>
    </Flex>
  );
};

export default Playlists;
