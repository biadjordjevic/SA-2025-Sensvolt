document.getElementById("btn-login").addEventListener("click", async () => {
  const email = document.getElementById("username").value;
  const senha = document.getElementById("senha").value;
  const erro = document.getElementById("erro-login");

  if (!email || !senha) {
    erro.textContent = "Preencha todos os campos!";
    return;
  }

  try {
    // send login request to relative endpoint (backend should serve this)
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

    // salvar ID na sessão e usuário logado para o menu
    localStorage.setItem("usuario_id", data.usuario_id);
    // prefer fields returned by backend (nome/email/usuario_id)
    const userObj = { usuario_id: data.usuario_id, nome: data.nome || data.username || data.name, email: data.email };
    localStorage.setItem('usuarioLogado', JSON.stringify(userObj));
    window.location.href = "/index.html";

  } catch (err) {
    console.error('Login error', err);
    erro.textContent = "Erro de conexão com servidor!";
  }
});
