# 🎬 Series App Ecosystem (Fullstack)

Este repositorio contiene un ecosistema completo para la gestión y calificación de series, compuesto por una **API REST**, un **Panel Web Administrativo** y una **Aplicación Móvil**.

El proyecto demuestra la integración de diferentes tecnologías modernas compartiendo una misma lógica de negocio y base de datos.

## 🏗️ Arquitectura del Proyecto

El ecosistema se divide en tres componentes principales:

### 1. 📂 Backend (NestJS)
Ubicado en `/backend-nestjs`. Es el núcleo del sistema.
- **Framework:** NestJS (Node.js).
- **Base de Datos:** MongoDB.
- **Funcionalidad:** API RESTful que gestiona el CRUD de series, sinopsis, calificaciones y persistencia de datos.

### 2. 📂 Web Admin (Angular)
Ubicado en `/Angular`. Panel de control para administradores.
- **Framework:** Angular.
- **Funcionalidad:** Interfaz web para gestionar el catálogo de series, permitiendo añadir, editar y eliminar registros que luego se reflejan en la app móvil.

### 3. 📂 Mobile App (Ionic & Angular)
Ubicado en `/seriesApp`. Aplicación para el usuario final.
- **Framework:** Ionic + Angular.
- **Funcionalidad:** Aplicación multiplataforma donde los usuarios pueden consultar datos, leer sinopsis y ver calificaciones de sus series favoritas.

## 🛠️ Tecnologías Utilizadas

- **Lenguajes:** TypeScript (100% del proyecto).
- **Frontend:** Angular, HTML5, SCSS.
- **Móvil:** Ionic Framework.
- **Backend:** NestJS.
- **Database:** MongoDB.
- **Herramientas:** Git, Vite, npm.

## 🚀 Cómo ejecutar el ecosistema

Para poner en marcha el sistema completo, se deben inicializar los componentes en el siguiente orden:

1.  **Backend:** Entrar en `backend-nestjs`, instalar dependencias y ejecutar `npm run start`.
2.  **Web Admin:** Entrar en `Angular`, instalar dependencias y ejecutar `ng serve`.
3.  **App Móvil:** Entrar en `seriesApp`, instalar dependencias y ejecutar `ionic serve`.

## 📈 Valor Educativo
Este proyecto fue desarrollado para poner en práctica la comunicación entre aplicaciones desacopladas, el manejo de estados en Angular y la creación de APIs robustas con NestJS, cumpliendo con los estándares aprendidos durante mi formación técnica en **Desarrollo de Aplicaciones Multiplataforma (DAM)**.

---
Desarrollado por [Eduardo Andrés](https://github.com/eduardoandr3s)
