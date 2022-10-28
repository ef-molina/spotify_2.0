import React, { useState, useEffect } from 'react';

import { TopAlbumsContainer, ScrollRow } from './styles/Dash.style';
import { Flex } from './styles/Containers.style';
import { ThinCard, TrackCard, AlbumCard } from './Cards';
import { Link } from 'react-router-dom';

import { fetchFromAPI } from '../utils/API-Controller';

const Dash = ({ handleReject }) => {
  const [topAlbums, setTopAlbums] = useState();
  const [recentlyPlayed, setRecentlyPlayed] = useState();
  const [newReleases, setNewReleases] = useState();
  const [recomendations, setRecommendations] = useState();

  useEffect(() => {
    console.log('dash page load');
    let { albums, recents, releases, recommends } = {};

    const fetchData = async () => {
      albums = await fetchFromAPI(`me/albums?limit=6`);
      recents = await fetchFromAPI(`me/player/recently-played`);
      releases = await fetchFromAPI(`browse/new-releases?country=us`).then(
        (res) => res.albums
      );
      recommends = await fetchFromAPI(
        `recommendations?seed_genres=hip-hop`
      ).then((res) => res.tracks);
    };
    fetchData()
      .then(() => {
        setTopAlbums(albums);
        setRecentlyPlayed(recents);
        setNewReleases(releases);
        setRecommendations(recommends);
      })
      .catch((error) => {
        console.log(error);
        handleReject();
      });
  }, []);

  const topSixAlbums = topAlbums?.items.map(({ album }) => (
    <Link to={`/${album?.type}s/${album?.id}`} key={album.id}>
      <ThinCard album={album} />
    </Link>
  ));

  const recentlyPlayedAlbums = recentlyPlayed?.items.map(({ track }) => (
    <TrackCard key={track.id} track={track} />
  ));

  const newReleasedAlbums = newReleases?.items.map((album) => (
    <AlbumCard key={album.id} album={album} />
  ));

  const newRecommendations = recomendations?.map((track) => (
    <TrackCard key={track.id} track={track} />
  ));

  while (!recomendations) return <h2> loading...</h2>;

  return (
    <Flex direction='column' gap='1rem' overflowY='auto'>
      <TopAlbumsContainer>{topSixAlbums}</TopAlbumsContainer>
      <h2 style={{ paddingLeft: '1rem' }}>Recently Played</h2>
      <ScrollRow>{recentlyPlayedAlbums}</ScrollRow>
      <h2 style={{ paddingLeft: '1rem' }}>New Releases</h2>
      <ScrollRow>{newReleasedAlbums}</ScrollRow>
      <h2 style={{ paddingLeft: '1rem' }}>Recommended</h2>
      <ScrollRow>{newRecommendations}</ScrollRow>
    </Flex>
  );
};

export default Dash;
