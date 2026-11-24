function buscarOngs(evento) {
  evento.preventDefault();

  var termo = document.getElementById("busca-texto").value.trim().toLowerCase();
  var categoria = document.getElementById("busca-categoria").value;
  var cards = document.getElementsByClassName("card-ong");
  var encontrados = 0;

  for (var i = 0; i < cards.length; i++) {
    var texto = cards[i].textContent.toLowerCase();
    var categoriaDoCard = cards[i].getAttribute("data-categoria");

    var achouTexto = texto.indexOf(termo) !== -1;
    var achouCategoria = categoria === "todas" || categoria === categoriaDoCard;

    if (achouTexto && achouCategoria) {
      cards[i].style.display = "block";
      encontrados = encontrados + 1;
    } else {
      cards[i].style.display = "none";
    }
  }

  var mensagem = document.getElementById("nenhum-resultado");
  if (encontrados === 0) {
    mensagem.style.display = "block";
  } else {
    mensagem.style.display = "none";
  }
}

function mostrarPrazo() {
  var campo = document.getElementById("prazo-dias");
  var limite = new Date(campo.getAttribute("data-limite") + "T23:59:59");
  var milissegundos = limite - new Date();
  var dias = Math.ceil(milissegundos / (1000 * 60 * 60 * 24));

  if (dias < 0) {
    dias = 0;
  }
  campo.textContent = dias;
}

function textoDoItem(necessidade) {
  return necessidade.item + " (" + necessidade.quantidade + " " + necessidade.unidade + ")";
}

function mostrarItensParaEscolher() {
  var caixa = document.getElementById("bloco-necessidades-projeto");
  var necessidades = lerLista("necessidades");

  if (necessidades.length === 0) {
    caixa.innerHTML = '<p class="texto-apoio">A ONG ainda não publicou necessidades.</p>';
    return;
  }

  var html = "";
  for (var i = 0; i < necessidades.length; i++) {
    var n = necessidades[i];
    html = html + '<div class="painel-cinza necessidade">';
    html = html + '<label class="escolha">';
    html = html + '<input type="checkbox" class="escolha-item">';
    html = html + '<strong>' + n.item + '</strong>';
    html = html + '</label>';
    html = html + '<p>Categoria: ' + n.categoria + '</p>';
    html = html + '<p>Quantidade pedida: ' + n.quantidade + ' ' + n.unidade + '</p>';
    html = html + '<span class="selo selo-' + n.urgencia + '">' + textoUrgencia(n.urgencia) + '</span>';
    html = html + '</div>';
  }
  caixa.innerHTML = html;
}

function escolherItens() {
  var necessidades = lerLista("necessidades");
  var caixas = document.getElementsByClassName("escolha-item");
  var escolhidos = [];

  for (var i = 0; i < caixas.length; i++) {
    if (caixas[i].checked) {
      escolhidos.push(textoDoItem(necessidades[i]));
    }
  }

  if (escolhidos.length === 0) {
    alert("Marque pelo menos um item para doar.");
    return;
  }

  salvarLista("itensEscolhidos", escolhidos);
  window.location.href = "doador-finalizar.html";
}

function mostrarItensEscolhidos() {
  var escolhidos = lerLista("itensEscolhidos");

  if (escolhidos.length === 0) {
    window.location.href = "doador-projeto.html";
    return;
  }

  var html = "";
  for (var i = 0; i < escolhidos.length; i++) {
    html = html + "<li>• " + escolhidos[i] + "</li>";
  }
  document.getElementById("itens-escolhidos").innerHTML = html;
}

function confirmarDoacao(evento) {
  evento.preventDefault();

  var escolhidos = lerLista("itensEscolhidos");
  var novaDoacao = {
    id: Date.now(),
    doador: "João Silva",
    email: "joao.silva@email.com",
    ong: "ONG Mãos Solidárias",
    itens: escolhidos.join(", "),
    ponto: "Rua das Flores, 123 · Centro · Belo Horizonte, MG",
    dt_doacao: dataDeHoje(),
    status: "Pendente de entrega",
    observacao: document.getElementById("observacao").value.trim()
  };

  var doacoes = lerLista("doacoes");
  doacoes.unshift(novaDoacao);
  salvarLista("doacoes", doacoes);
  localStorage.setItem("ultimaDoacao", JSON.stringify(novaDoacao));
  localStorage.removeItem("itensEscolhidos");

  window.location.href = "doador-registrada.html";
}

function mostrarDoacaoRegistrada() {
  var doacao = JSON.parse(localStorage.getItem("ultimaDoacao"));

  if (doacao === null) {
    window.location.href = "doador-inicio.html";
    return;
  }

  document.getElementById("itens-registro").textContent = doacao.itens;
  document.getElementById("data-registro").textContent = doacao.dt_doacao;

  if (doacao.observacao === "") {
    document.getElementById("observacao-registro").textContent = "Nenhuma";
  } else {
    document.getElementById("observacao-registro").textContent = doacao.observacao;
  }
}

function mostrarHistorico() {
  var caixa = document.getElementById("lista-doacoes-doador");
  var doacoes = lerLista("doacoes");

  document.getElementById("total-doacoes-doador").textContent = doacoes.length;

  var html = "";
  for (var i = 0; i < doacoes.length; i++) {
    var d = doacoes[i];
    var classeSelo = "selo-pendente";
    if (estaConcluida(d)) {
      classeSelo = "selo-concluida";
    }

    html = html + '<article class="linha linha-coluna">';
    html = html + '<h4>Doação para ' + d.ong + ' · ' + d.dt_doacao + '</h4>';
    html = html + '<p><strong>Itens:</strong> ' + d.itens + '</p>';
    html = html + '<p><strong>Ponto de entrega:</strong> ' + d.ponto + '</p>';
    html = html + '<p>Status: <span class="selo ' + classeSelo + '">' + d.status + '</span></p>';
    html = html + '</article>';
  }
  caixa.innerHTML = html;
}

var formBusca = document.getElementById("formulario-busca");
if (formBusca !== null) {
  formBusca.addEventListener("submit", buscarOngs);
}

if (document.getElementById("prazo-dias") !== null) {
  mostrarPrazo();
}

if (document.getElementById("bloco-necessidades-projeto") !== null) {
  mostrarItensParaEscolher();
}

if (document.getElementById("itens-escolhidos") !== null) {
  mostrarItensEscolhidos();
}

var formDoacao = document.getElementById("formulario-doacao");
if (formDoacao !== null) {
  formDoacao.addEventListener("submit", confirmarDoacao);
}

if (document.getElementById("itens-registro") !== null) {
  mostrarDoacaoRegistrada();
}

if (document.getElementById("lista-doacoes-doador") !== null) {
  mostrarHistorico();
}
