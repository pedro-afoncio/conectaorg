function verDetalhesCampanhaAdmin(titulo, orgao, regiao, meta, descricao) {
  alert(`Detalhes da Campanha Submetida:\n\nTítulo: ${titulo}\nÓrgão / Responsável: ${orgao}\nRegião: ${regiao}\nMeta de Arrecadação: ${meta}\nSituação: ${descricao}\n\nStatus: Em conformidade com os critérios de moderação.`);
}

function configurarBotoesAprovacao() {
  document.querySelectorAll(".botao-aprovar").forEach(btn => {
    btn.onclick = function () {
      const linha = btn.closest(".linha");
      const selo = linha.querySelector(".selo");
      selo.textContent = "Aprovada";
      selo.className = "selo selo-concluida";
      linha.querySelector(".botao-recusar")?.remove();
      btn.remove();
      alert("Cadastro ou campanha aprovada com sucesso! Publicação ativada no sistema.");
    };
  });

  document.querySelectorAll(".botao-recusar").forEach(btn => {
    btn.onclick = function () {
      if (confirm("Deseja realmente recusar este registro?")) {
        btn.closest(".linha").remove();
      }
    };
  });
}

function carregarOngsPendentes() {
  const container = document.getElementById("lista-ongs-admin");
  if (!container) return;
  const organizacoes = JSON.parse(localStorage.getItem("organizacoes")) || [];

  organizacoes.filter(org => !org.verificada && org.id > 10).forEach(org => {
    const artigo = document.createElement("article");
    artigo.className = "linha";
    artigo.innerHTML = `
      <div class="linha-info">
        <h3>${org.razao_social}</h3>
        <p>CNPJ ${org.cnpj} · ${org.endereco} · Tipo: ${org.tipo}</p>
      </div>
      <div class="linha-acoes">
        <span class="selo selo-pendente">Aguardando aprovação</span>
        <button type="button" class="botao botao-pequeno botao-aprovar">Aprovar</button>
        <button type="button" class="botao botao-perigo botao-pequeno botao-recusar">Recusar</button>
      </div>
    `;
    container.prepend(artigo);
  });
}

const formBuscaOngs = document.getElementById("form-busca-ongs");
if (formBuscaOngs) {
  formBuscaOngs.addEventListener("submit", function (e) {
    e.preventDefault();
    const termo = document.getElementById("buscar-ong").value.toLowerCase().trim();
    const situacao = document.getElementById("situacao").value;
    const container = document.getElementById("lista-ongs-admin");
    if (!container) return;

    container.querySelectorAll(".linha").forEach(linha => {
      const texto = linha.textContent.toLowerCase();
      const selo = linha.querySelector(".selo")?.textContent.trim() || "";
      const combinaTexto = !termo || texto.includes(termo);
      const combinaSituacao = situacao === "Todas" || selo.toLowerCase().includes(situacao.toLowerCase());
      linha.style.display = (combinaTexto && combinaSituacao) ? "flex" : "none";
    });
  });
}

carregarOngsPendentes();
configurarBotoesAprovacao();
