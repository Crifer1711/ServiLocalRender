import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ServiceCard = ({ title, description, image }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onClick={() => setOpen(!open)} // 📱 mobile fallback
      style={{
        position: 'relative',
        height: '230px',
        borderRadius: '14px',
        overflow: 'hidden',
        cursor: 'pointer',
        boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
      }}
    >
      {/* Imagen */}
      <motion.img
        src={image}
        alt={title}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
        animate={{ scale: open ? 1.05 : 1 }}
        transition={{ duration: 0.35 }}
      />

      {/* Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.15))',
        }}
      />

      {/* Título */}
      <div
        style={{
          position: 'absolute',
          bottom: open ? '90px' : '16px',
          left: '16px',
          right: '16px',
          color: 'white',
          fontSize: '18px',
          fontWeight: 600,
          transition: 'bottom 0.25s ease',
        }}
      >
        {title}
      </div>

      {/* Descripción */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '12px 16px',
              background: 'rgba(0,0,0,0.85)',
              color: '#eee',
              fontSize: '13px',
            }}
          >
            <p style={{ marginBottom: '8px' }}>{description}</p>
            <button
              style={{
                width: '100%',
                padding: '6px',
                fontSize: '13px',
                borderRadius: '6px',
                border: 'none',
                background: '#00bcd4',
                color: '#fff',
                cursor: 'pointer',
              }}
            >
              Ver más
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServiceCard;
