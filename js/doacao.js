const formDoacao = document.getElementById("formulario-doacao");

if (formDoacao) {
  formDoacao.addEventListener("submit", function (e) {
    e.preventDefault();
    const obs = document.getElementById("observacao")?.value.trim() || "";
    const novaDoacao = {
      id: Date.now(),
      doador: "João Silva",
      email: "joao.silva@email.com",
      ong: "ONG Mãos Solidárias",
      itens: "Alimentos não perecíveis (5 kg), Feijão (3 kg), Leite em pó (2 un)",
      ponto: "Rua das Flores, 123 · Centro · Belo Horizonte, MG",
      dt_doacao: new Date().toLocaleDateString("pt-BR"),
      status: "Pendente de entrega",
      modalidade: "Entrega no ponto de coleta",
      observacao: obs
    };

    localStorage.setItem("ultimaDoacao", JSON.stringify(novaDoacao));
    const doacoes = JSON.parse(localStorage.getItem("doacoes")) || [];
    doacoes.unshift(novaDoacao);
    localStorage.setItem("doacoes", JSON.stringify(doacoes));

    window.location.href = "doador-registrada.html";
  });
}
