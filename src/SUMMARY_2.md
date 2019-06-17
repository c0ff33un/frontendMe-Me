# Sprint 2

### Reporte de avance

####1. Validaciones

Se realizan las validaciones en el formulario de registro. Las validaciones son mostradas al usuario por medio de mensajes y código de colores.

![Login Page](../imgs\validacion1.jpg)
![Login Page](../imgs\validacion2.jpg)

####2. Implementación de autenticación
Se realizó la implementación para el inicio de sesión y el registro del usuario. Los componentes que contienen la implementación son src\screens\login\components\UserInput.js y src\screens\sign_up\components\UserInput.js para inicio de sesión y registro respectivamente.

####3. Consumo de endpoints de back
#####POST
Subir imágenes utilizando la dirección /user/memes del API

![Login Page](../imgs\upload_meme.jpg)

#####GET
Obtener las imagenes subidas por los usuarios y visualizarlas en el feed

![Login Page](../imgs\feed.jpg)

Obtener estadisticas y mostrarlas al usuario

![Login Page](../imgs\stats.jpg)

####4. Implementar Redux para el manejo de sesiones
Se almacenó el jwt para mantener la sesión del usuario activa, es posible encontrar la implementación de redux en la carpeta src\redux

####5. Protección de rutas
Se realizó la protección de rutas en el fichero src\MemeApp.js
