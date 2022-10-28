import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppContainer, Flex } from './components/styles/Containers.style';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './components/styles/Global';

import {
  Sidebar,
  Dash,
  Navbar,
  Albums,
  Artists,
  ArtistDetails,
  Playlists,
  PlaylistsDetails,
  AlbumDetails,
  SearchFeed,
  LoginPage,
  Library,
  Footer,
} from './components';

const theme = {
  colors: {
    background: '#121414',
    primary: '#dce1eb',
    accent: '#17ab4d',
    muted: '#dce1ebbe',
    card: '#212121',
  },
};

const accessToken = localStorage.getItem('access_token') || null;

const App = () => {
  const [loggedIn, setLoggedIn] = useState(accessToken ? true : false);

  console.log(loggedIn);

  const handleReject = () => {
    localStorage.clear();
    setLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {/* ======= If use is logged in . . . render dash feed ======= */}
        {loggedIn ? (
          <AppContainer>
            <Navbar handleReject={handleReject} />
            <Flex gap='.5rem' style={{ overflowY: 'scroll' }}>
              <Sidebar />
              <Routes>
                <Route path='/' element={<Dash />} />
                <Route path='/library' element={<Library />} />
                <Route path='/albums'>
                  <Route index element={<Albums />} />
                  <Route path=':id' element={<AlbumDetails />} />
                </Route>
                <Route path='/artists'>
                  <Route index element={<Artists />} />
                  <Route path=':id' element={<ArtistDetails />} />
                </Route>
                <Route path='/playlists'>
                  <Route index element={<Playlists />} />
                  <Route path=':id' element={<PlaylistsDetails />} />
                </Route>
                <Route path='/search/:query' element={<SearchFeed />} />
              </Routes>
            </Flex>
            <Flex justifyContent='space-around' alignItems='center'>
              <Footer />
            </Flex>
          </AppContainer>
        ) : (
          //============== IF user is not logged in, render the login screen ==============
          <LoginPage setLoggedIn={setLoggedIn} />
        )}
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
