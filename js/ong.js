var idEmEdicao = null;

function mostrarNecessidades() {
  var caixa = document.getElementById("lista-necessidades");
  var necessidades = lerLista("necessidades");

  if (necessidades.length === 0) {
    caixa.innerHTML = '<p class="texto-apoio">Nenhuma necessidade publicada ainda.</p>';
    return;
  }

  var html = "";
  for (var i = 0; i < necessidades.length; i++) {
    var n = necessidades[i];
    html = html + '<article class="linha">';
    html = html + '<div class="linha-info">';
    html = html + '<h3>' + n.item + '</h3>';
    html = html + '<p>Categoria: ' + n.categoria + ' · Quantidade: ' + n.quantidade + ' ' + n.unidade + '</p>';
    html = html + '</div>';
    html = html + '<div class="linha-acoes">';
    html = html + '<span class="selo selo-' + n.urgencia + '">' + textoUrgencia(n.urgencia) + '</span>';
    html = html + '<button type="button" class="botao botao-secundario botao-pequeno" onclick="editarNecessidade(' + n.id + ')">Editar</button>';
    html = html + '<button type="button" class="botao botao-perigo botao-pequeno" onclick="removerNecessidade(' + n.id + ')">Remover</button>';
    html = html + '</div>';
    html = html + '</article>';
  }
  caixa.innerHTML = html;
}

function abrirFormulario(titulo) {
  document.getElementById("titulo-formulario").textContent = titulo;
  document.getElementById("formulario-necessidade").style.display = "block";
}

function fecharFormulario() {
  document.getElementById("formulario-necessidade").reset();
  document.getElementById("formulario-necessidade").style.display = "none";
  idEmEdicao = null;
}

function novaNecessidade() {
  idEmEdicao = null;
  document.getElementById("formulario-necessidade").reset();
  abrirFormulario("Nova necessidade");
}

function editarNecessidade(id) {
  var necessidades = lerLista("necessidades");

  for (var i = 0; i < necessidades.length; i++) {
    if (necessidades[i].id === id) {
      document.getElementById("item").value = necessidades[i].item;
      document.getElementById("categoria").value = necessidades[i].categoria;
      document.getElementById("quantidade").value = necessidades[i].quantidade;
      document.getElementById("unidade").value = necessidades[i].unidade;
      document.getElementById("urgencia").value = necessidades[i].urgencia;
      idEmEdicao = id;
      abrirFormulario("Editar necessidade");
    }
  }
}

function removerNecessidade(id) {
  if (confirm("Deseja mesmo remover esta necessidade?") === false) {
    return;
  }

  var necessidades = lerLista("necessidades");
  var restantes = [];
  for (var i = 0; i < necessidades.length; i++) {
    if (necessidades[i].id !== id) {
      restantes.push(necessidades[i]);
    }
  }
  salvarLista("necessidades", restantes);
  mostrarNecessidades();
}

function salvarNecessidade(evento) {
  evento.preventDefault();

  var necessidades = lerLista("necessidades");
  var item = document.getElementById("item").value.trim();
  var categoria = document.getElementById("categoria").value;
  var quantidade = Number(document.getElementById("quantidade").value);
  var unidade = document.getElementById("unidade").value.trim();
  var urgencia = document.getElementById("urgencia").value;

  if (idEmEdicao === null) {
    necessidades.push({
      id: Date.now(),
      item: item,
      categoria: categoria,
      quantidade: quantidade,
      unidade: unidade,
      urgencia: urgencia
    });
  } else {
    for (var i = 0; i < necessidades.length; i++) {
      if (necessidades[i].id === idEmEdicao) {
        necessidades[i].item = item;
        necessidades[i].categoria = categoria;
        necessidades[i].quantidade = quantidade;
        necessidades[i].unidade = unidade;
        necessidades[i].urgencia = urgencia;
      }
    }
  }

  salvarLista("necessidades", necessidades);
  mostrarNecessidades();
  fecharFormulario();
}

function mostrarCampanhasOng() {
  var caixa = document.getElementById("lista-campanhas-ong");
  var campanhas = lerLista("campanhas");
  var html = "";

  for (var i = 0; i < campanhas.length; i++) {
    var c = campanhas[i];
    if (c.orgao === "ONG Mãos Solidárias") {
      html = html + '<article class="linha">';
      html = html + '<div class="linha-info">';
      html = html + '<h3>' + c.titulo + '</h3>';
      html = html + '<p>' + c.descricao + '</p>';
      html = html + '<p><strong>Meta:</strong> ' + c.meta + ' · <strong>Região:</strong> ' + c.regiao + '</p>';
      html = html + '</div>';
      html = html + '<div class="linha-acoes">';
      html = html + '<span class="selo selo-' + c.urgencia + '">' + textoUrgencia(c.urgencia) + '</span>';
      html = html + '</div>';
      html = html + '</article>';
    }
  }

  if (html === "") {
    html = '<p class="texto-apoio">Nenhuma campanha cadastrada ainda.</p>';
  }
  caixa.innerHTML = html;
}

