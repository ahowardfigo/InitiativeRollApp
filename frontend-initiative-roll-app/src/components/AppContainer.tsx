import React from 'react';
import { containerStyle, h1Style, headerStyle, mainStyle } from '../styles/sharedStyles';

type AppContainerProps = {
    children: React.ReactNode;
  };

const AppContainer: React.FC<AppContainerProps> = ({ children }) => {

  return (
    <div style={containerStyle}>
        <header style={headerStyle}>
            <h1 style={h1Style}>Join the Initiative!</h1>
        </header>
        <main style={mainStyle}>
            {children}
        </main>
    </div>
  )
};

export default AppContainer;