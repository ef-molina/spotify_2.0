import { Flex } from './styles/Containers.style';
import { favoriteIcon } from '../utils/constants';
import { LibraryIcon, LibRow } from './styles/Library.style';
import { useState, useEffect } from 'react';
import { TitleText, MutedText } from './styles/Cards.style';
import { fetchFromAPI } from '../utils/API-Controller';
import { controlDuration } from '../utils/constants';

const LibraryRow = ({ track, index }) => {
  const handleClick = (e) => {
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

const Library = () => {
  const [libraryTracks, setLibraryTracks] = useState();

  if (libraryTracks) console.log(libraryTracks);

  useEffect(() => {
    console.log('Library page load.');
    fetchFromAPI('me/tracks?limit=50').then((res) => setLibraryTracks(res));
  }, []);

  const libraryArray = libraryTracks?.items?.map(({ track }, index) => (
    <LibraryRow key={track.id} track={track} index={index} />
  ));

  while (!libraryArray) return <h2> loading...</h2>;

  return (
    <Flex direction='column' overflowY='auto'>
      <Flex height='60%'>
        <Flex
          justifyContent='center'
          alignItems='center'
          padding='2rem'
          width='60%'
        >
          <LibraryIcon>{favoriteIcon.on}</LibraryIcon>
        </Flex>
        <Flex
          direction='column'
          justifyContent='space-between'
          padding='5rem 1rem'
        >
          <h4>Playlist</h4>
          <h1 style={{ fontSize: '50px' }}>Liked Songs</h1>
          <p>{libraryTracks?.total} tracks</p>
        </Flex>
      </Flex>
      <Flex direction='column' padding='2rem' height='fit-content'>
        {libraryArray}
      </Flex>
    </Flex>
  );
};

export default Library;
