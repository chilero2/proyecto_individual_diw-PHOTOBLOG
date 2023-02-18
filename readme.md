# PhotoBlog

## 📸 Aplicación Photolog

Photolog es una red social donde los usuarios, tras registrarse, pueden resumir cada día mediante una imagen o gif.
Sólo pueden subir una foto por día, por lo que si en un mismo día se actuliza la imagen del día, la anterior será eliminada de la API. Además, sólo durante ese día, podrá añadir un comendario adicional a dicha imagen. Al terminar el día, esa imagen aparecerá en la sección de últimos días, donde puede consultar y ver en detalle cada imagen.
Además puede modificar los datos de su perfil, e incluso, añadir una foto de perfil.
Tambiérn tiene acceso a las imagenes del resto de usuarios de Photolog.

## 🎨 Boceto inicial

Boceto realizado con [Figma](https://www.figma.com/file/DR5Vfv03GT9lJ6OZzYxu9T/Proyecto-DIW---Fotoblog?node-id=0%3A1&t=aDqeAylbPkmqMn6p-1)

## 🚀 Requisitos necesarios

- Instalar dependencias: `npm install`
- Ejecutar aplicación en modo web:
  - Lanzar aplicación: `npm run start`
  - Lanzar servidor: dentro del archivo **post-service.service.ts**, comprobar que la url de localhost está descomentada y comentar el resto. Lanzar el comando `npm run server`
- Ejecutar aplicación en un dispositivo externo:
  - Lanzar aplicación: `npm run external`. Desde la barra de navegación del dispositivo, poner la la url: *direccion_ip*:8100
  - Lanzar servidor: dentro del archivo **post-service.service.ts**, modificica la url con la dirección ip. Luego lanzar el comando `npm run server-ext`

## 📚 Librerías utilizadas

Además del Ionic y Angular, se han utilizado las siguientes librerías externas:

- Json Server -> API Fake de entorno de desarrollo para poder guardar las imágenes de la aplicación y los datos de los usuarios.
- JWT -> Librería para generar tokens
- Luxon -> Librería para trabajar con fechas
- uuid -> Generador de RFC4122 UUIDs
