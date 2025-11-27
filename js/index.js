document.addEventListener("DOMContentLoaded", function() {
    const botaoMenu = document.getElementById("btn-menu");
    const modalMenu = document.getElementById("modal-menu-site");

    if (botaoMenu && modalMenu) {
        // Abre/fecha o menu
        botaoMenu.addEventListener("click", (event) => {
            event.stopPropagation(); // impede fechar imediatamente
            modalMenu.classList.toggle("active");
        });

        // Fecha o menu ao clicar fora
        document.addEventListener("click", (event) => {
            if (!modalMenu.contains(event.target) && !botaoMenu.contains(event.target)) {
                modalMenu.classList.remove("active");
            }
        });
    }
});


// Coisa pro campo de telefone no html/suporte_tel.html

(function(){
      const tel = document.getElementById('tel');
      if (!tel) return;

      function formatBRPhone(digits){
        if (!digits) return '';
        if (digits.length <= 2) return '+55 ' + digits;
        if (digits.length <= 6) return '+55 (' + digits.slice(0,2) + ') ' + digits.slice(2);
        if (digits.length <= 10) return '+55 (' + digits.slice(0,2) + ') ' + digits.slice(2,6) + (digits.length > 6 ? '-' + digits.slice(6) : '');
        return '+55 (' + digits.slice(0,2) + ') ' + digits.slice(2,7) + '-' + digits.slice(7);
      }

      function cleanDigits(value){
        return value.replace(/\D/g, '');
      }

      function applyMask(raw){
        let digits = cleanDigits(raw);
        if (digits.startsWith('55')) digits = digits.slice(2);
        if (digits.length > 11) digits = digits.slice(0,11);
        return formatBRPhone(digits);
      }

      tel.addEventListener('focus', function(){
        if (!tel.value) tel.value = '+55 ';
      });

      tel.addEventListener('input', function(e){
        const start = tel.selectionStart;
        const masked = applyMask(tel.value);
        tel.value = masked;
        tel.selectionStart = tel.selectionEnd = tel.value.length;
      });

      tel.addEventListener('paste', function(){
        setTimeout(()=>{
          tel.value = applyMask(tel.value);
        }, 0);
      });

      tel.addEventListener('blur', function(){
        const digits = cleanDigits(tel.value).replace(/^55/, '');
        if (!digits) tel.value = '';
      });
    })();

    // acaba aqui o coiso do telefone


    // JS do cadastro
const btnCadastro = document.getElementById("btn-cadastro");
if (btnCadastro) {
    btnCadastro.addEventListener("click", function () {

    let username = document.getElementById("username").value.trim();
    let email = document.getElementById("email").value.trim();
    let telefone = document.getElementById("telefone").value.trim();
    let senha = document.getElementById("senha").value.trim();
    let confirmarSenha = document.getElementById("confirmar-senha").value.trim();

    let erro = document.getElementById("erro");
    erro.textContent = "";

    if (username === "" || email === "" || telefone === "" || senha === "" || confirmarSenha === "") {
        erro.textContent = "Preencha todos os campos.";
        return;
    }

    if (!email.includes("@") || !email.includes(".")) {
        erro.textContent = "Digite um email válido.";
        return;
    }

    if (telefone.length < 8 || telefone.length > 11) {
        erro.textContent = "Telefone inválido.";
        return;
    }

    if (senha !== confirmarSenha) {
        erro.textContent = "As senhas não coincidem.";
        return;
    }

    // Salvar no localStorage
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    if (usuarios.some(u => u.email === email)) {
        erro.textContent = "Este email já está cadastrado.";
        return;
    }

    usuarios.push({ username, email, telefone, senha });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Cadastro realizado com sucesso!");
    window.location.href = "login.html";
});}

// login js
document.addEventListener("DOMContentLoaded", function () {
    const btnLogin = document.getElementById("btn-login");

    if (!btnLogin) return;

    btnLogin.addEventListener("click", function () {
        const username = document.getElementById("username").value.trim();
        const senha = document.getElementById("senha").value.trim();

        const erroLogin = document.getElementById("erro-login");
        erroLogin.textContent = "";

        if (!username || !senha) {
            erroLogin.textContent = "Preencha todos os campos.";
            return;
        }

        const usuariosSalvos = JSON.parse(localStorage.getItem("usuarios")) || [];

        const usuarioEncontrado = usuariosSalvos.find(u => u.username === username);

        if (!usuarioEncontrado) {
            erroLogin.textContent = "Usuário não encontrado.";
            return;
        }

        if (usuarioEncontrado.senha !== senha) {
            erroLogin.textContent = "Senha incorreta.";
            return;
        }

        localStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado));

        alert("Login realizado com sucesso!");
        window.location.href = "index.html";
    });
});


    function grafico(){
    window.location.href= "/html/graficos.html"
}
