import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
  useMediaQuery,
  Link as MuiLink
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useState } from 'react';

const sections = [
  { id: 'about', label: 'Nosotros' },
  { id: 'productos', label: 'Productos' },
  { id: 'servicios', label: 'Servicios' },
  { id: 'faqs', label: 'Faqs' },
  { id: 'contacto', label: 'Contacto' }
];

const MenuSecciones = ({ onClose }) => (
  <List>
    {sections.map((section) => (
      <ListItem key={section.id} disablePadding>
        <ListItemButton component="a" href={`#${section.id}`} onClick={onClose}>
          <ListItemText primary={section.label} />
        </ListItemButton>
      </ListItem>
    ))}
  </List>
);

const Header = ({ darkMode, setDarkMode }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center', height: 64 }}>
        {/* Logo como scroll anchor hacia #top */}
        <MuiLink
          href="#"
          underline="none"
          aria-label="Ir al inicio de la página"
          sx={{ display: 'flex', alignItems: 'center', height: '100%' }}
        >
          <Box
            component="img"
            src="/logo.png"
            alt="Logo Tejelanas Vivi"
            sx={{ height: '100%', maxHeight: 64 }}
          />
        </MuiLink>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {isMobile ? (
            <>
              <IconButton onClick={toggleDrawer(true)} color="inherit" aria-label="Abrir menú de navegación">
                <MenuIcon />
              </IconButton>
              <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
                <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
                  <MenuSecciones onClose={toggleDrawer(false)} />
                </Box>
              </Drawer>
            </>
          ) : (
            sections.map((section) => (
              <Button
                key={section.id}
                href={`#${section.id}`}
                sx={{ color: theme.palette.text.primary }}
              >
                {section.label}
              </Button>
            ))
          )}

          <IconButton
            onClick={() => setDarkMode(!darkMode)}
            color="inherit"
            aria-label={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          >
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
