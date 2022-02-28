import { Flex } from '@chakra-ui/react';
import type { ReactFragment, ReactElement } from 'react';

interface IDashboardBox {
  (arg0: {
    children: ReactFragment,
    height?: (string | number),
    direction?: ('column' | 'row'),
  }): ReactElement;
};
const DashboardBox: IDashboardBox = ({
  children,
  height = 'inherit',
  direction = 'column',
}) => {
  return (
    <Flex
      bg='#dfdfdf'
      color='#404040'
      border='1px solid #747474'
      borderRadius={3}
      p={30}
      h={height}
      direction={direction}
    >
      {children}
    </Flex>
  );
};

export default DashboardBox;
