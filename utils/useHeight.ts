import { useState, useEffect, useRef } from 'react';

export function useHeight<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const updateHeight = () => {
      setHeight(element.offsetHeight);
    };

    updateHeight();

    // Observador para cambios de tamaño
    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(element);

    // Limpieza
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return { ref, height };
}
