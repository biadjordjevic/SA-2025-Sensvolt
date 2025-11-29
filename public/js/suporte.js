document.body.style.zoom = "110%";

document.querySelector("button").addEventListener("click", async () => {
  const nome = document.getElementById("user").value;
  const email = document.querySelector("input[type='email']").value;

  if (!nome && !email) {
    alert("Preencha pelo menos um campo!");
    return;
  }

  await fetch("/suporte", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nome,
      contato: email
    })
  });

  alert("Solicitação enviada!");
});