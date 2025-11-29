document.querySelector(".butEnv").addEventListener("click", async () => {
  const nome = document.querySelector("input[name='nomeDispo']").value;
  const modelo = document.querySelector("input[name='ModeloDispo']").value;
  const codigo = document.querySelector("input[name='codigoProd']").value;
  const descricao = document.querySelector("input[name='descricao']").value;

  const usuario_id = localStorage.getItem("usuario_id");

  if (!usuario_id) {
    alert("Você não está logado!");
    return;
  }

  if (!nome || !modelo || !codigo) {
    alert("Preencha os campos obrigatórios!");
    return;
  }

  await fetch("/aparelhos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nome,
      modelo,
      codigo,
      descricao,
      consumo_maximo: null,
      temp_min: null,
      temp_max: null,
      usuario_id
    })
  });

  alert("Dispositivo cadastrado!");
});
