function carregarCampanhasDefesa() {
  const container = document.getElementById("lista-campanhas-defesa");
  if (!container) return;
  const campanhas = JSON.parse(localStorage.getItem("campanhas")) || [];

  if (campanhas.length === 0) {
    container.innerHTML = '<p class="texto-apoio">Nenhuma campanha cadastrada no momento.</p>';
    return;
  }

  container.innerHTML = campanhas.map(c => {
    const selo = c.urgencia === "alta" ? "selo-vermelho" : "selo-laranja";
    const texto = c.urgencia === "alta" ? "Alerta Máximo" : "Alerta Alto";
    return `
      <article class="cartao card-emergencia">
        <span class="selo ${selo}">${texto}</span>
        <h3 class="espaco-topo">${c.titulo}</h3>
        <p class="texto-apoio">${c.descricao}</p>
        <p><strong>Região:</strong> ${c.regiao || "Nacional"}</p>
        <p><strong>Meta:</strong> ${c.meta || "Sob demanda"}</p>
        <div class="progresso-container">
          <div class="progresso-barra">
            <div class="progresso-preenchimento emergencia" style="width: 70%;"></div>
          </div>
        </div>
        <p class="texto-apoio">Arrecadado: ${c.arrecadado || "Em andamento"}</p>
      </article>
    `;
  }).join("");
}

function carregarAlertasDefesa() {
  const container = document.getElementById("lista-alertas-ativos");
  if (!container) return;
  const alertas = JSON.parse(localStorage.getItem("alertas")) || [];

  if (alertas.length === 0) {
    container.innerHTML = '<p class="texto-apoio">Nenhum alerta ativo no momento.</p>';
    return;
  }

  container.innerHTML = alertas.map(a => `
    <article class="linha">
      <div class="linha-info">
        <h3>${a.regiao} — ${a.tipo}</h3>
        <p><strong>Medidas:</strong> ${a.medida}</p>
        <p>Estimativa de afetados: ${a.familias} famílias · Data: ${a.data}</p>
      </div>
      <div class="linha-acoes">
        <span class="selo ${a.nivel === "vermelho" ? "selo-vermelho" : "selo-laranja"}">${a.urgenciaTexto || "Alerta"}</span>
        <button type="button" class="botao botao-secundario botao-pequeno" onclick="encerrarAlerta(${a.id})">Encerrar</button>
      </div>
    </article>
  `).join("");
}

function encerrarAlerta(id) {
  let alertas = JSON.parse(localStorage.getItem("alertas")) || [];
  localStorage.setItem("alertas", JSON.stringify(alertas.filter(a => a.id !== id)));
  carregarAlertasDefesa();
}

const formCampanhaDefesa = document.getElementById("formulario-campanha-defesa");
if (formCampanhaDefesa) {
  formCampanhaDefesa.addEventListener("submit", function (e) {
    e.preventDefault();
    const novaCampanha = {
      id: Date.now(),
      titulo: document.getElementById("titulo-defesa").value.trim(),
      tipo: "Calamidade / Emergência",
      orgao: "Defesa Civil",
      descricao: document.getElementById("descricao-defesa").value.trim(),
      regiao: document.getElementById("regiao-afetada").value.trim(),
      urgencia: document.getElementById("urgencia-defesa").value,
      status: "Ativa",
      meta: document.getElementById("meta-arrecadacao").value.trim(),
      arrecadado: "Iniciando arrecadação",
      ponto: document.getElementById("ponto-coleta-defesa").value.trim(),
      dt_criacao: new Date().toLocaleDateString("pt-BR"),
      dt_limite: document.getElementById("dt-limite-defesa").value
    };

    const campanhas = JSON.parse(localStorage.getItem("campanhas")) || [];
    campanhas.unshift(novaCampanha);
    localStorage.setItem("campanhas", JSON.stringify(campanhas));

    alert("Campanha emergencial publicada com sucesso! Ela já está disponível para todos os cidadãos doadores.");
    window.location.href = "defesa-painel.html";
  });
}

const formAlerta = document.getElementById("formulario-alerta");
if (formAlerta) {
  formAlerta.addEventListener("submit", function (e) {
    e.preventDefault();
    const nivel = document.getElementById("alerta-nivel").value;
    const novoAlerta = {
      id: Date.now(),
      regiao: document.getElementById("alerta-regiao").value.trim(),
      tipo: document.getElementById("alerta-tipo").value,
      nivel: nivel,
      urgenciaTexto: nivel === "vermelho" ? "Alerta Máximo" : "Alerta Alto",
      familias: Number(document.getElementById("alerta-familias").value),
      data: new Date().toLocaleDateString("pt-BR"),
      medida: document.getElementById("alerta-medida").value.trim()
    };

    const alertas = JSON.parse(localStorage.getItem("alertas")) || [];
    alertas.unshift(novoAlerta);
    localStorage.setItem("alertas", JSON.stringify(alertas));

    alert("Alerta regional publicado com sucesso!");
    formAlerta.reset();
    carregarAlertasDefesa();
  });
}

carregarCampanhasDefesa();
carregarAlertasDefesa();
