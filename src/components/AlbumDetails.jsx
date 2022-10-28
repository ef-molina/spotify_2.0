import React, { useState, useEffect } from 'react';
import { fetchFromAPI } from '../utils/API-Controller';
import { Flex, Grid, Grid2 } from './styles/Containers.style';
import { LibRow } from './styles/Library.style';
import { MutedText, TitleText } from './styles/Cards.style';
import { useParams } from 'react-router-dom';
import { controlDuration } from '../utils/constants';

const LibraryRow = ({ images, track, index }) => {
  const handleClick = () => {
    document.querySelector('.currentTrackImage').src = images[2]?.url;
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
        {index + 1}
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

const imgSty = {
  boxShadow: '1px 1px 4px 2px rgba(0, 0, 0, 0.2)',
  // maxWidth: '139px',
  maxHeight: '100%',
};

const AlbumDetails = () => {
  const [selectedAlbum, setSelectedAlbum] = useState();

  if (selectedAlbum) console.log(selectedAlbum);

  const { id } = useParams(); //grabs id from the current url

  useEffect(() => {
    console.log('Selected Album page load.');

    fetchFromAPI(`albums/${id}`).then((res) => setSelectedAlbum(res));
  }, []);

  const albumArray = selectedAlbum?.tracks?.items?.map((track, index) => (
    <LibraryRow
      key={track?.id}
      track={track}
      images={selectedAlbum?.images}
      index={index}
    />
  ));

  while (!albumArray) return <h2> loading...</h2>;

  if (selectedAlbum)
    return (
      <Flex direction='column' overflowY='auto'>
        <Flex height='60%'>
          <Flex
            justifyContent='center'
            alignItems='center'
            padding='2rem'
            width='60%'
          >
            <img src={selectedAlbum?.images[0]?.url} style={imgSty} />
          </Flex>
          <Flex
            direction='column'
            justifyContent='space-between'
            padding='5rem 1rem'
          >
            <h4>Album</h4>
            <h1 style={{ fontSize: '50px' }}>{selectedAlbum?.name}</h1>
            <Flex height='fit-content' alignItems='center' gap='10px'>
              <h4>{selectedAlbum?.artists[0]?.name}</h4>
              <p>{(selectedAlbum?.release_date).slice(0, 4)},</p>
              <p>{selectedAlbum?.total_tracks} tracks</p>
            </Flex>
          </Flex>
        </Flex>
        <Flex direction='column' padding='2rem' height='fit-content'>
          {albumArray}
        </Flex>
      </Flex>
    );
};

export default AlbumDetails;
