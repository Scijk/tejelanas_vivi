import { useState } from 'react';
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Constantes from '../Constantes';
import useFetchData from './useFetchData';

const Faqs = () => {
  const [expandedId, setExpandedId] = useState(null);

  const { data, loading, error } = useFetchData(Constantes.urlFaqs, {
    headers: { Authorization: Constantes.tokenBearer }
  });

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  const faqs = (data?.data || []).filter(faq => faq.activo);

  const handleChange = (panelId) => (_, isExpanded) => {
    setExpandedId(isExpanded ? panelId : null);
  };

  if (loading) return (
    <Container sx={{ py: 6, textAlign: 'center' }}>
      <CircularProgress />
    </Container>
  );

  if (error) return (
    <Container sx={{ py: 6 }}>
      <Alert severity="error">{error}</Alert>
    </Container>
  );

  return (
    <Container sx={{ py: 6 }}>
      <Typography id="faqs" variant="h5" gutterBottom textAlign="center">
        Preguntas Frecuentes
      </Typography>

      {faqs.length === 0 ? (
        <Typography textAlign="center">No hay preguntas disponibles.</Typography>
      ) : (
        faqs.map(({ id, titulo, respuesta }) => (
          <Accordion
            key={id}
            expanded={expandedId === id}
            onChange={handleChange(id)}
            TransitionProps={{ unmountOnExit: true }}
            sx={{ mb: 2 }}
          >
            <AccordionSummary
              expandIcon={
                <ExpandMoreIcon
                  sx={{
                    transform: expandedId === id ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease'
                  }}
                />
              }
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <HelpOutlineIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="subtitle1">{titulo}</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                {respuesta}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))
      )}
    </Container>
  );
};

export default Faqs;
