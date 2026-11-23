function auditarDoacao(id) {
  alert("Doação auditada com sucesso! Registro de rastreamento e entrega conferidos.");
}

function carregarDoacoesAdmin(doacoesFiltradas) {
  const container = document.getElementById("lista-doacoes-admin");
  if (!container) return;
  const doacoes = doacoesFiltradas || JSON.parse(localStorage.getItem("doacoes")) || [];

  if (doacoes.length === 0) {
    container.innerHTML = '<p class="texto-apoio">Nenhuma doação encontrada com os filtros informados.</p>';
    return;
  }

  container.innerHTML = doacoes.map(d => {
    const isConcluida = d.status === "Recebida pela ONG" || d.status === "Concluída";
    return `
      <article class="linha">
        <div class="linha-info">
          <h3>${d.doador || "Doador(a)"} → ${d.ong}</h3>
          <p>${d.itens} · Data: ${d.dt_doacao} · Ponto: ${d.ponto || "Ponto de coleta"}</p>
        </div>
        <div class="linha-acoes">
          <span class="selo ${isConcluida ? "selo-concluida" : "selo-pendente"}">${d.status}</span>
          <button type="button" class="botao botao-secundario botao-pequeno" onclick="auditarDoacao(${d.id})">Auditar</button>
        </div>
      </article>
    `;
  }).join("");
}

const botaoFiltroAdmin = document.getElementById("botao-aplicar-filtros-admin");
if (botaoFiltroAdmin) {
  botaoFiltroAdmin.addEventListener("click", function () {
    const nome = document.getElementById("filtro-nome")?.value.toLowerCase().trim() || "";
    const status = document.getElementById("filtro-status")?.value || "Todos";
    const data = document.getElementById("filtro-data")?.value || "";

    const dataFormatada = data ? data.split("-").reverse().join("/") : "";
    const doacoes = JSON.parse(localStorage.getItem("doacoes")) || [];

    const filtradas = doacoes.filter(d => {
      const combinaNome = !nome || (d.doador && d.doador.toLowerCase().includes(nome)) || (d.ong && d.ong.toLowerCase().includes(nome)) || (d.itens && d.itens.toLowerCase().includes(nome));
      const combinaStatus = status === "Todos" || d.status.toLowerCase().includes(status.toLowerCase());
      const combinaData = !dataFormatada || d.dt_doacao === dataFormatada;
      return combinaNome && combinaStatus && combinaData;
    });

    carregarDoacoesAdmin(filtradas);
  });
}

carregarDoacoesAdmin();
