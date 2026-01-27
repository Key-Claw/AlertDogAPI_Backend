-- Create database
CREATE DATABASE IF NOT EXISTS alertdog_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE alertdog_db;

-- Table: razas (breeds)
CREATE TABLE IF NOT EXISTS razas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT,
  origen VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table: perros (dogs)
CREATE TABLE IF NOT EXISTS perros (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  raza_id INT,
  edad INT,
  descripcion TEXT,
  imagen VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (raza_id) REFERENCES razas(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table: usuarios (users)
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  telefono VARCHAR(20),
  rol ENUM('usuario', 'veterinario', 'admin') DEFAULT 'usuario',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table: citas (appointments)
CREATE TABLE IF NOT EXISTS citas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  perro_id INT NOT NULL,
  fecha DATE NOT NULL,
  hora TIME NOT NULL,
  motivo TEXT,
  estado ENUM('pendiente', 'confirmada', 'completada', 'cancelada') DEFAULT 'pendiente',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  FOREIGN KEY (perro_id) REFERENCES perros(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample data
INSERT INTO razas (nombre, descripcion, origen) VALUES
('Pastor Alemán', 'Raza inteligente y leal, ideal para trabajo de alerta y rescate', 'Alemania'),
('Labrador Retriever', 'Excelente olfato, utilizado en detección y búsqueda', 'Canadá'),
('Golden Retriever', 'Amigable y confiable, perfecto para terapia y asistencia', 'Escocia'),
('Beagle', 'Pequeño pero con gran olfato, ideal para detección', 'Reino Unido');

INSERT INTO usuarios (nombre, email, telefono, rol) VALUES
('Juan Pérez', 'juan@example.com', '612345678', 'admin'),
('María García', 'maria@example.com', '623456789', 'veterinario'),
('Pedro López', 'pedro@example.com', '634567890', 'usuario');

INSERT INTO perros (nombre, raza_id, edad, descripcion) VALUES
('Max', 1, 3, 'Perro de alerta entrenado para búsqueda y rescate'),
('Luna', 2, 2, 'Especializada en detección de sustancias'),
('Rocky', 3, 4, 'Perro de terapia y asistencia emocional'),
('Bella', 4, 2, 'Entrenada para detección en aeropuertos');

INSERT INTO citas (usuario_id, perro_id, fecha, hora, motivo, estado) VALUES
(3, 1, '2026-02-15', '10:00:00', 'Revisión mensual', 'pendiente'),
(3, 2, '2026-02-20', '11:30:00', 'Vacunación anual', 'confirmada');
