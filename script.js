
document.querySelectorAll('.ramo').forEach(ramo => {
  const requisitos = ramo.dataset.prerrequisitos;
  if (requisitos) {
    ramo.classList.add('bloqueado');
  }

  ramo.addEventListener('click', () => {
    if (ramo.classList.contains('aprobado')) {
      ramo.classList.remove('aprobado');
      ramo.classList.add('en-curso');
    } else if (ramo.classList.contains('en-curso')) {
      ramo.classList.remove('en-curso');
    } else {
      ramo.classList.add('aprobado');
    }
    actualizarDesbloqueos();
  });
});

function actualizarDesbloqueos() {
  document.querySelectorAll('.ramo').forEach(ramo => {
    const requisitos = ramo.dataset.prerrequisitos;
    if (!requisitos) return;

    const codigos = requisitos.split(',');
    const cumplidos = codigos.every(cod => {
      const prereq = document.querySelector(`.ramo[data-codigo="${cod}"]`);
      return prereq && prereq.classList.contains('aprobado');
    });

    if (cumplidos) {
      ramo.classList.remove('bloqueado');
    } else {
      ramo.classList.add('bloqueado');
    }
  });
}

actualizarDesbloqueos();
