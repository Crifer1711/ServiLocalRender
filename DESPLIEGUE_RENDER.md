# 🚀 Guía de Despliegue en Render - ServiLocal

Esta guía te llevará paso a paso para desplegar tu aplicación ServiLocal en Render con PostgreSQL.

---

## 📋 Requisitos Previos

1. Una cuenta en [Render](https://render.com) (es gratis)
2. Tu código en un repositorio de GitHub
3. Node.js instalado localmente (para pruebas)

---

## 🗄️ PASO 1: Crear la Base de Datos PostgreSQL

### 1.1 Crear PostgreSQL en Render

1. Ve a tu [Dashboard de Render](https://dashboard.render.com/)
2. Haz clic en **"New +"** → **"PostgreSQL"**
3. Configura tu base de datos:
   - **Name**: `servilocal-db`
   - **Database**: `servilocal`
   - **User**: `servilocal_user` (o el que prefieras)
   - **Region**: Elige la más cercana a tus usuarios
   - **Plan**: Free (para empezar)
4. Haz clic en **"Create Database"**
5. **¡IMPORTANTE!** Copia la **Internal Database URL** que aparece en la página de tu base de datos

### 1.2 Ejecutar el Script SQL

1. Una vez creada la base de datos, ve a la pestaña **"Info"** de tu PostgreSQL
2. Busca la sección **"Connections"**
3. Haz clic en **"Connect"** → **"External Connection"**
4. Copia el comando PSQL que aparece (algo como):
   ```
   PGPASSWORD=xxx psql -h dpg-xxx.oregon-postgres.render.com -U servilocal_user servilocal
   ```

5. **OPCIÓN A - Usar psql (línea de comandos):**
   - Abre tu terminal
   - Pega el comando PSQL
   - Una vez conectado, copia y pega el contenido del archivo `database.sql`

6. **OPCIÓN B - Usar el Dashboard:**
   - En el dashboard de tu base de datos, busca la pestaña **"Connect"**
   - Usa algún cliente PostgreSQL como [pgAdmin](https://www.pgadmin.org/) o [DBeaver](https://dbeaver.io/)
   - Conéctate con las credenciales proporcionadas
   - Ejecuta el script `database.sql`

---

## 🔧 PASO 2: Desplegar el Backend

### 2.1 Preparar el Backend

1. Asegúrate de que tu código esté en GitHub
2. En tu repositorio, verifica que existan estos archivos:
   - `backend/package.json`
   - `backend/app.js`
   - `backend/config/db.js`

### 2.2 Crear el Web Service del Backend

1. En Render Dashboard, haz clic en **"New +"** → **"Web Service"**
2. Conecta tu repositorio de GitHub
3. Configura el servicio:
   - **Name**: `servilocal-backend`
   - **Region**: La misma que elegiste para la base de datos
   - **Branch**: `main` (o la rama que uses)
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free (para empezar)

4. **Variables de Entorno** (Environment Variables):
   - Haz clic en **"Advanced"** → **"Add Environment Variable"**
   - Agrega estas variables:

   ```
   NODE_ENV = production
   DATABASE_URL = [Pega aquí la Internal Database URL de tu PostgreSQL]
   PORT = 5000
   ```

5. Haz clic en **"Create Web Service"**

6. **Espera a que se despliegue** (tarda unos 5-10 minutos la primera vez)

7. Una vez desplegado, copia la URL de tu backend (ejemplo: `https://servilocal-backend.onrender.com`)

---

## 🎨 PASO 3: Desplegar el Frontend

### 3.1 Actualizar la URL del API

Antes de desplegar el frontend, necesitas actualizar la URL del backend:

1. Abre el archivo `src/api/axiosPublic.js` (o donde configures axios)
2. Actualiza la URL base:
   ```javascript
   const API_URL = 'https://servilocal-backend.onrender.com';
   ```

3. **Guarda y haz commit** de este cambio a GitHub

### 3.2 Crear el Static Site del Frontend

1. En Render Dashboard, haz clic en **"New +"** → **"Static Site"**
2. Conecta tu repositorio de GitHub
3. Configura el servicio:
   - **Name**: `servilocal-frontend`
   - **Branch**: `main`
   - **Root Directory**: Déjalo vacío (usa la raíz del proyecto)
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`

4. **Variables de Entorno**:
   ```
   REACT_APP_API_URL = https://servilocal-backend.onrender.com
   ```

5. Haz clic en **"Create Static Site"**

6. Espera a que se despliegue

7. Una vez desplegado, tendrás tu URL del frontend (ejemplo: `https://servilocal.onrender.com`)

---

## ✅ PASO 4: Verificar el Despliegue

### 4.1 Probar el Backend

1. Abre tu navegador
2. Ve a: `https://tu-backend.onrender.com/api/test`
3. Deberías ver: `{"message": "Backend funcionando OK"}`

### 4.2 Probar el Frontend

1. Abre: `https://tu-frontend.onrender.com`
2. Verifica que la página cargue correctamente
3. Prueba el login con las credenciales por defecto:
   - **Admin**: usuario `admin`, password `admin123`

### 4.3 Probar la Conexión Completa

1. Intenta registrar un nuevo prestador
2. Sube una foto de perfil
3. Verifica que el login funcione

---

## 📦 PASO 5: Subir Imágenes (Configuración Adicional)

**IMPORTANTE**: El plan gratuito de Render **NO persiste archivos** entre despliegues. Para almacenar imágenes permanentemente, necesitas:

### Opción A: Usar Cloudinary (Recomendado)

1. Crea una cuenta gratuita en [Cloudinary](https://cloudinary.com/)
2. Instala el SDK:
   ```bash
   npm install cloudinary multer-storage-cloudinary
   ```
3. Configura Cloudinary en tu backend (ver docs de Cloudinary)

### Opción B: Usar AWS S3

1. Crea un bucket en AWS S3
2. Instala el SDK:
   ```bash
   npm install aws-sdk multer-s3
   ```

### Opción C: Plan de Pago de Render

Upgrade a un plan de pago que incluye almacenamiento persistente.

---

## 🔄 Actualizaciones Automáticas

Render detecta automáticamente cambios en tu repositorio de GitHub:

1. Haz cambios en tu código
2. Haz commit y push a GitHub
3. Render automáticamente re-desplegará tu aplicación

---

## 🐛 Solución de Problemas

### El backend no conecta a la base de datos

- Verifica que la variable `DATABASE_URL` esté correctamente configurada
- Asegúrate de usar la **Internal Database URL**, no la External
- Revisa los logs en Render Dashboard → Tu servicio → Logs

### El frontend no puede llamar al backend

- Verifica que la URL del backend esté correcta en tu código
- Asegúrate de usar HTTPS, no HTTP
- Revisa la consola del navegador para errores de CORS

### Las imágenes no se guardan

- El plan gratuito no persiste archivos
- Considera usar Cloudinary o AWS S3

### Error 503 o servicio inactivo

- El plan gratuito pone los servicios a dormir después de 15 minutos de inactividad
- La primera petición después de que se durmió puede tardar 30-60 segundos
- Considera el plan de pago si necesitas disponibilidad constante

---

## 📊 Monitoreo

Para ver los logs y monitorear tu aplicación:

1. Ve al Dashboard de Render
2. Haz clic en tu servicio (backend o frontend)
3. Ve a la pestaña **"Logs"**
4. Aquí verás todos los errores y mensajes de tu aplicación en tiempo real

---

## 💰 Costos

- **Plan Gratuito**:
  - PostgreSQL: 90 días gratis, luego $7/mes
  - Web Service: Gratis (con limitaciones)
  - Static Site: Gratis
  
- **Limitaciones del Plan Gratuito**:
  - Los servicios se duermen después de 15 minutos de inactividad
  - 750 horas de uso por mes
  - No hay almacenamiento persistente de archivos

---

## 📞 Soporte

- [Documentación de Render](https://render.com/docs)
- [Community Forum](https://community.render.com/)
- [Status Page](https://status.render.com/)

---

## 🎉 ¡Listo!

Tu aplicación ServiLocal debería estar funcionando en:

- **Backend**: `https://servilocal-backend.onrender.com`
- **Frontend**: `https://servilocal.onrender.com`

¡Felicidades por tu despliegue! 🚀
