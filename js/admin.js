var idUsuarioEmEdicao = null;

function mostrarUsuarios(usuarios) {
  var caixa = document.getElementById("lista-usuarios-admin");

  if (usuarios.length === 0) {
    caixa.innerHTML = '<p class="texto-apoio">Nenhum usuário encontrado.</p>';
    return;
  }

  var html = "";
  for (var i = 0; i < usuarios.length; i++) {
    var u = usuarios[i];
    var classeSelo = "selo-concluida";
    var textoSelo = u.status;
    var botaoStatus = '<button type="button" class="botao botao-pequeno" onclick="trocarStatusUsuario(' + u.id + ')">Desativar</button>';

    if (u.status === "Desativado") {
      classeSelo = "selo-alta";
      botaoStatus = '<button type="button" class="botao botao-pequeno" onclick="trocarStatusUsuario(' + u.id + ')">Ativar</button>';
    }
    if (u.status === "Pendente") {
      classeSelo = "selo-pendente";
      textoSelo = "E-mail não confirmado";
    }

    html = html + '<article class="linha">';
    html = html + '<div class="linha-info">';
    html = html + '<h3>' + u.nome + '</h3>';
    html = html + '<p>' + u.email + ' · <strong>' + u.perfil + '</strong> · Cadastro em ' + u.dt_cadastro + '</p>';
    html = html + '</div>';
    html = html + '<div class="linha-acoes">';
    html = html + '<span class="selo ' + classeSelo + '">' + textoSelo + '</span>';
    html = html + '<button type="button" class="botao botao-secundario botao-pequeno" onclick="editarUsuario(' + u.id + ')">Editar</button>';
    html = html + botaoStatus;
    html = html + '<button type="button" class="botao botao-perigo botao-pequeno" onclick="excluirUsuario(' + u.id + ')">Excluir</button>';
    html = html + '</div>';
    html = html + '</article>';
  }
  caixa.innerHTML = html;
}

function abrirFormularioUsuario(titulo) {
  document.getElementById("titulo-formulario-usuario").textContent = titulo;
  document.getElementById("formulario-usuario").style.display = "block";
}

function fecharFormularioUsuario() {
  document.getElementById("formulario-usuario").reset();
  document.getElementById("formulario-usuario").style.display = "none";
  idUsuarioEmEdicao = null;
}

function novoUsuario() {
  idUsuarioEmEdicao = null;
  document.getElementById("formulario-usuario").reset();
  abrirFormularioUsuario("Cadastrar novo usuário");
}

function editarUsuario(id) {
  var usuarios = lerLista("usuariosLista");

  for (var i = 0; i < usuarios.length; i++) {
    if (usuarios[i].id === id) {
      document.getElementById("usuario-nome").value = usuarios[i].nome;
      document.getElementById("usuario-email").value = usuarios[i].email;
      document.getElementById("usuario-perfil-edit").value = usuarios[i].perfil;
      document.getElementById("usuario-status-edit").value = usuarios[i].status;
      idUsuarioEmEdicao = id;
      abrirFormularioUsuario("Editar usuário");
    }
  }
}

function salvarUsuario(evento) {
  evento.preventDefault();

  var usuarios = lerLista("usuariosLista");
  var nome = document.getElementById("usuario-nome").value.trim();
  var email = document.getElementById("usuario-email").value.trim();
  var perfil = document.getElementById("usuario-perfil-edit").value;
  var status = document.getElementById("usuario-status-edit").value;

  if (idUsuarioEmEdicao === null) {
    usuarios.unshift({
      id: Date.now(),
      nome: nome,
      email: email,
      perfil: perfil,
      dt_cadastro: dataDeHoje(),
      status: status
    });
  } else {
    for (var i = 0; i < usuarios.length; i++) {
      if (usuarios[i].id === idUsuarioEmEdicao) {
        usuarios[i].nome = nome;
        usuarios[i].email = email;
        usuarios[i].perfil = perfil;
        usuarios[i].status = status;
      }
    }
  }

  salvarLista("usuariosLista", usuarios);
  mostrarUsuarios(usuarios);
  fecharFormularioUsuario();
}

