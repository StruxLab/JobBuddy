import { Flex, Heading, Text } from '@chakra-ui/react';
import type { ReactElement } from 'react';
import DashboardBox from '../components/atoms/DashboardBox';

interface IPrivacy {
  (): ReactElement;
};
const Privacy: IPrivacy = () => {
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
