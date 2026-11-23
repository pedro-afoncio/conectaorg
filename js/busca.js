const formBusca = document.getElementById("formulario-busca");

if (formBusca) {
  formBusca.addEventListener("submit", function (e) {
    e.preventDefault();
    const termo = document.getElementById("busca-texto")?.value.trim().toLowerCase() || "";
    const categoria = document.getElementById("busca-categoria")?.value || "todas";
    const cards = document.querySelectorAll(".card-ong");
    let encontrados = 0;

    cards.forEach(card => {
      const combinaTexto = card.textContent.toLowerCase().includes(termo);
      const combinaCategoria = categoria === "todas" || card.dataset.categoria === categoria;
      const visivel = combinaTexto && combinaCategoria;
      card.style.display = visivel ? "block" : "none";
      if (visivel) encontrados++;
    });

    const mensagem = document.getElementById("nenhum-resultado");
    if (mensagem) mensagem.style.display = encontrados === 0 ? "block" : "none";
  });
}
