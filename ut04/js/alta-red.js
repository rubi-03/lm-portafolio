/* =========================================================
   alta-red.js · Validación a medida: edad mínima de 16 años
   ========================================================= */

const EDAD_MINIMA = 16;
const nacimiento = document.getElementById('nacimiento');

// Fecha en formato aaaa-mm-dd con la hora local
function aTextoFecha(f) {
  const a = f.getFullYear();
  const m = String(f.getMonth() + 1).padStart(2, '0');
  const d = String(f.getDate()).padStart(2, '0');
  return `${a}-${m}-${d}`;
}

// Nadie puede haber nacido después de hoy
nacimiento.max = aTextoFecha(new Date());

// Calcula los años cumplidos a partir de la fecha de nacimiento
function calcularEdad(a, m, d) {
  const hoy = new Date();
  let edad = hoy.getFullYear() - a;
  // Si este año todavía no ha llegado el cumpleaños, se resta uno
  if (hoy.getMonth() + 1 < m || (hoy.getMonth() + 1 === m && hoy.getDate() < d)) {
    edad--;
  }
  return edad;
}

function comprobarEdad() {
  nacimiento.setCustomValidity('');               // se limpia el error anterior
  if (!nacimiento.value) return;                  // vacío: lo controla required
  const [a, m, d] = nacimiento.value.split('-').map(Number);
  if (calcularEdad(a, m, d) < EDAD_MINIMA) {
    nacimiento.setCustomValidity(`Debes tener al menos ${EDAD_MINIMA} años para darte de alta.`);
  }
}

nacimiento.addEventListener('input', comprobarEdad);
nacimiento.addEventListener('change', comprobarEdad);
