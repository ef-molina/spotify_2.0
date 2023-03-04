import React, { useEffect, useState } from 'react';
import { Flex } from './styles/Containers.style';
import albumCover from '../assets/smallBaloons.jpeg';
import { playbackIcons } from '../utils/constants';
import { MenuIcon } from './styles/Sidebar.style';
import { StyledTrackVolumeSlide } from './styles/Button.style';

const Footer = () => {
  const [playState, setPlayState] = useState(false);

  const handlePlaystate = () => {
    setPlayState((prevState) => !prevState);
  };

  return (
    <Flex
      alignItems='center'
      justifyContent='space-between'
      padding='0 1rem'
      bg='hsl(0 0% 0% / 0.1)'
    >
      <Flex
        // border='1px solid purple'
        alignItems='center'
        height='100%'
        padding='.25rem'
      >
        <img className='currentTrackImage' src={albumCover} />
        <Flex
          direction='column'
          justifyContent='center'
          padding='0 .5rem'
          gap='1rem'
        >
          <h4 className='currentTrackTitle'>Title</h4>
          <p className='currentTrackArtist'>Artist</p>
        </Flex>
      </Flex>
      <Flex alignItems='center' direction='column'>
        <Flex
          justifyContent='center'
          // border='1px solid purple'
          style={{ fontSize: '40px' }}
        >
          <MenuIcon>{playbackIcons.previous}</MenuIcon>
          {playState && (
            <MenuIcon onClick={handlePlaystate}>{playbackIcons.pause}</MenuIcon>
          )}
          {!playState && (
            <MenuIcon onClick={handlePlaystate}>{playbackIcons.play}</MenuIcon>
          )}
          <MenuIcon>{playbackIcons.skip}</MenuIcon>
        </Flex>
        <Flex
          justifyContent='center'
          alignItems='center'
          gap='.5rem'
          // style={{ border: '1px solid green' }}
        >
          0:00{' '}
          <div
            style={{
              width: '80%',
              height: '4px',
              background: 'hsl(0 0% 100% / 0.1)',
              borderRadius: '1rem',
            }}
          >
            {' '}
            <div
              style={{
                width: '40%',
                height: '4px',
                background: 'hsl(0 0% 100% / 0.5)',
                borderRadius: '1rem',
              }}
            ></div>
          </div>{' '}
          4:20
        </Flex>
      </Flex>

      <Flex justifyContent='flex-end' alignItems='center' height='100%'>
        <MenuIcon>{playbackIcons.volumeMute}</MenuIcon>
        <StyledTrackVolumeSlide type='range' min='0' max='10' step='1' />
        <MenuIcon>{playbackIcons.volumeUp}</MenuIcon>
      </Flex>
    </Flex>
  );
};

export default Footer;
