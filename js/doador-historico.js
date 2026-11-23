function carregarHistoricoDoador() {
  const container = document.getElementById("lista-doacoes-doador");
  if (!container) return;
  const doacoes = JSON.parse(localStorage.getItem("doacoes")) || [];
  if (doacoes.length === 0) return;

  const contador = document.getElementById("total-doacoes-doador");
  if (contador) contador.textContent = doacoes.length;

  container.innerHTML = doacoes.map(d => {
    const isConcluida = d.status === "Recebida pela ONG" || d.status === "Concluída";
    return `
      <article class="linha linha-coluna">
        <h4>Doação para ${d.ong} · ${d.dt_doacao}</h4>
        <p><strong>Itens:</strong> ${d.itens}</p>
        <p><strong>Ponto de entrega:</strong> ${d.ponto || "Ponto de coleta oficial"}</p>
        <p>Status: <span class="selo ${isConcluida ? "selo-concluida" : "selo-pendente"}">${d.status}</span></p>
      </article>
    `;
  }).join("");
}

function expandirHistoricoCompleto() {
  const container = document.getElementById("lista-doacoes-doador");
  if (!container) return;

  const extras = [
    { ong: "ONG Verde Vida", dt_doacao: "14/05/2026", itens: "Mudas e ferramentas de jardinagem (10 itens)", ponto: "Ecoponto Central · Belo Horizonte, MG", status: "Recebida pela ONG" },
    { ong: "ONG Cultura Viva", dt_doacao: "02/02/2026", itens: "Instrumentos musicais e material de arte (5 unidades)", ponto: "Centro Cultural Comunitário · Fortaleza, CE", status: "Recebida pela ONG" }
  ];

  container.innerHTML += extras.map(d => `
    <article class="linha linha-coluna">
      <h4>Doação para ${d.ong} · ${d.dt_doacao}</h4>
      <p><strong>Itens:</strong> ${d.itens}</p>
      <p><strong>Ponto de entrega:</strong> ${d.ponto}</p>
      <p>Status: <span class="selo selo-concluida">${d.status}</span></p>
    </article>
  `).join("");

  const botao = document.getElementById("botao-historico-completo");
  if (botao) {
    botao.textContent = "Histórico completo exibido";
    botao.disabled = true;
  }

  const contador = document.getElementById("total-doacoes-doador");
  if (contador) {
    contador.textContent = (Number(contador.textContent) || 4) + extras.length;
  }

  alert("Histórico completo expandido! Doações anteriores adicionadas à visualização.");
}

carregarHistoricoDoador();
