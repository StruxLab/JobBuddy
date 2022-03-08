import {
  Flex,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { ReactElement } from 'react';
import DashboardBox from '../../components/atoms/DashboardBox';

interface IDashboard {
  (): ReactElement;
}
const Dashboard: IDashboard = () => {
  return (
    <Grid m={3} templateColumns='repeat(2, 1fr)' gap={2} w='100%'>
      <GridItem w='100%'>
        <DashboardBox><Flex w='100%'>Something goes here</Flex></DashboardBox>
      </GridItem>
      <GridItem w='100%'>
        <DashboardBox>And another thing goes here</DashboardBox>
      </GridItem>
    </Grid>
  );
}

export default Dashboard;
