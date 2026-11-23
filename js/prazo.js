const campoPrazo = document.getElementById("prazo-dias");

if (campoPrazo) {
  const diff = new Date(campoPrazo.dataset.limite + "T23:59:59") - new Date();
  const dias = Math.ceil(diff / (1000 * 60 * 60 * 24));
  campoPrazo.textContent = dias > 0 ? dias : "0";
}
