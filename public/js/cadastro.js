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

    // read response safely: some server errors may return an empty body
    const text = await resp.text();
    let data = null;
    try { data = text ? JSON.parse(text) : null; } catch (parseErr) { /* ignore */ }

    if (!resp.ok) {
      // show server-provided error message when present, fallback to status
      erro.textContent = (data && data.erro) ? data.erro : (`Erro ao cadastrar (status ${resp.status})`);
      return;
    }

    alert("Usuário cadastrado com sucesso!");
    window.location.href = "/login.html";

  } catch (err) {
    console.error('Cadastro error', err);
    erro.textContent = "Erro de comunicação com servidor";
  }
});

