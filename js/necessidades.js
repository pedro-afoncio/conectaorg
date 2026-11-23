const listaNecessidades = document.getElementById("lista-necessidades");
const formNecessidade = document.getElementById("formulario-necessidade");
const tituloForm = document.getElementById("titulo-formulario");
let idEmEdicao = null;

function obterNecessidades() {
  return JSON.parse(localStorage.getItem("necessidades")) || [];
}

function salvarNecessidades(lista) {
  localStorage.setItem("necessidades", JSON.stringify(lista));
}

function mostrarNecessidades() {
  if (!listaNecessidades) return;
  const itens = obterNecessidades();
  if (itens.length === 0) {
    listaNecessidades.innerHTML = '<p class="texto-apoio">Nenhuma necessidade publicada ainda.</p>';
    return;
  }
  const rotulosUrgencia = { alta: "Urgência alta", media: "Urgência média", baixa: "Urgência baixa" };
  listaNecessidades.innerHTML = itens.map(n => `
    <article class="linha">
      <div class="linha-info">
        <h3>${n.item}</h3>
        <p>Categoria: ${n.categoria} · Quantidade estimada: ${n.quantidade} ${n.unidade}</p>
      </div>
      <div class="linha-acoes">
        <span class="selo selo-${n.urgencia}">${rotulosUrgencia[n.urgencia] || n.urgencia}</span>
        <button type="button" class="botao botao-secundario botao-pequeno" onclick="editarNecessidade(${n.id})">Editar</button>
        <button type="button" class="botao botao-perigo botao-pequeno" onclick="removerNecessidade(${n.id})">Remover</button>
      </div>
    </article>
  `).join("");
}

function alternarFormulario(abrir, titulo = "Nova necessidade") {
  if (!formNecessidade) return;
  if (abrir) {
    if (tituloForm) tituloForm.textContent = titulo;
    formNecessidade.style.display = "block";
    formNecessidade.scrollIntoView({ behavior: "smooth" });
  } else {
    formNecessidade.reset();
    formNecessidade.style.display = "none";
    idEmEdicao = null;
  }
}

function editarNecessidade(id) {
  const item = obterNecessidades().find(n => n.id === id);
  if (!item) return;
  document.getElementById("item").value = item.item;
  document.getElementById("categoria").value = item.categoria;
  document.getElementById("quantidade").value = item.quantidade;
  document.getElementById("unidade").value = item.unidade;
  document.getElementById("urgencia").value = item.urgencia;
  idEmEdicao = id;
  alternarFormulario(true, "Editar necessidade");
}

function removerNecessidade(id) {
  if (!confirm("Deseja mesmo remover esta necessidade?")) return;
  const itens = obterNecessidades().filter(n => n.id !== id);
  salvarNecessidades(itens);
  mostrarNecessidades();
}

const botaoAdicionar = document.getElementById("botao-adicionar");
if (botaoAdicionar) botaoAdicionar.addEventListener("click", () => alternarFormulario(true));

const botaoCancelar = document.getElementById("botao-cancelar");
if (botaoCancelar) botaoCancelar.addEventListener("click", () => alternarFormulario(false));

if (formNecessidade) {
  formNecessidade.addEventListener("submit", function (e) {
    e.preventDefault();
    const dados = {
      item: document.getElementById("item").value.trim(),
      categoria: document.getElementById("categoria").value,
      quantidade: Number(document.getElementById("quantidade").value),
      unidade: document.getElementById("unidade").value.trim(),
      urgencia: document.getElementById("urgencia").value
    };
    const lista = obterNecessidades();

    if (idEmEdicao === null) {
      lista.push({ id: Date.now(), ...dados });
    } else {
      const idx = lista.findIndex(n => n.id === idEmEdicao);
      if (idx !== -1) lista[idx] = { id: idEmEdicao, ...dados };
    }

    salvarNecessidades(lista);
    mostrarNecessidades();
    alternarFormulario(false);
  });
}

function mostrarCampanhasOng() {
  const container = document.getElementById("lista-campanhas-ong");
  if (!container) return;
  const campanhas = JSON.parse(localStorage.getItem("campanhas")) || [];
  if (campanhas.length === 0) {
    container.innerHTML = '<p class="texto-apoio">Nenhuma campanha cadastrada ainda.</p>';
    return;
  }
  container.innerHTML = campanhas.map(c => `
    <article class="linha">
      <div class="linha-info">
        <h3>${c.titulo}</h3>
        <p>${c.descricao}</p>
        <p><strong>Meta:</strong> ${c.meta || "1.000 unidades"} · <strong>Status:</strong> ${c.status || "Ativa"} · <strong>Região:</strong> ${c.regiao || "Comunitária"}</p>
      </div>
      <div class="linha-acoes">
        <span class="selo ${c.urgencia === "alta" ? "selo-alta" : "selo-media"}">${c.urgencia === "alta" ? "Urgência alta" : "Urgência média"}</span>
      </div>
    </article>
  `).join("");
}

mostrarNecessidades();
mostrarCampanhasOng();
