const formOng = document.getElementById("formulario-ong");

if (formOng) {
  formOng.addEventListener("submit", function (e) {
    e.preventDefault();
    const organizacoes = JSON.parse(localStorage.getItem("organizacoes")) || [];
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
    localStorage.setItem("organizacoes", JSON.stringify(organizacoes));

    alert("Cadastro enviado com sucesso! Sua organização está aguardando aprovação do administrador.");
    window.location.href = "index.html";
  });
}
