import React from 'react';
import Login from './components/Pages/Auth/Login';
import GlobalStyles from './styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import light from './styles/themes/light';
import { AuthProvider } from './hooks/useAuth';
import Routes from './routes';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={light}>
        <AuthProvider>
          <GlobalStyles />
          <Routes />
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
