import React, { useState, useEffect } from 'react';
import { fetchFromAPI } from '../utils/API-Controller';
import { Flex, Grid } from './styles/Containers.style';
import { useParams } from 'react-router-dom';
import { AlbumCard } from './Cards';
import { Link } from 'react-router-dom';

const ArtistDetails = () => {
  const [selectedArtist, setSelectedArtist] = useState();

  if (selectedArtist) console.log(selectedArtist);

  const { id } = useParams(); //grabs id from the current url

  useEffect(() => {
    console.log('Selected Artist page load.');

    fetchFromAPI(`artists/${id}/albums?limit=30`)
      .then((res) => setSelectedArtist(res))
      .catch((error) => console.error(error));
  }, []);

  const albumsArray = selectedArtist?.items?.map((album) => {
    return <AlbumCard album={album} key={album?.id} />;
  });

  while (!albumsArray) return <h2> loading...</h2>;

  if (selectedArtist)
    return (
      <Flex direction='column' overflowY='scroll'>
        <Grid>{albumsArray}</Grid>
      </Flex>
    );
};

export default ArtistDetails;
