import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:3000/api/auth/login', {
        username,
        password
      });

      if (res.data.success) {
        localStorage.setItem('adminLoggedIn', 'true');
        localStorage.setItem('adminName', res.data.admin.nombre || 'Administrador');
        navigate('/admin');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e0f7fa, #fff3e0)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '16px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center'
      }}>
        {/* Logo oficial placeholder */}
        <div style={{
          width: '120px',
          height: '120px',
          backgroundImage: "url('/src/images/LogoServiLocal.png')",
          borderRadius: '50%',
          margin: '0 auto 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '50px',
          fontWeight: 'bold'
        }}>
        
        </div>
        <h1 style={{
          fontSize: '36px',
          background: 'linear-gradient(to right, #00bcd4, #ff9800)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '10px'
        }}>
          ServiLocal
        </h1>
        <h2 style={{color: '#555', marginBottom: '30px'}}>
          Panel de Administración
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              margin: '10px 0',
              border: '1px solid #ccc',
              borderRadius: '8px',
              fontSize: '16px'
            }}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              margin: '10px 0',
              border: '1px solid #ccc',
              borderRadius: '8px',
              fontSize: '16px'
            }}
            required
          />
          {error && <p style={{color: 'red', margin: '15px 0'}}>{error}</p>}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              background: 'linear-gradient(to right, #00bcd4, #ff9800)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            {loading ? 'Ingresando...' : 'Iniciar Sesión'}
          </button>
        </form>
        <p style={{marginTop: '20px', fontSize: '12px', color: '#777'}}>
          Usuario: admin | Contraseña: servilocal2026
        </p>
      </div>
    </div>
  );
};

export default Login;