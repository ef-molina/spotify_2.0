import { Stack, Box } from '@mui/material'; //https://mui.com/material-ui/api/stack/
import { Link } from 'react-router-dom';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { LargeLogo, SmallLogo, SearchBar } from './styles/Navbar.style';
import { searchIcon, personIcon } from '../utils/constants';
import largeLogo from '../assets/Spotify_Logo_RGB_Green.png';
import smallLogo from '../assets/Spotify_Icon_RGB_Green.png';

import { fetchFromAPI } from '../utils/API-Controller';
import { Flex } from './styles/Containers.style';

const navStyle = {
  position: 'sticky',
  background: 'white',
};

const Searchbar = () => {
  const [query, setQuery] = useState('');

  //this is used to navagate to another page
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    //navigate to searchFeed
    if (query.length > 0) navigate(`/search/${query}`);
    //clears out search bar
    setQuery('');
  };

  return (
    <SearchBar onSubmit={handleSubmit}>
      <input
        className='search-bar'
        placeholder='Search . . .'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: '100%', borderStyle: 'none' }}
      ></input>
      <span style={{ cursor: 'pointer' }} onClick={handleSubmit}>
        {searchIcon}
      </span>
    </SearchBar>
  );
};

const Navbar = ({ handleReject }) => {
  const [userData, setUserData] = useState('');

  //fetches user info for top right corner logo
  useEffect(() => {
    fetchFromAPI('me')
      .then((res) => {
        setUserData(res);
      })
      .catch((error) => {
        if (error) handleReject();
        console.error(error);
      });
  }, []);

  return (
    <Stack
      direction='row'
      alignItems='center'
      justifyContent='space-between'
      px={1.5}
      sx={{ navStyle }}
    >
      <Link to='/' style={{ display: 'flex', alignItems: 'center' }}>
        <LargeLogo src={largeLogo} alt='spotify-logo' height={40} />
        <SmallLogo src={smallLogo} alt='spotify-logo' height={40} />
      </Link>
      <Searchbar />
      <Flex alignItems='center' width='contain-items' gap='.5rem'>
        <a target='_blank' href={userData.href}>
          {userData?.images?.length > 0 ? (
            <img src={userData?.images[0]} />
          ) : (
            <span>{personIcon}</span>
          )}
        </a>
        <h2>{userData?.display_name}</h2>
      </Flex>
    </Stack>
  );
};

export default Navbar;
