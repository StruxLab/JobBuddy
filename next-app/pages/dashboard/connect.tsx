import {
  Flex,
  Text,
  Button,
  Heading,
} from '@chakra-ui/react';
import DashboardBox from '../../components/atoms/DashboardBox';

const ConnectToExtension = () => {
  return (
    <Flex
      m={3}
      w='100%'
      direction='column'
    >
      <DashboardBox height='100%'>
        <Heading as='h2' size='md' m={0}>
          Link JobBuddy Account to Chrome Extension
        </Heading>
        <Flex>
          <Button colorScheme='blue' variant='solid'>Hello!</Button>
        </Flex>
      </DashboardBox>
    </Flex>
  );
};

export default ConnectToExtension;
