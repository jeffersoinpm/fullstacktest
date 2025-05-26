
# 🚀 Despliegue con Docker (Angular + Spring Boot + PostgreSQL)

Este proyecto contiene una aplicación completa con:

- ✅ Backend en Spring Boot
- ✅ Frontend en Angular
- ✅ Base de datos en PostgreSQL
- ✅ Orquestado con Docker Compose

---

## 📁 Estructura del Proyecto

```
/ejercicio-fullstack-base
│
├── backend/              # Proyecto Spring Boot
│   └── Dockerfile
│
├── frontend/             # Proyecto Angular
│   ├── Dockerfile
│   └── nginx.conf
│
└── docker-compose.yml
```

---

## ⚙️ Pre-requisitos

- Docker
- Docker Compose
- Maven (`mvn`) para generar el `.jar` del backend

---

## 🔨 1. Generar el `.jar` del backend

```bash
cd backend
mvn clean install
```

Esto crea el archivo `target/banco-0.0.1-SNAPSHOT.jar`.

---

## 🐳 2. Construir las imágenes Docker

Desde la raíz del proyecto:

```bash
docker-compose build
```

---

## ▶️ 3. Ejecutar toda la aplicación

```bash
docker-compose up
```

O en segundo plano:

```bash
docker-compose up -d
```

---

## 📌 Servicios expuestos

| Servicio     | URL                          |
|--------------|------------------------------|
| Frontend     | http://localhost:4200        |
| Backend API  | http://localhost:8080        |
| PostgreSQL   | localhost:5432 (user/pass)   |

> ⚠️ El backend se conecta a PostgreSQL por hostname `db-postgres`.

---

## 🛑 4. Detener y eliminar contenedores

```bash
docker-compose down
```

---

## ⚠️ Variables importantes

En `docker-compose.yml`:

```yaml
POSTGRES_DB: banco
POSTGRES_USER: user
POSTGRES_PASSWORD: pass
```

En `application.properties` (Spring Boot):

```properties
spring.datasource.url=jdbc:postgresql://db-postgres:5432/banco
spring.datasource.username=user
spring.datasource.password=pass
```
