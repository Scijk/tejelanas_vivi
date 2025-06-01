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
import Constantes from '../context/Constantes';
import useFetchData from '../context/useFetchData';

const Faqs = () => {
  const [expandedId, setExpandedId] = useState(null);

  const { data, loading, error } = useFetchData(Constantes.urlFaqs);

  const faqs = (data?.data || []).filter(faq => faq.activo);

  const handleChange = (panelId) => (_, isExpanded) => {
    setExpandedId(isExpanded ? panelId : null);
  };

  if (loading) return (
    <Container sx={{ py: 6, textAlign: 'center' }} role="alert" aria-live="polite">
      <CircularProgress aria-label="Cargando preguntas frecuentes" />
    </Container>
  );

  if (error) return (
    <Container sx={{ py: 6 }}>
      <Alert severity="error" role="alert" aria-live="assertive">{error}</Alert>
    </Container>
  );

  return (
    <Container sx={{ py: 6 }}>
      <Typography
        id="faqs"
        variant="h5"
        gutterBottom
        textAlign="center"
        tabIndex={-1} // para que se pueda enfocar por accesibilidad si se quiere
      >
        Preguntas Frecuentes
      </Typography>

      {faqs.length === 0 ? (
        <Typography textAlign="center" role="alert" aria-live="polite">
          No hay preguntas disponibles.
        </Typography>
      ) : (
        faqs.map(({ id, titulo, respuesta }) => {
          const panelId = `faq-panel-${id}`;
          const headerId = `faq-header-${id}`;
          const isExpanded = expandedId === id;

          return (
            <Accordion
              key={id}
              expanded={isExpanded}
              onChange={handleChange(id)}
              TransitionProps={{ unmountOnExit: true }}
              sx={{ mb: 2 }}
              disableGutters
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    sx={{
                      transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease'
                    }}
                    aria-hidden="true"
                  />
                }
                aria-controls={panelId}
                id={headerId}
                aria-expanded={isExpanded}
                role="button"
                tabIndex={0}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <HelpOutlineIcon color="primary" sx={{ mr: 1 }} aria-hidden="true" />
                  <Typography variant="subtitle1">{titulo}</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails
                id={panelId}
                role="region"
                aria-labelledby={headerId}
              >
                <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                  {respuesta}
                </Typography>
              </AccordionDetails>
            </Accordion>
          );
        })
      )}
    </Container>
  );
};

export default Faqs;
