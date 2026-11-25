# DOCUMENTACIÓN DEL USO DE INTELIGENCIA ARTIFICIAL

## 1. Herramienta utilizada

Durante el desarrollo de **Ruta1yRuta2 – Descubrí Paraguay**, utilicé Claude (Anthropic) como herramienta de apoyo para programar con Ionic y Angular.

La IA me ayudó a comprender la lógica, generar fragmentos de código, resolver errores y mejorar el diseño. Las decisiones sobre las funcionalidades, los destinos y las modificaciones fueron realizadas por mí.

## 2. Prompts principales utilizados

Estos son algunos de los pedidos realizados durante el desarrollo (resumidos):

1. Crear una aplicación turística de Paraguay con Ionic y Angular, utilizando las pestañas Explorar, Mis lugares y Mi ruta.
2. Explicar paso a paso cómo desarrollar el proyecto, indicando primero la lógica y luego el código.
3. Implementar los destinos mediante un archivo JSON y evaluar el uso de APIs para obtener información e imágenes.
4. Crear la búsqueda de destinos por nombre, ciudad y departamento, ignorando mayúsculas y acentos.
5. Agregar filtros por departamento y categoría turística.
6. Diseñar una pantalla de detalles para cada destino, mostrando su fotografía, ubicación, descripción y datos principales.
7. Implementar la opción de guardar destinos como favoritos y marcar lugares como visitados.
8. Crear una sección de Mis lugares que permita diferenciar favoritos, visitados y pendientes.
9. Implementar recomendaciones de destinos según las categorías y departamentos de los lugares favoritos.
10. Crear una ruta personalizada que permita agregar, eliminar y reordenar destinos.
11. Ordenar los destinos de la ruta según su cercanía a la ubicación actual.
12. Integrar Google Maps para abrir ubicaciones y visualizar el recorrido completo desde la ubicación del usuario.
13. Implementar el intercambio de destinos y recorridos mediante WhatsApp.
14. Incorporar un mapa interactivo utilizando OpenStreetMap y Leaflet.
15. Mejorar visualmente las pantallas sin modificar las funcionalidades que ya estaban funcionando.
16. Agregar nuevos destinos turísticos de Paraguay, incluyendo sus coordenadas, ciudades y descripciones.
17. Corregir fotografías que no correspondían a determinados destinos, dando prioridad a las imágenes propias.
18. Adaptar la aplicación para probarla como PWA desde un iPhone.
19. Generar un ícono para la aplicación relacionado con el turismo y los lugares de Paraguay.
20. Configurar Capacitor y preparar el proyecto para generar una APK de Android.
21. Configurar la publicación de la aplicación en Netlify.
22. Crear y mejorar el archivo README con las instrucciones de instalación, tecnologías, funcionalidades y estructura del proyecto.
23. Revisar los errores que aparecían durante la programación y explicar cómo solucionarlos.

## 3. Partes del código generadas con IA

La IA colaboró en la generación de código para:

- **Servicios:** destinos, Wikipedia, favoritos, rutas, ubicación, recomendaciones y compartir.
- **Componentes:** Explorar, detalle de destinos, Mis lugares, Mi ruta y mapa.
- **Modelo de datos:** estructura de los destinos y sus propiedades.
- **Configuración:** PWA, Capacitor y publicación en Netlify.

El código fue integrado y probado durante el desarrollo. También realicé modificaciones en los componentes, datos, imágenes, coordenadas y funcionalidades según las necesidades del proyecto. Por ejemplo, cambié el orden de los botones del detalle, elegí y verifiqué los 22 destinos y sus coordenadas, agregué fotos propias y corregí títulos de Wikipedia que no traían foto.

## 4. Errores encontrados y correcciones

| Problema encontrado | Solución aplicada |
|---|---|
| OpenTripMap devolvía errores. | Se optó por utilizar Wikipedia para obtener información e imágenes. |
| Algunos destinos no tenían coordenadas. | Se agregaron y verificaron las coordenadas mediante Google Maps. |
| Las recomendaciones seguían mostrando destinos eliminados de favoritos. | Se corrigió la lógica para utilizar solamente los favoritos actuales. |
| Algunas imágenes de Wikipedia no correspondían al destino. | Se incorporaron fotografías propias y se ajustó la prioridad de las imágenes. |
| La configuración automática de PWA presentó errores. | Se realizó la configuración manual. |
| El diseño inicial de la pantalla de detalles no era adecuado. | Se reorganizó la información para facilitar su visualización. |
|

## 5. Reflexión personal

La utilización de inteligencia artificial fue de gran ayuda durante el desarrollo, especialmente para comprender conceptos de Ionic y Angular y resolver problemas de programación.

Sin embargo, fue necesario revisar las respuestas, probar el código y realizar correcciones cuando los resultados no eran los esperados. Participé en la elección de las funcionalidades, los destinos, las imágenes, el diseño y las pruebas de la aplicación.

Esta experiencia me permitió aprender más sobre el desarrollo de aplicaciones móviles y comprender que la inteligencia artificial es una herramienta de apoyo, pero que es importante saber revisar, adaptar y validar lo que genera.
