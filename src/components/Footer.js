import { Container, Typography, Link, Box } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <Box
      component="footer"
      id="footer"
      sx={{
        py: 4,
        textAlign: 'center',
        backgroundColor: 'background.paper',
        color: 'text.primary',
      }}
      aria-label="Pie de página con información de contacto y redes sociales"
    >
      <Container>
        <Typography variant="body1" tabIndex={0}>
          Dirección: Carlos Leon Briceño #1002 - local 4, Laguna. Chile
        </Typography>

        <Box
          sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 2 }}
          role="list"
          aria-label="Redes sociales"
        >
          {/* Instagram */}
          <Link
            href="https://www.instagram.com/teje_lanas.vivi/"
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
            underline="hover"
            aria-label="Ir a Instagram - teje_lanas.vivi, abre en una nueva pestaña"
            role="listitem"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              outlineOffset: '4px',
              '&:focus-visible': {
                outline: '3px solid #1976d2',
                outlineOffset: '4px',
                borderRadius: '4px',
              },
            }}
          >
            <InstagramIcon fontSize="medium" aria-hidden="true" />
            <Typography
              variant="body2"
              sx={{
                display: { xs: 'inline', sm: 'inline' },
              }}
            >
              @teje_lanas.vivi
            </Typography>
          </Link>

          {/* Facebook */}
          <Link
            href="https://www.facebook.com/MezcliMam/"
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
            underline="hover"
            aria-label="Ir a Facebook - MezcliMam, abre en una nueva pestaña"
            role="listitem"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              outlineOffset: '4px',
              '&:focus-visible': {
                outline: '3px solid #1976d2',
                outlineOffset: '4px',
                borderRadius: '4px',
              },
            }}
          >
            <FacebookIcon fontSize="medium" aria-hidden="true" />
            <Typography variant="body2" sx={{ display: { xs: 'inline', sm: 'inline' } }}>
              MezcliMam
            </Typography>
          </Link>

          {/* WhatsApp */}
          <Link
            href="https://wa.me/56976322314"
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
            underline="hover"
            aria-label="Enviar mensaje por WhatsApp, abre en una nueva pestaña"
            role="listitem"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              outlineOffset: '4px',
              '&:focus-visible': {
                outline: '3px solid #1976d2',
                outlineOffset: '4px',
                borderRadius: '4px',
              },
            }}
          >
            <WhatsAppIcon fontSize="medium" aria-hidden="true" />
            <Typography variant="body2" sx={{ display: { xs: 'inline', sm: 'inline' } }}>
              WhatsApp
            </Typography>
          </Link>
        </Box>

        <Typography variant="body2" sx={{ mt: 1 }} tabIndex={0}>
          &copy; {year}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
