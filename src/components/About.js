import { Container, Typography, Box } from '@mui/material';
import Constantes from '../context/Constantes';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import useFetchData from '../context/useFetchData';

const About = () => {
  const { data, loading, error } = useFetchData(Constantes.urlAbout);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  const dataAbout = (data?.data || []);

  return (
  <Container sx={{ py: 6, textAlign: 'center' }}>
    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
      <InfoOutlinedIcon sx={{ fontSize: 60, color: 'primary.main' }} />
    </Box>
    <Typography id="about" variant="h5" gutterBottom>
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
      }} >
      <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
        {error
          ? `Error: ${error}`
          : loading
          ? 'Cargando...'
          : dataAbout.length > 0
          ? dataAbout
          : 'No hay información disponible.'}
      </Typography>
    </Container>
  </Container>
  );
};

export default About;