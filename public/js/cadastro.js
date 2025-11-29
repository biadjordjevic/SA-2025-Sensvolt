document.getElementById("btn-cadastro").addEventListener("click", async () => {
  const nome = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const telefone = document.getElementById("telefone").value;
  const senha = document.getElementById("senha").value;
  const confirmar = document.getElementById("confirmar-senha").value;
  const erro = document.getElementById("erro");

  if (!nome || !email || !senha) {
    erro.textContent = "Preencha todos os campos!";
    return;
  }

  if (senha !== confirmar) {
    erro.textContent = "As senhas não coincidem!";
    return;
  }

  try {
    const resp = await fetch("/cadastro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, senha })
    });

    const data = await resp.json();

    if (!resp.ok) {
      erro.textContent = data.erro || "Erro ao cadastrar!";
      return;
    }

    alert("Usuário cadastrado com sucesso!");
    window.location.href = "/login.html";

  } catch (err) {
    erro.textContent = "Erro de comunicação com servidor";
  }
});

