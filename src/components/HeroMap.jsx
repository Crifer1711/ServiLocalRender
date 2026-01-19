import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';

// Hace zoom y centra cuando cambia la ubicación
const ChangeView = ({ center }) => {
  const map = useMap();

  useEffect(() => {
    map.flyTo([center.lat, center.lng], 15, {
      animate: true,
      duration: 1.5,
    });
  }, [center, map]);

  return null;
};

const HeroMap = ({ mapCenter, markers }) => {
  return (
    <section
      style={{
        position: 'relative',
        height: '100vh',
        marginTop: '80px',
      }}
    >
      {/* Overlay degradado (NO bloquea el mapa) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, #00bcd4, #ff9800)',
          opacity: 0.15,
          zIndex: 1,
          pointerEvents: 'none', // 🔥 CLAVE
        }}
      />

      {/* Texto (NO bloquea el mapa) */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 2,
          textAlign: 'center',
          color: 'white',
          textShadow: '0 2px 10px rgba(0,0,0,0.7)',
          maxWidth: '800px',
          padding: '20px',
          background: 'rgba(0,0,0,0.35)',
          borderRadius: '16px',
          pointerEvents: 'none', // 🔥 CLAVE
        }}
      >
        <h2 style={{ fontSize: '48px', marginBottom: '16px' }}>
          Encuentra los mejores prestadores de servicios locales
        </h2>
        <p style={{ fontSize: '22px' }}>
          Electricistas, plomeros, gasfiteros y más — cerca de ti
        </p>
      </div>

      {/* MAPA (interactivo) */}
      <MapContainer
        center={[mapCenter.lat, mapCenter.lng]}
        zoom={13}
        style={{
          width: '100%',
          height: '100%',
          zIndex: 0,
        }}
        scrollWheelZoom={true}
      >
        <ChangeView center={mapCenter} />

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />

        {markers.map((m, i) => (
          <Marker key={i} position={[m.position.lat, m.position.lng]}>
            <Popup>{m.title}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </section>
  );
};

export default HeroMap;
