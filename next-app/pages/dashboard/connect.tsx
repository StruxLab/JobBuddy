import {
  Flex,
  Text,
  Button,
} from '@chakra-ui/react';

const ConnectToExtension = () => {
  return (
    <Flex
      bg='#dfdfdf'
      m={3}
      w='100%'
      border='1px solid #747474'
      p={30}
      direction='column'
      color='#404040'
      borderRadius={3}
    >
      <Text as='h2' m={0}>
        Link JobBuddy Account to Chrome Extension
      </Text>
      <Flex>
        <Button colorScheme='blue' variant='solid'>Hello!</Button>
      </Flex>
    </Flex>
  );
};

export default ConnectToExtension;
