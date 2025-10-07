# Desafío 6 - Tienda de Joyas
Curso Backend con Node y Express (G90) - 5 Autenticación y Autorización de usuarios con JWT

### Descripción

1. (a) Devuelva la estructura HATEOAS de todas las joyas almacenadas en la base de datos 
1. (b) Reciba en la query string los parámetros: 
    - limits: Limita la cantidad de joyas a devolver por página 
    - page: Define la página 
    - order_by: Ordena las joyas según el valor de este parámetro, ejemplo: stock_ASC 

2. Crear una ruta GET/joyas/filtros que reciba los siguientes parámetros en la query string: 
    - precio_max: Filtrar las joyas con un precio mayor al valor recibido (X!)
    - precio_min: Filtrar las joyas con un precio menor al valor recibido. (X!)
    - categoria: Filtrar las joyas por la categoría 
    - metal: Filtrar las joyas por la categoría 
    
3. Implementar middlewares para generar informes o reportes de alguna actividad o evento específico que ocurra en cada una de las rutas. 

4. Usar try catch para capturar los posibles errores durante una consulta y la lógica de cada ruta creada 

5. Usar las consultas parametrizadas para evitar el SQL Injection en la consulta a la base de datos relacionada con la ruta GET /joyas/filtros


*(!) Crear .env desde .env.example para testear proyecto.*

