import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import ServiceCard from './ServiceCard';

const CategoryCarousel = ({ categorias = [] }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    slidesToScroll: 1,
    containScroll: 'trimSnaps',
  });

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateButtons = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    updateButtons();
    emblaApi.on('select', updateButtons);
    emblaApi.on('reInit', updateButtons);
  }, [emblaApi, updateButtons]);

  if (categorias.length === 0) return null;

  return (
    <div style={{ position: 'relative', padding: '40px 24px' }}>
      <div ref={emblaRef} style={{ overflow: 'hidden' }}>
        <div style={{ display: 'flex', gap: '24px' }}>
          {categorias.map((cat) => (
            <div
              key={cat.id}
              style={{ flex: '0 0 calc(33.333% - 16px)' }}
            >
              <ServiceCard
                title={cat.nombre}
                description={cat.descripcion}
                image={cat.image}
              />
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '16px',
          marginTop: '24px',
        }}
      >
        <button
          onClick={() => emblaApi?.scrollPrev()}
          disabled={!canPrev}
          style={navButtonStyle(canPrev)}
        >
          ◀
        </button>

        <button
          onClick={() => emblaApi?.scrollNext()}
          disabled={!canNext}
          style={navButtonStyle(canNext)}
        >
          ▶
        </button>
      </div>
    </div>
  );
};

const navButtonStyle = (enabled) => ({
  width: '42px',
  height: '42px',
  borderRadius: '50%',
  border: 'none',
  background: enabled ? '#00bcd4' : '#ccc',
  color: 'white',
  fontSize: '18px',
  cursor: enabled ? 'pointer' : 'not-allowed',
});

export default CategoryCarousel;
