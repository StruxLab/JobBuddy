import {
  Flex,
  Text,
  Button,
  Heading,
} from '@chakra-ui/react';
import type { ReactElement } from 'react';
import DashboardBox from '../../components/atoms/DashboardBox';

interface IConnectToExtension {
  (): ReactElement;
};
const ConnectToExtension: IConnectToExtension = () => {
  return (
    <Flex m={3} w='100%' direction='column'>
      <DashboardBox height='100%'>
        <Heading as='h2' size='md' mb={3}>
          Link  Chrome Extension to JobBuddy Account
        </Heading>
        <Flex>
          <Button colorScheme='blue' variant='solid'>Hello!</Button>
        </Flex>
      </DashboardBox>
    </Flex>
  );
};

export default ConnectToExtension;
