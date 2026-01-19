import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      background: 'white',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      zIndex: 1000,
      padding: '15px 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <div style={{
          width: '60px',
          height: '60px',
          backgroundImage: "url(/images/LogoServiLocal.png)",
          backgroundSize: 'cover',
          borderRadius: '50%'
        }} />
        <h1 style={{
          fontSize: '28px',
          background: 'linear-gradient(to right, #00bcd4, #ff9800)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: 0
        }}>
          ServiLocal
        </h1>
      </div>

      {/* CTA */}
      <Link
        to="/register/prestador"
        style={{
          padding: '12px 30px',
          background: 'linear-gradient(to right, #00bcd4, #ff9800)',
          color: 'white',
          borderRadius: '50px',
          fontSize: '18px',
          fontWeight: 'bold',
          textDecoration: 'none'
        }}
      >
        Registrarme como Prestador
      </Link>
    </header>
  );
};

export default Header;
