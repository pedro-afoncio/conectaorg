const usuarios = [
  { usuario: "doador", senha: "doa#2026", pagina: "doador-inicio.html" },
  { usuario: "entidade", senha: "ent!2026", pagina: "ong-painel.html" },
  { usuario: "defesacivil", senha: "dc$-2026", pagina: "defesa-painel.html" },
  { usuario: "admin", senha: "adm@2026", pagina: "admin-painel.html" }
];

const formLogin = document.getElementById("formulario-login");

if (formLogin) {
  formLogin.addEventListener("submit", function (evento) {
    evento.preventDefault();
    const usuarioDigitado = document.getElementById("usuario").value.trim();
    const senhaDigitada = document.getElementById("senha").value;
    const conta = usuarios.find(u => u.usuario === usuarioDigitado && u.senha === senhaDigitada);

    if (conta) {
      localStorage.setItem("perfil", conta.usuario);
      window.location.href = conta.pagina;
    } else {
      const msgErro = document.getElementById("erro-login");
      if (msgErro) msgErro.style.display = "block";
    }
  });
}
