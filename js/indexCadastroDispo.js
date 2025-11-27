
document.body.style.zoom = "125%"

const openBtn = document.getElementById('openModal');
const closeBtn = document.getElementById('closeModal');
const modal = document.getElementById('modal');
let lastFocused = null;

function openModal(){
  lastFocused = document.activeElement;
  modal.classList.add('show');
  modal.setAttribute('aria-hidden','false');
  // foca primeiro elemento focável dentro do modal
  const focusable = modal.querySelector('button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])');
  if (focusable) focusable.focus();
  document.addEventListener('keydown', onKeyDown);
}

function closeModal(){
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden','true');
  if (lastFocused) lastFocused.focus();
  document.removeEventListener('keydown', onKeyDown);
}

function onKeyDown(e){
  if (e.key === 'Escape') closeModal();
}

openBtn?.addEventListener('click', openModal);
closeBtn?.addEventListener('click', closeModal);

// clicar fora do conteúdo fecha modal
modal?.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});