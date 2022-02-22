import React, { createContext, ReactFragment, useState } from 'react';

const AppContext = createContext(undefined);

interface IAppProvider {
  (arg0: { children: ReactFragment }): ReactFragment
}
const AppProvider: IAppProvider = ({ children }) => {
  const userState = useState();
  return (
    <AppContext.Provider value={userState}>
      {children}
    </AppContext.Provider>
  );
}