import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Alert
} from '@mui/material';

const Contacto = ({ productos = [], servicios = [] }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm();

  // Obtenemos el valor del mensaje para contador
  const mensajeValue = watch('mensaje', '');

  // Honeypot para bots
  const [botDetected, setBotDetected] = React.useState(false);

  const onSubmit = (data) => {
    if (data.phone) {
      setBotDetected(true);
      return;
    }
    setBotDetected(false);

    console.log('Enviando datos:', data);

    reset();
  };

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

      <TextField
        select
        label="Consulta sobre"
        fullWidth
        margin="normal"
        defaultValue=""
        {...register('consulta', { required: 'Selecciona una opción' })}
        error={!!errors.consulta}
        helperText={errors.consulta?.message}
      >
        <MenuItem value="" disabled>
          Selecciona...
        </MenuItem>
        {productos.length > 0 && (
          <optgroup label="Productos">
            {productos.map((p) => (
              <MenuItem key={p.id} value={`producto: ${p.nombre}`}>
                {p.nombre}
              </MenuItem>
            ))}
          </optgroup>
        )}
        {servicios.length > 0 && (
          <optgroup label="Servicios">
            {servicios.map((s) => (
              <MenuItem key={s.id} value={`servicio: ${s.nombre}`}>
                {s.nombre}
              </MenuItem>
            ))}
          </optgroup>
        )}
      </TextField>

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
