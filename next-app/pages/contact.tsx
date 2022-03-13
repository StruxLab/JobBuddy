import { Flex, Heading, Text } from '@chakra-ui/react';
import { NextPage } from 'next';
import DashboardBox from '../components/atoms/DashboardBox';

const Contact: NextPage = () => {
  return (
    <Flex m={3} direction='column' w='100%'>
      <DashboardBox>
        <Heading as='h2' size='md' mb={3}>Contact Us</Heading>
        <Text>This is our contact page!</Text>
      </DashboardBox>
    </Flex>
  );
};

export default Contact;
