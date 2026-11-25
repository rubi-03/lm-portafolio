/* =========================================================
   cita.js · Validación a medida del formulario de cita
   Se carga con defer: cuando se ejecuta, el HTML ya existe.
   ========================================================= */

// --- Referencias a los campos ---
const fecha = document.getElementById('fecha');
const quiereCuenta = document.getElementById('quiereCuenta');
const cuenta = document.getElementById('cuenta');
const clave = document.getElementById('clave');
const clave2 = document.getElementById('clave2');
const averia = document.getElementById('averia');
const contador = document.getElementById('contador');
const dni = document.getElementById('dni');

/* ---------------------------------------------------------
   Regla 1 · Fecha mínima = mañana (formato aaaa-mm-dd)
   Se construye la fecha a mano para usar la hora local,
   ya que toISOString() trabaja en UTC y puede dar otro día.
   --------------------------------------------------------- */
function aTextoFecha(f) {
  const a = f.getFullYear();
  const m = String(f.getMonth() + 1).padStart(2, '0'); // los meses van de 0 a 11
  const d = String(f.getDate()).padStart(2, '0');
  return `${a}-${m}-${d}`;
}

const manana = new Date();
manana.setDate(manana.getDate() + 1);
fecha.min = aTextoFecha(manana);
// Si la fecha es anterior a min, el propio navegador la rechaza (rangeUnderflow).

/* ---------------------------------------------------------
   Regla 2 · Los domingos el taller está cerrado
   El valor "aaaa-mm-dd" se separa en partes y se crea la fecha
   en hora local: new Date("2026-10-25") usaría UTC.
   getDay() devuelve 0 para el domingo.
   --------------------------------------------------------- */
function comprobarDomingo() {
  if (!fecha.value) {            // vacío: de eso se encarga required
    fecha.setCustomValidity('');
    return;
  }
  const [a, m, d] = fecha.value.split('-').map(Number);
  const dia = new Date(a, m - 1, d).getDay();
  fecha.setCustomValidity(dia === 0 ? 'El taller cierra los domingos.' : '');
}
fecha.addEventListener('input', comprobarDomingo);
fecha.addEventListener('change', comprobarDomingo);

/* ---------------------------------------------------------
   Regla 3 · Cuenta opcional
   El fieldset empieza con disabled (sus campos no se validan
   ni se envían). Al marcar la casilla se habilita y el foco
   pasa a la contraseña.
   --------------------------------------------------------- */
quiereCuenta.addEventListener('change', () => {
  cuenta.disabled = !quiereCuenta.checked;
  if (quiereCuenta.checked) {
    clave.focus();
  } else {
    clave.value = '';             // se vacían para no dejar datos ocultos
    clave2.value = '';
    clave2.setCustomValidity('');
  }
});

/* ---------------------------------------------------------
   Regla 4 · Las contraseñas deben coincidir
   (el mínimo de 8 caracteres con letras y números lo hace
   el pattern del HTML)
   --------------------------------------------------------- */
function comprobarClaves() {
  clave2.setCustomValidity(
    clave2.value && clave2.value !== clave.value ? 'Las contraseñas no coinciden.' : ''
  );
}
clave.addEventListener('input', comprobarClaves);
clave2.addEventListener('input', comprobarClaves);

/* ---------------------------------------------------------
   Contador de caracteres de la avería
   --------------------------------------------------------- */
function actualizarContador() {
  contador.textContent = `${averia.value.length} / 500 caracteres`;
}
averia.addEventListener('input', actualizarContador);
actualizarContador();

/* ---------------------------------------------------------
   AMPLIACIÓN (opcional) · Letra del DNI
   El pattern solo comprueba el formato. La letra correcta es
   la de la posición (número % 23) en la tabla oficial, y eso
   solo se puede calcular con un script.
   --------------------------------------------------------- */
const LETRAS_DNI = 'TRWAGMYFPDXBNJZSQVHLCKE';

function comprobarLetraDni() {
  dni.setCustomValidity('');                 // se limpia antes de comprobar
  if (!/^[0-9]{8}[A-Za-z]$/.test(dni.value)) {
    return;                                  // formato incorrecto: lo avisa el pattern
  }
  const numero = Number(dni.value.slice(0, 8));
  const letra = dni.value.slice(8).toUpperCase();
  if (LETRAS_DNI[numero % 23] !== letra) {
    dni.setCustomValidity('La letra del DNI no corresponde al número.');
  }
}
dni.addEventListener('input', comprobarLetraDni);
