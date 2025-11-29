document.getElementById("btn-login").addEventListener("click", async () => {
  const email = document.getElementById("username").value;
  const senha = document.getElementById("senha").value;
  const erro = document.getElementById("erro-login");

  if (!email || !senha) {
    erro.textContent = "Preencha todos os campos!";
    return;
  }

  try {
    const resp = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha })
    });

    const data = await resp.json();

    if (!resp.ok) {
      erro.textContent = data.erro || "Erro ao fazer login";
      return;
    }

    // salvar ID na sessão
    localStorage.setItem("usuario_id", data.usuario_id);
    window.location.href = "/index.html";

  } catch (err) {
    erro.textContent = "Erro de conexão com servidor!";
  }
});
