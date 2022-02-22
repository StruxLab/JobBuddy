import React, { ReactElement } from 'react';
import { Text, Flex } from '@chakra-ui/react';

{/* <Text as='span' fontSize='10px'>LinkedIn</Text>
<Text as='span' fontSize='10px'>Google</Text>
<Text as='span' fontSize='10px'>GitHub</Text> */}

interface ILoginWithButton {
  (arg0: {
    title: string,
    bg: string,
    color: string,
  }): ReactElement
}

const LoginWithButton: ILoginWithButton = ({ title, bg, color }) => {
  return (
    <Flex
      sx={{ userSelect: 'none' }}
      cursor='pointer'
      bg={bg}
      color={color}
      w='150px'
      justify='center'
    >
      <Text fontSize='1.25em' as='span' p='3px'>
        Login with {title}
      </Text>
    </Flex>
  );
}

export default LoginWithButton;
