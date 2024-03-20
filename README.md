# CRUD de Artículos

Este proyecto implementa un CRUD (Create, Read, Update, Delete) para gestionar artículos utilizando una aplicación web desarrollada con Node.js, Express y MySQL en el backend, y HTML, CSS y JavaScript en el frontend.

## Backend

El backend de la aplicación está construido con Node.js y Express, y se encarga de manejar las solicitudes HTTP y las operaciones CRUD en la base de datos MySQL.

### Configuración del Backend

1. **Instalación de dependencias**: Antes de ejecutar el servidor, asegúrate de instalar todas las dependencias necesarias ejecutando `npm install`.

2. **Configuración de la base de datos**: Asegúrate de tener una base de datos MySQL configurada. Puedes modificar los parámetros de conexión en el archivo `index.js` para que coincidan con tu entorno.

3. **Inicio del servidor**: Para iniciar el servidor, ejecuta `node index.js` en tu terminal. Por defecto, el servidor se ejecutará en el puerto 5500.

### Endpoints del Backend

- `GET /api/articulos`: Obtiene todos los artículos de la base de datos.
- `GET /api/articulos/:id`: Obtiene un solo artículo según su ID.
- `POST /api/articulos`: Crea un nuevo artículo en la base de datos.
- `PUT /api/articulos/:id`: Actualiza un artículo existente según su ID.
- `DELETE /api/articulos/:id`: Elimina un artículo existente según su ID.

## Frontend

El frontend de la aplicación está construido con HTML, CSS y JavaScript, y proporciona una interfaz de usuario para interactuar con el backend.

### Configuración del Frontend

1. **Servir archivos estáticos**: Asegúrate de servir los archivos HTML, CSS y JavaScript estáticos. Puedes utilizar cualquier servidor HTTP para esto.

### Interacción con el Backend

- **Crear artículo**: Al hacer clic en el botón "Crear", se muestra un modal para ingresar los detalles del nuevo artículo. Al enviar el formulario, se crea un nuevo artículo en la base de datos.
- **Editar artículo**: Al hacer clic en el botón "Editar" de un artículo existente, se muestra un modal con los detalles del artículo seleccionado. Al enviar el formulario, se actualiza el artículo en la base de datos.
- **Eliminar artículo**: Al hacer clic en el botón "Borrar" de un artículo existente, se elimina el artículo de la base de datos después de confirmar la acción.

¡Y eso es todo! Con estas instrucciones, deberías poder configurar y utilizar este CRUD de artículos en tu entorno local. Si tienes alguna pregunta o necesitas ayuda adicional, no dudes en contactarme. ¡Disfruta construyendo tu aplicación!
