import React, { useState, useEffect } from 'react';
import { fetchFromAPI } from '../utils/API-Controller';
import { Flex } from './styles/Containers.style';
import { useParams } from 'react-router-dom';
import { LibRow } from './styles/Library.style';
import { TitleText, MutedText } from './styles/Cards.style';
import { controlDuration } from '../utils/constants';

const imgSty = {
  boxShadow: '1px 1px 4px 2px rgba(0, 0, 0, 0.2)',
  // maxWidth: '139px',
  maxHeight: '100%',
};

const LibraryRow = ({ track, index }) => {
  const handleClick = (e) => {
    console.log(e.target);
    document.querySelector('.currentTrackImage').src =
      track?.album?.images[2]?.url;
    document.querySelector('.currentTrackTitle').innerText = track?.name;
    document.querySelector('.currentTrackArtist').innerText =
      track?.artists[0]?.name;
  };

  return (
    <LibRow onClick={handleClick} padding='1rem' gap='1rem'>
      <Flex
        width='5%'
        justifyContent='center'
        alignItems='center'
        // border='1px solid red'
      >
        {index + 1}.
      </Flex>
      <Flex direction='column' gap='.5rem'>
        <TitleText>{track?.name}</TitleText>
        <MutedText>{track?.artists[0]?.name}</MutedText>
      </Flex>
      <Flex
        width='5%'
        justifyContent='center'
        alignItems='center'
        // border='1px solid red'
      >
        {controlDuration(track.duration_ms)}
      </Flex>
    </LibRow>
  );
};

const PlaylistsDetails = () => {
  const [selectedPlaylist, setSelectedPlaylist] = useState();

  if (selectedPlaylist) console.log(selectedPlaylist);

  const { id } = useParams(); //grabs id from the current url

  useEffect(() => {
    console.log('Selected Playlist page loaded.');

    fetchFromAPI(`playlists/${id}?limit=100`)
      .then((res) => setSelectedPlaylist(res))
      .catch((error) => console.error(error));
  }, []);

  const tracksArray = selectedPlaylist?.tracks?.items?.map(
    ({ track }, index) => (
      <LibraryRow
        key={track.id}
        track={track}
        images={selectedPlaylist?.images}
        index={index}
      />
    )
  );

  while (!tracksArray) return <h2> loading...</h2>;

  return (
    <Flex direction='column' overflowY='auto'>
      <Flex height='60%'>
        <Flex
          justifyContent='center'
          alignItems='center'
          padding='2rem'
          width='60%'
        >
          <img src={selectedPlaylist?.images[0]?.url} style={imgSty} />
        </Flex>
        <Flex
          direction='column'
          justifyContent='space-between'
          padding='5rem 1rem'
        >
          <h4>Playlist</h4>
          <h1 style={{ fontSize: '50px' }}>{selectedPlaylist?.name}</h1>
          <p>{selectedPlaylist?.description}</p>
          <p>{selectedPlaylist?.tracks?.total} tracks</p>
        </Flex>
      </Flex>
      <Flex direction='column' padding='2rem' height='fit-content'>
        {tracksArray}
      </Flex>
    </Flex>
  );
};

export default PlaylistsDetails;
