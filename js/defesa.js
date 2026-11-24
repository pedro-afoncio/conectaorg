function mostrarCampanhasDefesa() {
  var caixa = document.getElementById("lista-campanhas-defesa");
  var campanhas = lerLista("campanhas");

  if (campanhas.length === 0) {
    caixa.innerHTML = '<p class="texto-apoio">Nenhuma campanha cadastrada no momento.</p>';
    return;
  }

  var html = "";
  for (var i = 0; i < campanhas.length; i++) {
    var c = campanhas[i];
    var classeSelo = "selo-laranja";
    var textoSelo = "Alerta Alto";
    if (c.urgencia === "alta") {
      classeSelo = "selo-vermelho";
      textoSelo = "Alerta Máximo";
    }

    html = html + '<article class="cartao card-emergencia">';
    html = html + '<span class="selo ' + classeSelo + '">' + textoSelo + '</span>';
    html = html + '<h3 class="espaco-topo">' + c.titulo + '</h3>';
    html = html + '<p class="texto-apoio">' + c.descricao + '</p>';
    html = html + '<p><strong>Região:</strong> ' + c.regiao + '</p>';
    html = html + '<p><strong>Meta:</strong> ' + c.meta + '</p>';
    html = html + '<p class="texto-apoio">Arrecadado: ' + c.arrecadado + '</p>';
    html = html + '</article>';
  }
  caixa.innerHTML = html;
}

function criarCampanhaDefesa(evento) {
  evento.preventDefault();

  var campanhas = lerLista("campanhas");
  campanhas.unshift({
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
    dt_criacao: dataDeHoje(),
    dt_limite: document.getElementById("dt-limite-defesa").value
  });
  salvarLista("campanhas", campanhas);

  alert("Campanha emergencial publicada com sucesso!");
  window.location.href = "defesa-painel.html";
}

function mostrarAlertas() {
  var caixa = document.getElementById("lista-alertas-ativos");
  var alertas = lerLista("alertas");

  if (alertas.length === 0) {
    caixa.innerHTML = '<p class="texto-apoio">Nenhum alerta ativo no momento.</p>';
    return;
  }

  var html = "";
  for (var i = 0; i < alertas.length; i++) {
    var a = alertas[i];
    var classeSelo = "selo-laranja";
    if (a.nivel === "vermelho") {
      classeSelo = "selo-vermelho";
    }

    html = html + '<article class="linha">';
    html = html + '<div class="linha-info">';
    html = html + '<h3>' + a.regiao + ' — ' + a.tipo + '</h3>';
    html = html + '<p><strong>Medidas:</strong> ' + a.medida + '</p>';
    html = html + '<p>Estimativa de afetados: ' + a.familias + ' famílias · Data: ' + a.data + '</p>';
    html = html + '</div>';
    html = html + '<div class="linha-acoes">';
    html = html + '<span class="selo ' + classeSelo + '">' + a.urgenciaTexto + '</span>';
    html = html + '<button type="button" class="botao botao-secundario botao-pequeno" onclick="encerrarAlerta(' + a.id + ')">Encerrar</button>';
    html = html + '</div>';
    html = html + '</article>';
  }
  caixa.innerHTML = html;
}

function criarAlerta(evento) {
  evento.preventDefault();

  var nivel = document.getElementById("alerta-nivel").value;
  var textoNivel = "Atenção";
  if (nivel === "vermelho") {
    textoNivel = "Alerta Máximo";
  }
  if (nivel === "laranja") {
    textoNivel = "Alerta Alto";
  }

  var alertas = lerLista("alertas");
  alertas.unshift({
    id: Date.now(),
    regiao: document.getElementById("alerta-regiao").value.trim(),
    tipo: document.getElementById("alerta-tipo").value,
    nivel: nivel,
    urgenciaTexto: textoNivel,
    familias: Number(document.getElementById("alerta-familias").value),
    data: dataDeHoje(),
    medida: document.getElementById("alerta-medida").value.trim()
  });
  salvarLista("alertas", alertas);

  document.getElementById("formulario-alerta").reset();
  mostrarAlertas();
}

function encerrarAlerta(id) {
  var alertas = lerLista("alertas");
  var restantes = [];

  for (var i = 0; i < alertas.length; i++) {
    if (alertas[i].id !== id) {
      restantes.push(alertas[i]);
    }
  }
  salvarLista("alertas", restantes);
  mostrarAlertas();
}

if (document.getElementById("lista-campanhas-defesa") !== null) {
  mostrarCampanhasDefesa();
}

var formCampanhaDefesa = document.getElementById("formulario-campanha-defesa");
if (formCampanhaDefesa !== null) {
  formCampanhaDefesa.addEventListener("submit", criarCampanhaDefesa);
}

if (document.getElementById("lista-alertas-ativos") !== null) {
  mostrarAlertas();
  document.getElementById("formulario-alerta").addEventListener("submit", criarAlerta);
}
