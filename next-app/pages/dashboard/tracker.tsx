import { Flex } from '@chakra-ui/react';
import DashboardBox from '../../components/atoms/DashboardBox';

const Tracker = () => {
  return (
    <Flex m={3} w='100%' direction='column'>
      <DashboardBox>
        Tracker goes here
      </DashboardBox>
    </Flex>
  );
};

export default Tracker;
