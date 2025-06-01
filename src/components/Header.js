import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
  useMediaQuery
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
  // Agrega más secciones si las necesitas
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
    <>
      <AppBar position="sticky" color="default" elevation={1}>
        <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
            Tejelanas Vivi
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {isMobile ? (
              <>
                <IconButton onClick={toggleDrawer(true)} color="inherit" aria-label="menu">
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

            <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
              {darkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
