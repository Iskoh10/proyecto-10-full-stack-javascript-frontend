# Proyecto 10-frontend
## _ORGANIZADOR DE EVENTOS_

Este es el frontend del **Proyecto 10**, una aplicación web que permite a los usuarios registrarse, iniciar sesión, recuperar contraseñas y crear eventos, así como gestionar su asistencia a dichos eventos. Se comunica con el backend mediante peticiones `fetch`.
 
## **++App en producción++**
[Proyecto 10 en producción](https://proyecto10-frontend-zeta.vercel.app)

## **++Tecnologías utilizas++**
- HTML, CSS y JavaScript (Vanilla)
- Vite
- Fetch API para solicitudes HTTP
- Vercel para despliegue

## Installation
Sigue estos pasos para instalar y ejecutarlo en tu entorno local:
### 1. Clonar el repositorio
Clona este repositorio en tu maquina local usando el siguiente comando en la consola:
```sh
git clone https://github.com/Iskoh10/proyecto-10-full-stack-javascript-frontend.git
```

### 2. Acceder al directorio del proyecto
Navega al directorio del proyecto clonado:
```sh
cd proyecto-10-full-stack-javascript-frontend.git
```

### 3. Instalar las dependencias
Instala las dependencias necesarias:
```sh
npm install
```

### 4. Iniciar el servidor de desarrollo
Ejecuta el servidor con el comando:
```sh
npm run dev
```

### 5. Estructura del proyecto
```
📁 proyecto10-frontend
├── 📁 public
├── 📁 src
│ ├── 📁 components
│ ├── 📁 handlers
│ ├── 📁 pages
│ ├── 📁 utils
│ ├── main.js
│ ├── style.css
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
└── vercel.json
```

### 6. Comunicación con el backend
Todas las solicitudes a la API se hacen con fetch a:
```
    https://proyecto10-backend-beta.vercel.app/api/
```
Ejemplo de llamada:
```
    const response = await apiRequest({
    method: "POST",
    url: "v1/users/login",
    body: { email, password }
    });
```

### 7. Recuperación de contraseña
El correo enviado al usuario contiene un enlace como el siguiente:
```
    https://proyecto10-frontend-zeta.vercel.app/resetpassword/:userId/:token
 ```

### 8. Despliegue en Vercel
El archivo `vercel.json` asegura que las rutas funcionen correctamente con SPA:
```json
{
    "rewrites": [
        { "source": "/(.*)", "destination": "/" }
    ]
}
```

## License

**Free Software, Hell Yeah!**
