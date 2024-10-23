import React from 'react';
import Login from './components/Pages/Auth/Login';
import GlobalStyles from './styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { AuthProvider } from './hooks/useAuth';
import Routes from './routes';
import { useTheme } from './hooks/useTheme';

function App() {
  const { theme } = useTheme();

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <GlobalStyles />
          <Routes />
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
