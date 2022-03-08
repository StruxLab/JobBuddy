import { Flex, Heading, Text } from '@chakra-ui/react';
import type { ReactElement } from 'react';
import DashboardBox from '../components/atoms/DashboardBox';

interface IContact {
  (): ReactElement;
};
const Contact: IContact = () => {
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
