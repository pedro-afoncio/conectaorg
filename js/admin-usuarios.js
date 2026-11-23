let idUsuarioEmEdicao = null;

function obterUsuarios() {
  return JSON.parse(localStorage.getItem("usuariosLista")) || [];
}

function salvarUsuarios(lista) {
  localStorage.setItem("usuariosLista", JSON.stringify(lista));
}

function renderizarListaUsuarios(usuarios) {
  const container = document.getElementById("lista-usuarios-admin");
  if (!container) return;
  const lista = usuarios || obterUsuarios();

  if (lista.length === 0) {
    container.innerHTML = '<p class="texto-apoio">Nenhum usuário encontrado com os filtros informados.</p>';
    return;
  }

  container.innerHTML = lista.map(u => {
    const seloClasse = u.status === "Desativado" ? "selo-alta" : (u.status === "Pendente" ? "selo-pendente" : "selo-concluida");
    const statusRotulo = u.status === "Pendente" ? "E-mail não confirmado" : u.status;
    const botaoAlternar = u.status === "Desativado"
      ? `<button type="button" class="botao botao-pequeno" onclick="alternarStatusUsuario(${u.id})">Ativar</button>`
      : `<button type="button" class="botao botao-perigo botao-pequeno" onclick="alternarStatusUsuario(${u.id})">Desativar</button>`;

    return `
      <article class="linha">
        <div class="linha-info">
          <h3>${u.nome}</h3>
          <p>${u.email} · <strong>${u.perfil}</strong> · Cadastro em ${u.dt_cadastro || "2026"}</p>
        </div>
        <div class="linha-acoes">
          <span class="selo ${seloClasse}">${statusRotulo}</span>
          <button type="button" class="botao botao-secundario botao-pequeno" onclick="editarUsuario(${u.id})">Editar</button>
          ${botaoAlternar}
        </div>
      </article>
    `;
  }).join("");
}

function alternarFormularioUsuario(abrir, titulo = "Cadastrar novo usuário") {
  const form = document.getElementById("formulario-usuario");
  const tituloForm = document.getElementById("titulo-formulario-usuario");
  if (!form) return;
  if (abrir) {
    if (tituloForm) tituloForm.textContent = titulo;
    form.style.display = "block";
    form.scrollIntoView({ behavior: "smooth" });
  } else {
    form.reset();
    form.style.display = "none";
    idUsuarioEmEdicao = null;
  }
}

function editarUsuario(id) {
  const usuario = obterUsuarios().find(u => u.id === id);
  if (!usuario) return;
  document.getElementById("usuario-nome").value = usuario.nome;
  document.getElementById("usuario-email").value = usuario.email;
  document.getElementById("usuario-perfil-edit").value = usuario.perfil;
  document.getElementById("usuario-status-edit").value = usuario.status;
  idUsuarioEmEdicao = id;
  alternarFormularioUsuario(true, "Editar usuário");
}

function alternarStatusUsuario(id) {
  const lista = obterUsuarios();
  const usuario = lista.find(u => u.id === id);
  if (!usuario) return;

  if (usuario.status === "Desativado") {
    usuario.status = "Ativo";
    alert("Usuário reativado com sucesso!");
  } else {
    if (!confirm("Deseja realmente desativar o acesso deste usuário?")) return;
    usuario.status = "Desativado";
    alert("Usuário desativado com sucesso!");
  }
  salvarUsuarios(lista);
  renderizarListaUsuarios();
}

const botaoNovo = document.getElementById("botao-adicionar-usuario");
if (botaoNovo) botaoNovo.addEventListener("click", () => alternarFormularioUsuario(true));

const botaoCancelar = document.getElementById("botao-cancelar-usuario");
if (botaoCancelar) botaoCancelar.addEventListener("click", () => alternarFormularioUsuario(false));

const formUsuario = document.getElementById("formulario-usuario");
if (formUsuario) {
  formUsuario.addEventListener("submit", function (e) {
    e.preventDefault();
    const lista = obterUsuarios();
    const dados = {
      nome: document.getElementById("usuario-nome").value.trim(),
      email: document.getElementById("usuario-email").value.trim(),
      perfil: document.getElementById("usuario-perfil-edit").value,
      status: document.getElementById("usuario-status-edit").value
    };

    if (idUsuarioEmEdicao === null) {
      lista.unshift({ id: Date.now(), dt_cadastro: new Date().toLocaleDateString("pt-BR"), ...dados });
      alert("Novo usuário cadastrado com sucesso!");
    } else {
      const idx = lista.findIndex(u => u.id === idUsuarioEmEdicao);
      if (idx !== -1) lista[idx] = { ...lista[idx], ...dados };
      alert("Dados do usuário atualizados com sucesso!");
    }

    salvarUsuarios(lista);
    renderizarListaUsuarios();
    alternarFormularioUsuario(false);
  });
}

const formBusca = document.getElementById("form-busca-usuarios");
if (formBusca) {
  formBusca.addEventListener("submit", function (e) {
    e.preventDefault();
    const termo = document.getElementById("buscar-usuario").value.toLowerCase().trim();
    const perfil = document.getElementById("perfil-usuario").value;
    const filtrados = obterUsuarios().filter(u => {
      const combinaTexto = !termo || u.nome.toLowerCase().includes(termo) || u.email.toLowerCase().includes(termo);
      const combinaPerfil = perfil === "Todos" || u.perfil === perfil;
      return combinaTexto && combinaPerfil;
    });
    renderizarListaUsuarios(filtrados);
  });
}

renderizarListaUsuarios();
