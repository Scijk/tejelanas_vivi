# Tejelanas Vivi

**Versión:** 1.0.0 
**Fecha:** 31/05/2025 
**Desarrollado por:** Christopher Gómez para FrontEnd Ipss

Proyecto desarrollado con [Create React App](https://github.com/facebook/create-react-app).

## Estructura del Proyecto

```
tejelanas_vivi/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── About.js
│   │   ├── CarruselProductoServicio.js
│   │   ├── Contacto.js
│   │   ├── Faqs.js
│   │   ├── Footer.js
│   │   ├── Header.js
│   │   └── TarjetaItem.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   ├── index.css
│   └── context/
│       ├── Constantes.js
│       ├── ContactoContext.js
│       └── useFetchData.js
├── package.json
└── README.md
```

- **public/**: Archivos estáticos.
- **src/**: Código fuente principal.
  - **components/**: Componentes reutilizables de React.
  - **context/**: Componentes utilizados para distintos componentes en contexto.
- **App.js**: Componente principal de la aplicación. Orquesta la landing page

## Instalación

1. Clona el repositorio:
   ```sh
   git clone https://github.com/Scijk/tejelanas_vivi.git
   cd tejelanas_vivi
   ```
2. Instala las dependencias:
   ```sh
   npm install
   ```
3. Inicia la aplicación en modo desarrollo:
   ```sh
   npm start
   ```

## Uso de los Componentes

- **Header**: Muestra la cabecera y navegación principal.
  ```jsx
  import Header from './components/Header';
  <Header />
  ```
- **Footer**: Pie de página con información de contacto o enlaces.
  ```jsx
  import Footer from './components/Footer';
  <Footer />
  ```
- **TarjetaItem**: Componente para mostrar contener productos y servicios.
  ```jsx
  import TarjetaItem from './components/TarjetaItem';
  TarjetaItem = ({ tipo, titulo, descripcion, imagen, extraInfo })
  ```
- **useFetchData**: Permite hacer las llamadas fetch a apis con url dinámicas.
  ```jsx
  import useFetchData from './context/useFetchData';

  -- Recibe la url por parámetro y asigna un token bearer para autorizar
  const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url, {
          headers: { Authorization: Constantes.tokenBearer }
        });
  ```

Puedes personalizar los componentes y pasarles props según tus necesidades.

## Scripts Disponibles

- `npm start`: Ejecuta la app en modo desarrollo.
- `npm test`: Ejecuta los tests.
- `npm build`: Genera una versión optimizada para producción.
- `npm eject`: Expone la configuración de Create React App.

## Recursos

- [Documentación de Create React App](https://facebook.github.io/create-react-app/docs/getting-started)
- [Documentación de React](https://reactjs.org/)

---