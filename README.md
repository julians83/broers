# NestJS Backend con MongoDB en Docker

Este proyecto es una API desarrollada con NestJS que utiliza MongoDB como base de datos. La aplicación está preparada para ejecutarse en un entorno Dockerizado.

## 🚀 Tecnologías utilizadas

- [NestJS](https://nestjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Docker](https://www.docker.com/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)

## 💂️ Requisitos previos

Asegúrate de tener instalados los siguientes programas en tu sistema:

- [Node.js](https://nodejs.org/) (versión 18 o superior)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## 📂 Estructura del proyecto

```
/app
│── src/
│   ├── modules/
│   ├── main.ts
│   ├── app.module.ts
│── package.json
│── Dockerfile
│── docker-compose.yml
│── README.md
```

## 🔧 Instalación y uso

### 1. Clonar el repositorio

```sh
git clone https://github.com/julians83/broers
cd broers
```

### 2. Construir e iniciar los contenedores

```sh
docker-compose up --build
```

Esto ejecutará:

- Un contenedor con MongoDB en el puerto `27017`.
- Un contenedor con el backend NestJS en el puerto `3000`.

Para detener los contenedores, usa:

```sh
docker-compose down
```

## 🔢 Variables de entorno

La aplicación utiliza las siguientes variables de entorno:

```
MONGO_URI=mongodb://mongodb:27017/nestjs_db
```

Puedes definir variables adicionales en un archivo `.env`.

## 🛠️ Comandos disponibles

Dentro del contenedor del backend, puedes ejecutar:

```sh
docker exec -it nestjs_backend sh
```

Ejecutar migraciones o semillas:

```sh
npm run seed
```

## 🌐 Acceso a la API

Una vez iniciada la aplicación, puedes acceder a la API en:

```
http://localhost:3000
```


## 🔄 Reconstruir el proyecto

Si realizas cambios en el código fuente y deseas reflejarlos en Docker:

```sh
docker-compose down
```

```sh
docker-compose up --build
```

## 💡 Solución de errores

### Error: `invalid ELF header` en bcrypt

Si encuentras este error, significa que `bcrypt` no se compiló correctamente para el entorno de Docker. Asegúrate de reconstruir el paquete dentro del contenedor:

```sh
docker-compose down --rmi all --volumes --remove-orphans
```

```sh
docker-compose up --build
```

Alternativamente, en el `Dockerfile`, asegúrate de reconstruir `bcrypt`:

```dockerfile
RUN npm install && npm rebuild bcrypt --build-from-source
```

## 💎 Contribuciones

Si deseas contribuir, por favor crea un *fork* del repositorio y envía un *pull request* con tus mejoras.

## 👥 Autor

Desarrollado por Julians83

## 🏢 Licencia

Este proyecto está bajo la licencia MIT. Para más información, consulta el archivo [LICENSE](LICENSE).

