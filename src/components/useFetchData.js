import { useState, useEffect } from 'react';

const useFetchData = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // Para evitar actualizar estado si el componente se desmonta

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`Error en la petición: ${response.statusText}`);
        }
        const json = await response.json();
        if (isMounted) setData(json);
      } catch (err) {
        if (isMounted) setError(err.message || 'Error inesperado durante la carga de datos');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url, JSON.stringify(options)]); // re-fetch si cambian url u options

  return { data, loading, error };
};

export default useFetchData;
