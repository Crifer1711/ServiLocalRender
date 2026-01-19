import ServiceCard from './ServiceCard';

const CategoryGrid = ({ categorias }) => {
  return (
    <>
      <h2 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '32px' }}>
        Categorías de Servicios
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '30px',
          padding: '0 20px',
        }}
      >
        {categorias.map((cat) => (
          <ServiceCard
            key={cat.id}
            title={cat.nombre}
            description={cat.descripcion}
            image={cat.image}
          />
        ))}
      </div>
    </>
  );
};

export default CategoryGrid;
