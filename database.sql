-- Script SQL para PostgreSQL en Render
-- Base de datos: ServiLocal

-- Tabla de usuarios (prestadores y clientes)
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    cedula VARCHAR(20) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    oficio VARCHAR(100),
    ciudad VARCHAR(100),
    direccion TEXT,
    dias_atencion VARCHAR(255),
    horario_inicio TIME,
    horario_fin TIME,
    rol VARCHAR(20) NOT NULL CHECK (rol IN ('prestador', 'cliente')),
    foto TEXT,
    estado VARCHAR(20) DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'aprobado', 'rechazado')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de administradores
CREATE TABLE IF NOT EXISTS administradores (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para mejorar el rendimiento
CREATE INDEX idx_usuarios_rol ON usuarios(rol);
CREATE INDEX idx_usuarios_estado ON usuarios(estado);
CREATE INDEX idx_usuarios_oficio ON usuarios(oficio);
CREATE INDEX idx_usuarios_username ON usuarios(username);

-- Insertar un administrador por defecto
INSERT INTO administradores (nombre, username, password) 
VALUES ('Administrador', 'admin', 'admin123')
ON CONFLICT (username) DO NOTHING;

-- Insertar algunos datos de ejemplo (opcional)
INSERT INTO usuarios (nombre, cedula, username, password, telefono, oficio, ciudad, direccion, dias_atencion, horario_inicio, horario_fin, rol, estado) 
VALUES 
    ('Juan Pérez', '1234567890', 'juanperez', 'password123', '3001234567', 'Plomero', 'Bogotá', 'Calle 123 #45-67', 'Lunes a Viernes', '08:00:00', '17:00:00', 'prestador', 'aprobado'),
    ('María García', '0987654321', 'mariagarcia', 'password123', '3009876543', 'Electricista', 'Medellín', 'Carrera 50 #30-20', 'Lunes a Sábado', '07:00:00', '18:00:00', 'prestador', 'aprobado'),
    ('Carlos López', '1122334455', 'carloslopez', 'password123', '3001122334', 'Carpintero', 'Cali', 'Avenida 6 #25-30', 'Martes a Sábado', '09:00:00', '16:00:00', 'prestador', 'pendiente')
ON CONFLICT (cedula) DO NOTHING;
