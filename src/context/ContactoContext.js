import { createContext, useContext, useState } from 'react';

const ContactoContext = createContext();

export const ContactoProvider = ({ children }) => {
  const [itemSeleccionado, setItemSeleccionado] = useState('');

  return (
    <ContactoContext.Provider value={{ itemSeleccionado, setItemSeleccionado }}>
      {children}
    </ContactoContext.Provider>
  );
};

export const useContactoContext = () => useContext(ContactoContext);