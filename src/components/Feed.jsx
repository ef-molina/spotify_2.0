import React, { useState, useEffect } from 'react';
import Dash from './Dash';
import Library from './Library';
import Albums from './Albums';
import Artists from './Artists';
import Playlists from './Playlists';
import Sidebar from './Sidebar';

const Feed = ({ error }) => {
  const [activeMenu, setActiveMenu] = useState('Dash');

  const handleClick = (e) => {
    setActiveMenu(e.target.closest('div').id);
    if (e.target.closest('div').id == 'Logout') {
      localStorage.removeItem('access_token');
      window.location.reload();
    }
  };
  switch (activeMenu) {
    case 'Dash':
      return (
        <>
          <Sidebar handleClick={handleClick} activeMenu={activeMenu} />
          <Dash handleReject={error} />
        </>
      );
      break;
    case 'Library':
      return (
        <>
          <Sidebar handleClick={handleClick} activeMenu={activeMenu} />
          <Library />
        </>
      );
      break;
    case 'Albums':
      return (
        <>
          <>
            <Sidebar handleClick={handleClick} activeMenu={activeMenu} />
            <Albums />
          </>
        </>
      );
      break;
    case 'Artists':
      return (
        <>
          <Sidebar handleClick={handleClick} activeMenu={activeMenu} />
          <Artists />
        </>
      );
      break;
    case 'Playlists':
      return (
        <>
          <Sidebar handleClick={handleClick} activeMenu={activeMenu} />
          <Playlists />
        </>
      );
      break;
    default:
      return;
  }
};

export default Feed;
