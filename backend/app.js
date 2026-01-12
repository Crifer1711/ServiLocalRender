const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'servilocal',
  waitForConnections: true,
  connectionLimit: 10,
});

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ 
    message: '✅ Backend ServiLocal funcionando',
    version: '1.0.0',
    endpoints: {
      login: 'POST /api/auth/login',
      usuarios: 'GET /api/usuarios',
      aprobar: 'PUT /api/usuarios/:id/aprobar',
      eliminar: 'DELETE /api/usuarios/:id',
      prestadores: 'GET /api/prestadores',
      estadisticas: 'GET /api/estadisticas'
    }
  });
});

// Login
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Faltan credenciales' });
  }

  try {
    const [rows] = await pool.query(
      'SELECT * FROM usuarios WHERE username = ? AND password = ?',
      [username, password]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    const user = rows[0];

    res.json({
      success: true,
      message: 'Login exitoso',
      user: {
        id: user.id,
        nombre: user.nombre,
        rol: user.rol,
        username: user.username
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Listar todos los usuarios (para admin)
app.get('/api/usuarios', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, username, nombre, rol FROM usuarios ORDER BY id DESC'
    );
    res.json({ success: true, usuarios: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
});

// Aprobar usuario (placeholder - por implementar con tu compañero)
app.put('/api/usuarios/:id/aprobar', async (req, res) => {
  const { id } = req.params;
  try {
    // Funcionalidad pendiente de implementar cuando se agregue columna 'aprobado'
    res.json({ success: true, message: 'Usuario aprobado (funcionalidad pendiente)' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al aprobar usuario' });
  }
});

// Eliminar usuario
app.delete('/api/usuarios/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM usuarios WHERE id = ?', [id]);
    res.json({ success: true, message: 'Usuario eliminado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar usuario' });
  }
});

// Listar prestadores
app.get('/api/prestadores', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, username, nombre, rol FROM usuarios WHERE rol = "prestador" ORDER BY id DESC'
    );
    res.json({ success: true, prestadores: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener prestadores' });
  }
});

// Estadísticas
app.get('/api/estadisticas', async (req, res) => {
  try {
    const [totalUsuarios] = await pool.query('SELECT COUNT(*) as total FROM usuarios');
    const [totalAdmins] = await pool.query('SELECT COUNT(*) as total FROM usuarios WHERE rol = "admin"');
    const [totalPrestadores] = await pool.query('SELECT COUNT(*) as total FROM usuarios WHERE rol = "prestador"');
    
    res.json({
      success: true,
      estadisticas: {
        totalUsuarios: totalUsuarios[0].total,
        totalAdmins: totalAdmins[0].total,
        totalPrestadores: totalPrestadores[0].total
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener estadísticas' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend corriendo en http://localhost:${PORT}`);
});