function trocarStatusUsuario(id) {
  var usuarios = lerLista("usuariosLista");

  for (var i = 0; i < usuarios.length; i++) {
    if (usuarios[i].id === id) {
      if (usuarios[i].status === "Desativado") {
        usuarios[i].status = "Ativo";
      } else {
        usuarios[i].status = "Desativado";
      }
    }
  }
  salvarLista("usuariosLista", usuarios);
  mostrarUsuarios(usuarios);
}

function excluirUsuario(id) {
  if (confirm("Deseja mesmo excluir este usuário?") === false) {
    return;
  }

  var usuarios = lerLista("usuariosLista");
  var restantes = [];
  for (var i = 0; i < usuarios.length; i++) {
    if (usuarios[i].id !== id) {
      restantes.push(usuarios[i]);
    }
  }
  salvarLista("usuariosLista", restantes);
  mostrarUsuarios(restantes);
}

function buscarUsuarios(evento) {
  evento.preventDefault();

  var termo = document.getElementById("buscar-usuario").value.toLowerCase().trim();
  var perfil = document.getElementById("perfil-usuario").value;
  var usuarios = lerLista("usuariosLista");
  var filtrados = [];

  for (var i = 0; i < usuarios.length; i++) {
    var u = usuarios[i];
    var achouTexto = u.nome.toLowerCase().indexOf(termo) !== -1 || u.email.toLowerCase().indexOf(termo) !== -1;
    var achouPerfil = perfil === "Todos" || u.perfil === perfil;

    if (achouTexto && achouPerfil) {
      filtrados.push(u);
    }
  }
  mostrarUsuarios(filtrados);
}

function mostrarOngs(organizacoes) {
  var caixa = document.getElementById("lista-ongs-admin");

  if (organizacoes.length === 0) {
    caixa.innerHTML = '<p class="texto-apoio">Nenhuma ONG encontrada.</p>';
    return;
  }

  var html = "";
  for (var i = 0; i < organizacoes.length; i++) {
    var o = organizacoes[i];
    var selo = '<span class="selo selo-pendente">Aguardando aprovação</span>';
    var botoes = '<button type="button" class="botao botao-pequeno" onclick="aprovarOng(' + o.id + ')">Aprovar</button>';
    botoes = botoes + '<button type="button" class="botao botao-perigo botao-pequeno" onclick="recusarOng(' + o.id + ')">Recusar</button>';

    if (o.verificada) {
      selo = '<span class="selo selo-concluida">Aprovada</span>';
      botoes = '<a href="doador-projeto.html" class="botao botao-secundario botao-pequeno">Ver perfil</a>';
    }

    html = html + '<article class="linha">';
    html = html + '<div class="linha-info">';
    html = html + '<h3>' + o.razao_social + '</h3>';
    html = html + '<p>CNPJ ' + o.cnpj + ' · ' + o.endereco + '</p>';
    html = html + '</div>';
    html = html + '<div class="linha-acoes">' + selo + botoes + '</div>';
    html = html + '</article>';
  }
  caixa.innerHTML = html;
}

function contarOngsPendentes(organizacoes) {
  var total = 0;
  for (var i = 0; i < organizacoes.length; i++) {
    if (organizacoes[i].verificada === false) {
      total = total + 1;
    }
  }
  document.getElementById("contador-aguardando").textContent = total;
}

function aprovarOng(id) {
  var organizacoes = lerLista("organizacoes");

  for (var i = 0; i < organizacoes.length; i++) {
    if (organizacoes[i].id === id) {
      organizacoes[i].verificada = true;
    }
  }
  salvarLista("organizacoes", organizacoes);
  mostrarOngs(organizacoes);
  contarOngsPendentes(organizacoes);
}

function recusarOng(id) {
  if (confirm("Deseja realmente recusar este cadastro?") === false) {
    return;
  }

  var organizacoes = lerLista("organizacoes");
  var restantes = [];
  for (var i = 0; i < organizacoes.length; i++) {
    if (organizacoes[i].id !== id) {
      restantes.push(organizacoes[i]);
    }
  }
  salvarLista("organizacoes", restantes);
  mostrarOngs(restantes);
  contarOngsPendentes(restantes);
}

