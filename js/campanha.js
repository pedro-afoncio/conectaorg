const formCampanha = document.getElementById("formulario-campanha");

if (formCampanha) {
  formCampanha.addEventListener("submit", function (e) {
    e.preventDefault();
    const campanhas = JSON.parse(localStorage.getItem("campanhas")) || [];
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
    localStorage.setItem("campanhas", JSON.stringify(campanhas));

    alert("Campanha criada com sucesso! Ela foi publicada no seu painel e submetida à moderação.");
    window.location.href = "ong-painel.html";
  });
}
