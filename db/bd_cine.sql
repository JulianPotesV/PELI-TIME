-- Crear las tablas en PostgreSQL

-- Tabla `peliculas`
CREATE TABLE peliculas (
  idPeliculas SERIAL PRIMARY KEY,
  titulo VARCHAR(45),
  descripcion VARCHAR(400),
  duracion INT,
  clasificacion VARCHAR(45),
  genero VARCHAR(45)
);

-- Tabla `salas`
CREATE TABLE salas (
  idSala SERIAL PRIMARY KEY,
  nombre VARCHAR(45),
  capacidad INT,
  tipo VARCHAR(45)
);

-- Tabla `funciones`
CREATE TABLE funciones (
  idFuncion SERIAL PRIMARY KEY,
  idPelicula INT REFERENCES peliculas(idPeliculas) ON DELETE SET NULL ON UPDATE CASCADE,
  idSala INT REFERENCES salas(idSala) ON DELETE SET NULL ON UPDATE CASCADE,
  fecha TIMESTAMP
);

-- Tabla `sillas`
CREATE TABLE sillas (
  idSilla SERIAL PRIMARY KEY,
  idSala INT REFERENCES salas(idSala) ON DELETE SET NULL ON UPDATE CASCADE,
  numeroAsiento VARCHAR(45),
  estado VARCHAR(45)
);

-- Tabla `usuarios`
CREATE TABLE usuarios (
  idUsuario SERIAL PRIMARY KEY,
  nombre VARCHAR(45),
  correo VARCHAR(200),
  contrasena VARCHAR(45),
  rol VARCHAR(45)
);

-- Tabla `venta_boletos`
CREATE TABLE venta_boletos (
  idVenta_boletos SERIAL PRIMARY KEY,
  idFuncion INT REFERENCES funciones(idFuncion) ON DELETE SET NULL ON UPDATE CASCADE,
  idUsuario INT REFERENCES usuarios(idUsuario) ON DELETE SET NULL ON UPDATE CASCADE,
  fechaVenta DATE,
  total INT
);

-- Tabla `boletos`
CREATE TABLE boletos (
  idBoleto SERIAL PRIMARY KEY,
  idVenta INT REFERENCES venta_boletos(idVenta_boletos) ON DELETE SET NULL ON UPDATE CASCADE,
  idSilla INT REFERENCES sillas(idSilla) ON DELETE SET NULL ON UPDATE CASCADE,
  precio INT
);
