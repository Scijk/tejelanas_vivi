import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Modal,
  Fade,
  Backdrop
} from '@mui/material';
import { useState } from 'react';
import PropTypes from 'prop-types';

const TarjetaItem = ({ tipo, titulo, descripcion, imagen, extraInfo }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);

  const handleContactoClick = () => {
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });

    const select = document.querySelector('select[name="consulta"]');
    if (select) {
      const valor = `${tipo}: ${titulo}`;
      const event = new Event('input', { bubbles: true });
      select.value = valor;
      select.dispatchEvent(event);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleModalOpen();
    }
  };

  return (
    <>
      <Card
        sx={{
          width: '100%',
          height: 400,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          cursor: 'pointer',
          outline: 'none'
        }}
        onClick={handleModalOpen}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={`Abrir imagen de ${titulo}`}
      >
        <CardMedia
          component="img"
          height="160"
          image={imagen}
          alt={`Imagen de ${titulo}`}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6" gutterBottom>{titulo}</Typography>
          <Typography variant="body2" color="text.secondary">{descripcion}</Typography>
          {extraInfo && (
            <Box sx={{ mt: 1 }}>
              {extraInfo}
            </Box>
          )}
        </CardContent>
        <Box sx={{ p: 2, pt: 0 }}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={(e) => {
              e.stopPropagation(); // Previene abrir el modal si se clickea el botón
              handleContactoClick();
            }}
            aria-label={`Contactar sobre ${titulo}`}
          >
            Contáctanos
          </Button>
        </Box>
      </Card>

      <Modal
        open={openModal}
        onClose={handleModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
        aria-labelledby={`modal-${titulo}`}
        aria-describedby={`modal-desc-${titulo}`}
      >
        <Fade in={openModal}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              maxWidth: '90vw',
              maxHeight: '90vh',
              outline: 'none',
            }}
          >
            <img
              src={imagen}
              alt={`Ampliación de ${titulo}`}
              style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: 8 }}
            />
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

TarjetaItem.propTypes = {
  tipo: PropTypes.oneOf(['producto', 'servicio']),
  titulo: PropTypes.string.isRequired,
  descripcion: PropTypes.string,
  imagen: PropTypes.string.isRequired,
  extraInfo: PropTypes.node,
};

export default TarjetaItem;