function buscarOngsAdmin(evento) {
  evento.preventDefault();

  var termo = document.getElementById("buscar-ong").value.toLowerCase().trim();
  var situacao = document.getElementById("situacao").value;
  var organizacoes = lerLista("organizacoes");
  var filtradas = [];

  for (var i = 0; i < organizacoes.length; i++) {
    var o = organizacoes[i];
    var texto = (o.razao_social + " " + o.cnpj).toLowerCase();
    var achouTexto = texto.indexOf(termo) !== -1;
    var achouSituacao = situacao === "Todas" || (situacao === "Aprovada" && o.verificada) || (situacao === "Aguardando aprovação" && !o.verificada);

    if (achouTexto && achouSituacao) {
      filtradas.push(o);
    }
  }
  mostrarOngs(filtradas);
}

function aprovarCampanha() {
  document.getElementById("selo-campanha-pendente").textContent = "Ativa e Aprovada";
  document.getElementById("selo-campanha-pendente").className = "selo selo-concluida";
  document.getElementById("botoes-campanha-pendente").style.display = "none";
}

function recusarCampanha() {
  if (confirm("Deseja realmente rejeitar esta campanha?")) {
    document.getElementById("campanha-pendente").style.display = "none";
  }
}

function mostrarDoacoesAdmin(doacoes) {
  var caixa = document.getElementById("lista-doacoes-admin");

  if (doacoes.length === 0) {
    caixa.innerHTML = '<p class="texto-apoio">Nenhuma doação encontrada.</p>';
    return;
  }

  var html = "";
  for (var i = 0; i < doacoes.length; i++) {
    var d = doacoes[i];
    var classeSelo = "selo-pendente";
    if (estaConcluida(d)) {
      classeSelo = "selo-concluida";
    }

    html = html + '<article class="linha">';
    html = html + '<div class="linha-info">';
    html = html + '<h3>' + d.doador + ' → ' + d.ong + '</h3>';
    html = html + '<p>' + d.itens + ' · Data: ' + d.dt_doacao + ' · Ponto: ' + d.ponto + '</p>';
    html = html + '</div>';
    html = html + '<div class="linha-acoes">';
    html = html + '<span class="selo ' + classeSelo + '">' + d.status + '</span>';
    html = html + '</div>';
    html = html + '</article>';
  }
  caixa.innerHTML = html;
}

function filtrarDoacoesAdmin() {
  var nome = document.getElementById("filtro-nome").value.toLowerCase().trim();
  var status = document.getElementById("filtro-status").value;
  var data = document.getElementById("filtro-data").value;
  var dataFormatada = "";
  if (data !== "") {
    var partes = data.split("-");
    dataFormatada = partes[2] + "/" + partes[1] + "/" + partes[0];
  }

  var doacoes = lerLista("doacoes");
  var filtradas = [];
  for (var i = 0; i < doacoes.length; i++) {
    var d = doacoes[i];
    var texto = (d.doador + " " + d.ong + " " + d.itens).toLowerCase();
    var achouNome = texto.indexOf(nome) !== -1;
    var achouStatus = status === "Todos" || d.status.indexOf(status) !== -1;
    var achouData = dataFormatada === "" || d.dt_doacao === dataFormatada;

    if (achouNome && achouStatus && achouData) {
      filtradas.push(d);
    }
  }
  mostrarDoacoesAdmin(filtradas);
}

if (document.getElementById("lista-usuarios-admin") !== null) {
  mostrarUsuarios(lerLista("usuariosLista"));
  document.getElementById("botao-adicionar-usuario").addEventListener("click", novoUsuario);
  document.getElementById("botao-cancelar-usuario").addEventListener("click", fecharFormularioUsuario);
  document.getElementById("formulario-usuario").addEventListener("submit", salvarUsuario);
  document.getElementById("form-busca-usuarios").addEventListener("submit", buscarUsuarios);
}

if (document.getElementById("lista-ongs-admin") !== null) {
  mostrarOngs(lerLista("organizacoes"));
  contarOngsPendentes(lerLista("organizacoes"));
  document.getElementById("form-busca-ongs").addEventListener("submit", buscarOngsAdmin);
}

if (document.getElementById("lista-doacoes-admin") !== null) {
  mostrarDoacoesAdmin(lerLista("doacoes"));
  document.getElementById("botao-aplicar-filtros-admin").addEventListener("click", filtrarDoacoesAdmin);
}
