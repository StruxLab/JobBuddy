import { Flex, Heading, Text } from '@chakra-ui/react';
import { NextPage } from 'next';
import DashboardBox from '../components/atoms/DashboardBox';

const Privacy: NextPage = () => {
  return (
    <Flex m={3} direction='column' w='100%'>
      <DashboardBox>
        <Heading as='h2' size='md' mb={3}>Privacy Policy</Heading>
        <Text>This is our privacy policy!</Text>
      </DashboardBox>
    </Flex>
  );
};

export default Privacy;
