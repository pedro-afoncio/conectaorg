document.querySelectorAll(".form-aviso").forEach(form => {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    alert(form.dataset.mensagem);
  });
});
