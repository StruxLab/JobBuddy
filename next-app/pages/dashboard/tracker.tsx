import { Flex } from '@chakra-ui/react';
import { NextPage } from 'next';
import DashboardBox from '../../components/atoms/DashboardBox';

const Tracker: NextPage = () => {
  return (
    <Flex m={3} w='100%' direction='column'>
      <DashboardBox>
        Tracker goes here
      </DashboardBox>
    </Flex>
  );
};

export default Tracker;
