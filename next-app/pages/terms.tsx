import { Flex, Text, Heading } from '@chakra-ui/react';
import { NextPage } from 'next';
import DashboardBox from '../components/atoms/DashboardBox';

const Terms: NextPage = () => {
  return (
    <Flex m={3} w='100%' direction='column'>
      <DashboardBox>
          <Heading as='h2' size='md' mb={3}>StruxLab's Terms of Use</Heading>
          <Text>Hey there! You've reached the StruxLab Terms of Use! We haven't built out or site policies yet, but the crux of the policies will ultimately be (1) don't be a jerk, and (2) don't have malicious intent.</Text>
          <Text>We'll update this page once we have a set of site terms available!</Text>
      </DashboardBox>
    </Flex>
  );
};

export default Terms;
