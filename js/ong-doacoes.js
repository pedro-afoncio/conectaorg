function renderizarDoacoesOng(listaFiltrada) {
  const container = document.getElementById("lista-acompanhamento-ong");
  if (!container) return;
  const doacoes = listaFiltrada || JSON.parse(localStorage.getItem("doacoes")) || [];

  if (doacoes.length === 0) {
    container.innerHTML = '<p class="texto-apoio">Nenhuma doação encontrada com os filtros selecionados.</p>';
    return;
  }

  container.innerHTML = doacoes.map(d => {
    const isConcluida = d.status === "Recebida pela ONG" || d.status === "Concluída";
    const acaoHtml = isConcluida
      ? '<span class="selo selo-concluida">Entregue e Confirmada</span>'
      : `<button type="button" class="botao botao-pequeno" onclick="confirmarRecebimento(${d.id})">Confirmar recebimento</button>`;

    return `
      <article class="linha">
        <div class="linha-info">
          <h3>Doador(a): ${d.doador || "Doador Anônimo"}</h3>
          <p><strong>Itens:</strong> ${d.itens} · <strong>Registro:</strong> ${d.dt_doacao} · <strong>Ponto de coleta:</strong> ${d.ponto || "Ponto Central"}</p>
          <p class="texto-apoio">Obs: ${d.observacao || "Sem observações adicionais."}</p>
        </div>
        <div class="linha-acoes">
          <span class="selo ${isConcluida ? "selo-concluida" : "selo-pendente"}">${d.status}</span>
          ${acaoHtml}
        </div>
      </article>
    `;
  }).join("");
}

function confirmarRecebimento(id) {
  let doacoes = JSON.parse(localStorage.getItem("doacoes")) || [];
  doacoes = doacoes.map(d => d.id === id ? { ...d, status: "Recebida pela ONG" } : d);
  localStorage.setItem("doacoes", JSON.stringify(doacoes));
  alert("Recebimento confirmado com sucesso! O doador já pode acompanhar a conclusão no seu histórico.");
  renderizarDoacoesOng();
}

const botaoFiltro = document.getElementById("botao-aplicar-filtros-ong");
if (botaoFiltro) {
  botaoFiltro.addEventListener("click", function () {
    const status = document.getElementById("filtro-status").value;
    const produto = document.getElementById("filtro-produto").value.toLowerCase().trim();
    const doacoes = JSON.parse(localStorage.getItem("doacoes")) || [];

    const filtradas = doacoes.filter(d => {
      const combinaStatus = status === "Todos" || d.status.toLowerCase().includes(status.toLowerCase());
      const combinaProduto = !produto || d.itens.toLowerCase().includes(produto);
      return combinaStatus && combinaProduto;
    });

    renderizarDoacoesOng(filtradas);
  });
}

renderizarDoacoesOng();