function criarCampanha(evento) {
  evento.preventDefault();

  var campanhas = lerLista("campanhas");
  campanhas.unshift({
    id: Date.now(),
    titulo: document.getElementById("titulo").value.trim(),
    tipo: "Comunitária",
    orgao: "ONG Mãos Solidárias",
    descricao: document.getElementById("descricao").value.trim(),
    regiao: "Curitiba, PR",
    urgencia: "alta",
    status: "Ativa",
    meta: "1.000 unidades",
    arrecadado: "Iniciando arrecadação",
    dt_criacao: document.getElementById("dt-criacao").value,
    dt_limite: document.getElementById("dt-limite").value
  });
  salvarLista("campanhas", campanhas);

  alert("Campanha criada com sucesso!");
  window.location.href = "ong-painel.html";
}

function mostrarDoacoesOng(doacoes) {
  var caixa = document.getElementById("lista-acompanhamento-ong");

  if (doacoes.length === 0) {
    caixa.innerHTML = '<p class="texto-apoio">Nenhuma doação encontrada.</p>';
    return;
  }

  var html = "";
  for (var i = 0; i < doacoes.length; i++) {
    var d = doacoes[i];
    var classeSelo = "selo-pendente";
    var botao = '<button type="button" class="botao botao-pequeno" onclick="confirmarRecebimento(' + d.id + ')">Confirmar recebimento</button>';
    if (estaConcluida(d)) {
      classeSelo = "selo-concluida";
      botao = "";
    }

    html = html + '<article class="linha">';
    html = html + '<div class="linha-info">';
    html = html + '<h3>Doador(a): ' + d.doador + '</h3>';
    html = html + '<p><strong>Itens:</strong> ' + d.itens + ' · <strong>Registro:</strong> ' + d.dt_doacao + '</p>';
    html = html + '<p class="texto-apoio">Observação: ' + d.observacao + '</p>';
    html = html + '</div>';
    html = html + '<div class="linha-acoes">';
    html = html + '<span class="selo ' + classeSelo + '">' + d.status + '</span>';
    html = html + botao;
    html = html + '</div>';
    html = html + '</article>';
  }
  caixa.innerHTML = html;
}

function confirmarRecebimento(id) {
  var doacoes = lerLista("doacoes");

  for (var i = 0; i < doacoes.length; i++) {
    if (doacoes[i].id === id) {
      doacoes[i].status = "Recebida pela ONG";
    }
  }
  salvarLista("doacoes", doacoes);
  mostrarDoacoesOng(doacoes);
}

function filtrarDoacoesOng() {
  var status = document.getElementById("filtro-status").value;
  var produto = document.getElementById("filtro-produto").value.toLowerCase().trim();
  var doacoes = lerLista("doacoes");
  var filtradas = [];

  for (var i = 0; i < doacoes.length; i++) {
    var d = doacoes[i];
    var achouStatus = status === "Todos" || d.status.indexOf(status) !== -1;
    var achouProduto = d.itens.toLowerCase().indexOf(produto) !== -1;

    if (achouStatus && achouProduto) {
      filtradas.push(d);
    }
  }
  mostrarDoacoesOng(filtradas);
}

if (document.getElementById("lista-necessidades") !== null) {
  mostrarNecessidades();
  document.getElementById("botao-adicionar").addEventListener("click", novaNecessidade);
  document.getElementById("botao-cancelar").addEventListener("click", fecharFormulario);
  document.getElementById("formulario-necessidade").addEventListener("submit", salvarNecessidade);
}

if (document.getElementById("lista-campanhas-ong") !== null) {
  mostrarCampanhasOng();
}

var formCampanha = document.getElementById("formulario-campanha");
if (formCampanha !== null) {
  formCampanha.addEventListener("submit", criarCampanha);
}

if (document.getElementById("lista-acompanhamento-ong") !== null) {
  mostrarDoacoesOng(lerLista("doacoes"));
  document.getElementById("botao-aplicar-filtros-ong").addEventListener("click", filtrarDoacoesOng);
}
