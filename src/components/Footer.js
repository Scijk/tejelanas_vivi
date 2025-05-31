import { Container, Typography, Link, Box } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <Box component="footer" id="footer" sx={{ py: 4, textAlign: 'center', backgroundColor: 'background.paper' }}>
      <Container>
        <Typography variant="body1">
          Dirección: Carlos Leon Briceño #1002 - local 4, Laguna. Chile
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 2 }}>
          <Link
            href="https://www.instagram.com/teje_lanas.vivi/"
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
            underline="none"
            aria-label="Instagram">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <InstagramIcon fontSize="medium" />
              <Typography
                variant="body2"
                sx={{
                  display: { xs: 'none', sm: 'inline' }, // ocultar en móviles
                }}
              >
                @teje_lanas.vivi
              </Typography>
            </Box>
          </Link>

          <Link
            href="https://www.facebook.com/MezcliMam/"
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
            underline="none"
            aria-label="Facebook">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <FacebookIcon fontSize="medium" />
              <Typography
                variant="body2"
                sx={{
                  display: { xs: 'none', sm: 'inline' },
                }}
              >
                MezcliMam
              </Typography>
            </Box>
          </Link>

          <Link
            href="https://wa.me/56976322314"
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
            underline="none"
            aria-label="WhatsApp">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <WhatsAppIcon fontSize="medium" />
              <Typography
                variant="body2"
                sx={{
                  display: { xs: 'none', sm: 'inline' },
                }}
              >
                WhatsApp
              </Typography>
            </Box>
          </Link>
        </Box>
        <Typography variant="body2" sx={{ mt: 1 }}>
          &copy; {year}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
