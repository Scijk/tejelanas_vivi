import { useForm, Controller } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useContactoContext } from '../context/ContactoContext';
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Alert
} from '@mui/material';

const Contacto = ({ productos = [], servicios = [] }) => {
  const { itemSeleccionado } = useContactoContext();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
    control
  } = useForm();
  const consultaValue = watch('consulta') || '';
  
  useEffect(() => {
    if (itemSeleccionado) {
      console.log('Item seleccionado:', itemSeleccionado);
      setValue('consulta', itemSeleccionado);
    }
  }, [itemSeleccionado, setValue]);

  // Obtenemos el valor del mensaje para contador
  const mensajeValue = watch('mensaje', '');

  // Honeypot para bots
  const [botDetected, setBotDetected] = useState(false);

  const onSubmit = (data) => {
    if (data.phone) {
      setBotDetected(true);
      return;
    }
    setBotDetected(false);

    console.log('Enviando datos:', data);

    reset();
  };

  const opcionesProducto = productos.map((p) => (
    <MenuItem key={`producto-${p.id}`} value={`producto: ${p.nombre}`}>
      {p.nombre}
    </MenuItem>
  ));

  const opcionesServicio = servicios.map((s) => (
    <MenuItem key={`servicio-${s.id}`} value={`servicio: ${s.nombre}`}>
      {s.nombre}
    </MenuItem>
  ));


  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ maxWidth: 400, mx: 'auto', p: 3 }}
      id="contacto"
    >
      <Typography variant="h5" mb={2}>
        Contáctanos
      </Typography>

      {botDetected && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Se ha detectado un comportamiento sospechoso. Inténtalo de nuevo.
        </Alert>
      )}

      {isSubmitSuccessful && !botDetected && (
        <Alert severity="success" sx={{ mb: 2 }}>
          ¡Mensaje enviado correctamente!
        </Alert>
      )}

      <TextField
        label="Nombre"
        fullWidth
        margin="normal"
        {...register('nombre', { required: 'El nombre es obligatorio' })}
        error={!!errors.nombre}
        helperText={errors.nombre?.message}
      />

      <TextField
        label="Email"
        fullWidth
        margin="normal"
        type="email"
        {...register('email', {
          required: 'El email es obligatorio',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Email inválido',
          },
        })}
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      <Controller
        name="consulta"
        control={control}
        rules={{ required: 'Selecciona una opción' }}
        render={({ field }) => (
          <TextField
            select
            label="Consulta sobre"
            fullWidth
            margin="normal"
            {...field}
            error={!!errors.consulta}
            helperText={errors.consulta?.message}
            value={consultaValue}
          >
            {productos.length > 0 && (
              <MenuItem key="productos-header" disabled>
                — Productos —
              </MenuItem>
            )}
            {opcionesProducto}

            {servicios.length > 0 && (
              <MenuItem key="servicios-header" disabled>
                — Servicios —
              </MenuItem>
            )}
            {opcionesServicio}
          </TextField>
        )}
      />

      {/* Nuevo campo mensaje */}
      <TextField
        label="Mensaje (opcional)"
        fullWidth
        margin="normal"
        multiline
        minRows={4}
        maxRows={8}
        inputProps={{ maxLength: 1000 }}
        {...register('mensaje', {
          maxLength: {
            value: 1000,
            message: 'Máximo 1000 caracteres permitidos',
          },
        })}
        error={!!errors.mensaje}
        helperText={
          errors.mensaje?.message || `${mensajeValue.length} / 1000 caracteres`
        }
      />

      {/* Honeypot oculto para bots */}
      <input
        type="text"
        name="phone"
        style={{ display: 'none' }}
        autoComplete="off"
        {...register('phone')}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={isSubmitting}
        sx={{ mt: 3 }}
      >
        Enviar
      </Button>
    </Box>
  );
};

export default Contacto;
