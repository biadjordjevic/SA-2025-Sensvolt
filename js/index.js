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
