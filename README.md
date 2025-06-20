

# Registrar usuario
- POST http://localhost:3000/api/auth/register

{
  "nombre": "",
  "correo": "",
  "password": ""
}

# Loguear usuario
- POST http://localhost:3000/api/auth/login

{
  "correo": "",
  "password": ""
}

### CUENTA ADMIN ###
{
  "correo": "321@gmail.com",
  "password": "123"
}


# Productos 
# Crear producto (requiere rol admin): 
- POST http://localhost:3000/admin/productos

 Usar token de admin:
  Authorization: Bearer <token>

{
  "nombre": "",
  "descripcion": "",
  "precio": numero,
  "stock": numero,
  "img": ""
}

# Ver productos
- GET http://localhost:3000/api/productos

# Borrar producto (requiere rol admim):
Una vez que hacemos el get de todos los productos podemos ver el campo _id con el cual podemos borrar el producto que querramos:
- DELETE http://localhost:3000/admin/productos/:id

Usar token de admin:
  Authorization: Bearer <token>

# Modificar producto (requiere rol admim):
De manera similar con borrar, con el id podemos realizar el cambio en el producto:
- PUT http://localhost:3000/admin/productos/:id 

Usar token de admin:
  Authorization: Bearer <token>

{
  "nombre": "",
  "descripcion": "",
  "precio": numero,
  "stock": numero,
  "img": ""
}

  Ordenes

# Ver todas las órdenes(requiere rol admin):
  http://localhost:3000/admin/ordenes

  Usar token de admin:
  Authorization: Bearer <token>

# Crear orden
- POST http://localhost:3000/admin/ordenes

{
  "productos": [
    { "productoId": "685094517b53d715f4101a05", "cantidad": 1 },
    { "productoId": "685096b5d9f00595c7b1c3fd", "cantidad": 1 }
  ],
  "cliente": "Facundo Alvarez"
}

# Cambiar estado (requiere rol admin):
- PUT http://localhost:3000/admin/ordenes/:id

{
  "estado": ""
}




