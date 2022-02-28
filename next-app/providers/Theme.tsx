import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import type { ReactFragment, ReactElement } from 'react';

interface IChakra {
  (arg0: { children: ReactFragment }): ReactElement;
};
const Chakra: IChakra = ({ children }) => {
  const theme = extendTheme({

  });
  return (
    <ChakraProvider theme={theme}>
      {children}
    </ChakraProvider>
  );
}

export default Chakra;
