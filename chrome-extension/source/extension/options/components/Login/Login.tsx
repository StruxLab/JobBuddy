import React from 'react';
import { Flex, Text } from '@chakra-ui/react';
import LoginWithButton from './LoginWithButton';

const Login = () => {
  return (
    <Flex
      align='center'
      direction='column'
      bg='#333'
      w='500px'
      p='20px'
    >
      <Text as='h2'>Login to JobBuddy</Text>
      <Flex direction='column' gap='8px' align='center'>
        <LoginWithButton
          bg='#0a66c2'
          color='#fff'
          title='LinkedIn'
        />
        <LoginWithButton
          bg='#000'
          color='#fff'
          title='GitHub'
        />
        <LoginWithButton
          bg='#3367d6'
          color='#fff'
          title='Google'
        />
      </Flex>
    </Flex>
  );
}

export default Login;
