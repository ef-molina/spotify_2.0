import React, { useState, useEffect } from 'react';
import { Button } from './styles/Button.style';
import { Flex } from './styles/Containers.style';
import { AUTH_URL, fetchToken } from '../utils/API-Controller';

const access_code = new URLSearchParams(window.location.search).get('code');

const Login = ({ setLoggedIn }) => {
  const [code, setCode] = useState(access_code ? access_code : null);

  useEffect(() => {
    if (code)
      fetchToken(code).then(() => {
        window.history.pushState(null, null, '/');
        window.location.reload();
      });
  }, [code]);

  return (
    <Flex
      direction='column'
      justifyContent='center'
      alignItems='center'
      height='100%'
    >
      <h1>Spotify Clone</h1>
      <Button href={AUTH_URL}>Login to Spotify</Button>
    </Flex>
  );
};

export default Login;
