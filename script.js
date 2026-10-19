// Actualiza el año del pie de página.
const anio = document.querySelector("#anio");

if (anio) {
  anio.textContent = new Date().getFullYear();
}

// Consulta si la persona prefiere reducir las animaciones.
const reducirMovimiento = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);

// Activa el efecto solo si el navegador lo admite.
if (
  !reducirMovimiento.matches &&
  "IntersectionObserver" in window &&
  typeof Element.prototype.animate === "function"
) {
  const observador = new IntersectionObserver(
    (entradas, observadorActual) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;

        if (!reducirMovimiento.matches) {
          entrada.target.animate(
            [
              {
                opacity: 0,
                transform: "translateY(24px)"
              },
              {
                opacity: 1,
                transform: "translateY(0)"
              }
            ],
            {
              duration: 650,
              easing: "ease-out"
            }
          );
        }

        // Cada elemento se anima una sola vez.
        observadorActual.unobserve(entrada.target);
      });
    },
    {
      threshold: 0.12
    }
  );

  document.querySelectorAll(".revelar").forEach((elemento) => {
    observador.observe(elemento);
  });
}