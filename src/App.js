import { useState } from 'react';
import useFetchData from './components/useFetchData';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import Header from './components/Header';
import About from './components/About';
import CarruselProductoServicio from './components/CarruselProductoServicio';
import Footer from './components/Footer';
import Faqs from './components/Faqs';
import Contacto from './components/Contacto';
import Constantes from './Constantes';

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#90caf9' : '#1976d2',
      },
      background: {
        default: darkMode ? '#121212' : '#fafafa',
        paper: darkMode ? '#1e1e1e' : '#fff',
      },
    },
    typography: {
      fontFamily: 'Roboto, sans-serif',
    },
  });

  const { data, loading, error } = useFetchData(Constantes.urlProductosServicios, {
    headers: { Authorization: Constantes.tokenBearer }
  });

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  const productos = data?.data?.productos || [];
  const servicios = data?.data?.servicios || [];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <About />
      <CarruselProductoServicio productos={productos} servicios={servicios}/>
      <Faqs />
      <Contacto productos={productos} servicios={servicios} />
      <Footer />
    </ThemeProvider>
  );
}

export default App;
