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