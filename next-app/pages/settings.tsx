import {
  Flex,
  Text,
  Button,
  Heading,
} from '@chakra-ui/react';
import DashboardBox from '../components/atoms/DashboardBox';
import { NextPage } from 'next';

const Settings: NextPage = () => {
  return (
    <Flex m={3} w='100%' direction='column'>
      <DashboardBox height='100%'>
        <Heading as='h2' size='md' m={0}>
          Profile Settings
        </Heading>
        <Flex>
          <Button colorScheme='blue' variant='solid'>Hello!</Button>
        </Flex>
      </DashboardBox>
    </Flex>
  );
};

export default Settings;
