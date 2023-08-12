# Market

![My Skills](https://skillicons.dev/icons?i=html,css,ts,vite,vue,php,laravel,mysql)

## Instrucciones

### Requisitos previos

- [Node.js](https://nodejs.org/)
- [Composer](https://getcomposer.org/)
- [PHP](https://www.php.net/)
- [Laravel](https://laravel.com/docs/10.x/installation)
- [MySQL](https://www.mysql.com/)

### Configuración

1. Clonar repositorio:

```bash
git clone https://github.com/dazfz/market.git
```

2. Navegar al directorio del proyecto:

```bash
cd market
```

3. Instala las dependencias:

```bash
npm install
```

4. Navegar al directorio del back-end:

```bash
cd back
```

5. Copiar el archivo `.env.example` y renombrarlo a `.env`. Luego, configurar las variables de entorno necesarias, como la conexión a la base de datos y la URL base de la API.

6. Generar la clave de la aplicación de Laravel:

```bash
php artisan key:generate
```

7. Ejecutar las migraciones para crear las tablas en la base de datos:

```bash
php artisan migrate
```

### Uso

1. Inicia el servidor de desarrollo para el frontend:

```bash
cd front
```

```bash
npm run dev
```

2. Inicia el servidor de desarrollo para el backend:

```bash
cd back
```

```bash
php artisan serve
```

3. Acceder a la aplicación en el navegador web en la URL proporcionada por el front-end. Generalmente es: http://localhost:8000/market

### Características

- Lista de productos disponibles.
- Detalles de un producto específico.
- Agregar nuevos productos.
- Actualizar información de productos existentes.
- Eliminar productos.
- Carrito de compras.
