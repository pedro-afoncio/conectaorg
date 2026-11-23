const doacao = JSON.parse(localStorage.getItem("ultimaDoacao"));
const campoData = document.getElementById("data-registro");
const campoObs = document.getElementById("observacao-registro");

if (campoData && campoObs) {
  campoData.textContent = doacao?.dt_doacao || new Date().toLocaleDateString("pt-BR");
  campoObs.textContent = doacao?.observacao || "Nenhuma";
}
