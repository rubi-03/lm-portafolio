const hoy = new Date().toLocaleDateString("es-ES", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});
document.getElementById("fecha").textContent = hoy;
