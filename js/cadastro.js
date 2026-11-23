const formCadastro = document.getElementById("formulario-cadastro");

if (formCadastro) {
  formCadastro.addEventListener("submit", function (e) {
    e.preventDefault();
    const tipo = document.getElementById("tipo").value;

    if (tipo === "ong") {
      window.location.href = "cadastro-ong.html";
      return;
    }

    if (tipo === "defesacivil") {
      alert("Perfil de agente da Defesa Civil pronto para acesso!");
      window.location.href = "login.html";
      return;
    }

    const doadores = JSON.parse(localStorage.getItem("doadores")) || [];
    doadores.push({
      nome: document.getElementById("nome").value.trim(),
      email: document.getElementById("email").value.trim(),
      dt_cadastro: new Date().toLocaleDateString("pt-BR")
    });
    localStorage.setItem("doadores", JSON.stringify(doadores));

    alert("Cadastro realizado com sucesso! Agora é só entrar.");
    window.location.href = "login.html";
  });
}
