function lerLista(chave) {
  var texto = localStorage.getItem(chave);
  if (texto === null) {
    return [];
  }
  return JSON.parse(texto);
}

function salvarLista(chave, lista) {
  localStorage.setItem(chave, JSON.stringify(lista));
}

function dataDeHoje() {
  return new Date().toLocaleDateString("pt-BR");
}

function textoUrgencia(urgencia) {
  if (urgencia === "alta") {
    return "Urgência alta";
  }
  if (urgencia === "media") {
    return "Urgência média";
  }
  return "Urgência baixa";
}

function estaConcluida(doacao) {
  return doacao.status === "Recebida pela ONG";
}

function avisar(mensagem) {
  alert(mensagem);
  return false;
}

function protegerPagina() {
  var perfilDaPagina = document.body.getAttribute("data-perfil");
  var perfilLogado = localStorage.getItem("perfil");

  if (perfilDaPagina !== null && perfilDaPagina !== perfilLogado) {
    window.location.href = "login.html";
  }
}

function sair(evento) {
  evento.preventDefault();
  localStorage.removeItem("perfil");
  window.location.href = "index.html";
}

function entrar(evento) {
  evento.preventDefault();

  var contas = [
    { usuario: "doador", senha: "doa#2026", pagina: "doador-inicio.html" },
    { usuario: "entidade", senha: "ent!2026", pagina: "ong-painel.html" },
    { usuario: "defesacivil", senha: "dc$-2026", pagina: "defesa-painel.html" },
    { usuario: "admin", senha: "adm@2026", pagina: "admin-painel.html" }
  ];

  var usuarioDigitado = document.getElementById("usuario").value.trim();
  var senhaDigitada = document.getElementById("senha").value;

  for (var i = 0; i < contas.length; i++) {
    if (contas[i].usuario === usuarioDigitado && contas[i].senha === senhaDigitada) {
      localStorage.setItem("perfil", contas[i].usuario);
      window.location.href = contas[i].pagina;
      return;
    }
  }

  document.getElementById("erro-login").style.display = "block";
}

function cadastrarUsuario(evento) {
  evento.preventDefault();
  var tipo = document.getElementById("tipo").value;

  if (tipo === "ong") {
    window.location.href = "cadastro-ong.html";
    return;
  }

  if (tipo === "doador") {
    var usuarios = lerLista("usuariosLista");
    usuarios.unshift({
      id: Date.now(),
      nome: document.getElementById("nome").value.trim(),
      email: document.getElementById("email").value.trim(),
      perfil: "Doador",
      dt_cadastro: dataDeHoje(),
      status: "Ativo"
    });
    salvarLista("usuariosLista", usuarios);
  }

  alert("Cadastro realizado com sucesso! Agora é só entrar.");
  window.location.href = "login.html";
}

function cadastrarOng(evento) {
  evento.preventDefault();

  var organizacoes = lerLista("organizacoes");
  organizacoes.unshift({
    id: Date.now(),
    razao_social: document.getElementById("razao-social").value.trim(),
    tipo: document.getElementById("tipo-org").value,
    cnpj: document.getElementById("cnpj").value.trim(),
    endereco: document.getElementById("endereco").value.trim(),
    telefone: document.getElementById("telefone").value.trim(),
    email: document.getElementById("email").value.trim(),
    descricao: document.getElementById("descricao").value.trim(),
    verificada: false
  });
  salvarLista("organizacoes", organizacoes);

  alert("Cadastro enviado com sucesso! Sua organização está aguardando aprovação do administrador.");
  window.location.href = "index.html";
}

protegerPagina();

var linkSair = document.getElementById("sair");
if (linkSair !== null) {
  linkSair.addEventListener("click", sair);
}

var formLogin = document.getElementById("formulario-login");
if (formLogin !== null) {
  formLogin.addEventListener("submit", entrar);
}

var formCadastro = document.getElementById("formulario-cadastro");
if (formCadastro !== null) {
  formCadastro.addEventListener("submit", cadastrarUsuario);
}

var formCadastroOng = document.getElementById("formulario-ong");
if (formCadastroOng !== null) {
  formCadastroOng.addEventListener("submit", cadastrarOng);
}
