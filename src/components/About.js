import { Container, Typography, Box, CircularProgress, Alert } from '@mui/material';
import Constantes from '../context/Constantes';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import useFetchData from '../context/useFetchData';

const About = () => {
  const { data, loading, error } = useFetchData(Constantes.urlAbout);

  if (loading) {
    return (
      <Container sx={{ py: 6, textAlign: 'center' }}>
        <CircularProgress aria-busy="true" aria-label="Cargando información sobre nosotros" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 6, textAlign: 'center' }}>
        <Alert severity="error" role="alert">
          Error: {error}
        </Alert>
      </Container>
    );
  }

  const dataAbout = data?.data || [];

  return (
    <Container sx={{ py: 6, textAlign: 'center' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <InfoOutlinedIcon
          sx={{ fontSize: 60, color: 'primary.main' }}
          aria-hidden="true" // ícono decorativo
        />
      </Box>

      <Typography
        id="about"
        variant="h5"
        gutterBottom
        tabIndex={-1} // Permite que el título sea foco programático para accesibilidad
      >
        Quiénes somos
      </Typography>

      <Container
        maxWidth="md"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark'
              ? theme.palette.background.paper
              : '#f5f5f5',
          color: 'text.primary',
          p: 3,
          borderRadius: 2,
          boxShadow: 3,
          mt: 3,
          textAlign: 'left',
        }}
        aria-labelledby="about"
      >
        <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
          {dataAbout.length > 0
            ? dataAbout
            : 'No hay información disponible.'}
        </Typography>
      </Container>
    </Container>
  );
};

export default About;
