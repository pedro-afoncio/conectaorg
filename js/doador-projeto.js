function carregarNecessidadesDoador() {
  const container = document.getElementById("bloco-necessidades-projeto");
  if (!container) return;
  const necessidades = JSON.parse(localStorage.getItem("necessidades")) || [];
  if (necessidades.length === 0) return;

  const rotulos = { alta: "Urgência alta", media: "Urgência média", baixa: "Urgência baixa" };

  container.innerHTML = necessidades.map(n => `
    <div class="painel-cinza necessidade espaco-topo">
      <div class="linha-acoes" style="justify-content: space-between; margin-bottom: 8px;">
        <h3>${n.item}</h3>
        <span class="selo selo-${n.urgencia}">${rotulos[n.urgencia] || n.urgencia}</span>
      </div>
      <p><strong>Categoria:</strong> ${n.categoria}</p>
      <p><strong>Meta solicitada:</strong> ${n.quantidade} ${n.unidade}</p>
    </div>
  `).join("");
}

carregarNecessidadesDoador();
