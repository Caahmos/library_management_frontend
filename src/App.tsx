import GlobalStyles from './styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { AuthProvider } from './hooks/useAuth';
import Routes from './routes';
import { useTheme } from './hooks/useTheme';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  const { theme } = useTheme();
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <AuthProvider>
            <GlobalStyles />
            <Routes />
          </AuthProvider>
        </Router>
      </ThemeProvider>
    </div>
  )
}

export default App
