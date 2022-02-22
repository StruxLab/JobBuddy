import React from 'react';
import { Flex } from '@chakra-ui/react';
import Login from './Login/Login';

const App = () => {
  return (
    <Flex
      bg='#062836'
      color='#fff'
      minHeight='100vh'
      align='center'
      justify='center'
    >
      <Login />
    </Flex>
  );
}

export default App;
