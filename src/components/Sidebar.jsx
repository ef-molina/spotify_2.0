import { useEffect, useState } from 'react';

import { sidebarCategories } from '../utils/constants';
import { MenuItem, MenuIcon, MenuName } from './styles/Sidebar.style';
import { Flex } from './styles/Containers.style';
import { Link, useParams } from 'react-router-dom';

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState('/');

  // TODO:  trying to update the active menu item when user clicks the back button

  // const pathName = window.location.pathname;
  // useEffect(() => {
  //   if (pathName) {
  //     if (pathName != '/') {
  //       console.log('pathname: ', pathName);
  //       console.log('ActiveMenu: ', '/' + activeMenu);
  //     }

  //     if (pathName == '/') {
  //       console.log('pathname: ', pathName);
  //       console.log('ActiveMenu: ', activeMenu);
  //     }
  //   }
  // }, [pathName]);

  const handleClick = (e) => {
    // console.log(e.target.closest('div').id);
    setActiveMenu(e.target.closest('div').id);
    if (e.target.closest('div').id == 'logout') {
      localStorage.removeItem('access_token');
      window.location.reload();
    }
  };

  return (
    <Flex direction='column' width='fit-content' gap='.5rem'>
      {sidebarCategories.map((cat) =>
        cat.id === activeMenu ? (
          <MenuItem
            key={cat.id}
            borderleft='0.4rem solid #17ab4d'
            pr='.6rem'
            pl='.8rem'
            bg='hsl(0 0% 100% / 0.5)'
            hoverright='none'
            hoverleft='none'
            id={cat.id}
          >
            <MenuIcon>{cat.icon}</MenuIcon>
            <MenuName>{cat.name}</MenuName>
          </MenuItem>
        ) : (
          <Link
            to={cat.id != '/' ? `/${cat.name.toLowerCase()}` : '/'}
            key={cat.id}
          >
            <MenuItem id={cat.id} onClick={handleClick}>
              <MenuIcon>{cat.icon}</MenuIcon>
              <MenuName>{cat.name}</MenuName>
            </MenuItem>
          </Link>
        )
      )}
    </Flex>
  );
};

export default Sidebar;
