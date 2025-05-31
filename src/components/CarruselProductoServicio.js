import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import TarjetaItem from './TarjetaItem';
import {
  Box,
  Container,
  Typography
} from '@mui/material';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import MiscellaneousServicesOutlinedIcon from '@mui/icons-material/MiscellaneousServicesOutlined';

const getResponsiveConfig = (itemCount) => {
  const itemsToShow = Math.min(itemCount, 4);
  return {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: itemsToShow },
    tablet: { breakpoint: { max: 1024, min: 768 }, items: Math.min(itemsToShow, 2) },
    mobile: { breakpoint: { max: 768, min: 0 }, items: 1 }
  };
};

const EmptyState = ({ icon: Icon, text }) => (
  <Box sx={{ my: 4, textAlign: 'center', color: 'text.secondary' }}>
    <Icon sx={{ fontSize: 60, mb: 1 }} />
    <Typography variant="body1">{text}</Typography>
  </Box>
);

const CarruselProductoServicio = ({ productos, servicios }) => {
  return (
    <Container sx={{ py: 6, textAlign: 'center' }}>
      <Typography id="productos" variant="h5" gutterBottom>
        Productos Destacados
      </Typography>

      {productos.length > 0 ? (
        <Carousel
          responsive={getResponsiveConfig(productos.length)}
          infinite={productos.length > 4}
          autoPlay
          autoPlaySpeed={3000}>
          {productos.map(product => (
            <Box key={product.id} sx={{ px: 2, height: 420 }}>
              <TarjetaItem
                tipo="producto"
                titulo={product.nombre}
                descripcion={`Precio: $${product.precio?.toLocaleString('es-CL')}`}
                imagen={product.imgs[0]}
                extraInfo={
                  (product.tallas?.length > 0 || product.colores?.length > 0) && (
                    <>
                      {product.tallas?.length > 0 && (
                        <Typography variant="body2">Tallas: {product.tallas.join(', ')}</Typography>
                      )}
                      {product.colores?.length > 0 && (
                        <Typography variant="body2">Colores: {product.colores.join(', ')}</Typography>
                      )}
                    </>
                  )
                }
              />
            </Box>
          ))}
        </Carousel>
      ) : (
        <EmptyState icon={Inventory2OutlinedIcon} text="No hay productos disponibles por el momento." />
      )}

      <Typography id="servicios" variant="h5" gutterBottom sx={{ mt: 8 }}>
        Servicios
      </Typography>

      {servicios.length > 0 ? (
        <Carousel
          responsive={getResponsiveConfig(servicios.length)}
          infinite={servicios.length > 4}
          autoPlay
          autoPlaySpeed={3000}>
          {servicios.map(service => (
            <Box key={service.id} sx={{ px: 2, height: 420 }}>
              <TarjetaItem
                tipo="servicio"
                titulo={service.nombre}
                descripcion={service.ubicacion}
                imagen={service.imgs[0]}
                extraInfo={
                  <>
                    <Typography variant="body2">Cupos: {service.cupos}</Typography>
                    <Typography variant="body2">Fecha: {service.fecha}</Typography>
                  </>
                }
              />
            </Box>
          ))}
        </Carousel>
      ) : (
        <EmptyState icon={MiscellaneousServicesOutlinedIcon} text="No hay servicios disponibles por el momento." />
      )}
    </Container>
  );
};

export default CarruselProductoServicio;
