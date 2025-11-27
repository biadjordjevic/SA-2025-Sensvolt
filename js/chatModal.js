// Modal chat básico com mensagens simuladas e integração mínima com API de IA
(function(){
  const openChat = document.getElementById('openChat');
  const modalChat = document.getElementById('modalChat');
  const closeChat = document.getElementById('closeChat');
  const messagesEl = document.getElementById('messages');
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const sendBtn = document.getElementById('sendBtn');

  if (!openChat || !modalChat) return;

  function open(){
    modalChat.classList.add('show');
    modalChat.setAttribute('aria-hidden','false');
    chatInput.focus();
    document.addEventListener('keydown', onKey);
  }
  function close(){
    modalChat.classList.remove('show');
    modalChat.setAttribute('aria-hidden','true');
    document.removeEventListener('keydown', onKey);
  }
  function onKey(e){ if (e.key === 'Escape') close(); }

  openChat.addEventListener('click', open);
  closeChat?.addEventListener('click', close);
  //modalChat.addEventListener('click', (e)=>{ if (e.target === modalChat) close(); });

  function addMessage(text, author){
    const div = document.createElement('div');
    div.className = 'message ' + (author === 'user' ? 'user' : 'bot');
    const meta = document.createElement('span');
    meta.className = 'meta';
    meta.textContent = author === 'user' ? 'Você' : 'Assistente';
    const content = document.createElement('div');
    content.className = 'content';
    content.textContent = text;
    div.appendChild(meta);
    div.appendChild(content);
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function showTyping(){
    const t = document.createElement('div');
    t.className = 'message bot';
    const content = document.createElement('div');
    const typing = document.createElement('span');
    typing.className = 'typing';
    typing.innerHTML = '<span></span><span></span><span></span>';
    content.appendChild(typing);
    t.appendChild(content);
    messagesEl.appendChild(t);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return t;
  }

  async function sendToAPI(text){
    // Placeholder: função genérica. Troque pela sua implementação de API.
    // Exemplo: fetch('/api/chat', {method:'POST', body: JSON.stringify({message:text})})
    // Aqui simulamos uma resposta com delay
    await new Promise(r=>setTimeout(r, 700 + Math.random()*700));
    return 'Resposta simulada: ' + text;
  }

  chatForm.addEventListener('submit', async function(e){
    e.preventDefault();
    const val = chatInput.value.trim();
    if (!val) return;
    addMessage(val, 'user');
    chatInput.value = '';
    sendBtn.disabled = true;

    const typingEl = showTyping();
    try{
      const reply = await sendToAPI(val);
      messagesEl.removeChild(typingEl);
      addMessage(reply, 'bot');
    }catch(err){
      messagesEl.removeChild(typingEl);
      addMessage('Erro: não foi possível obter resposta.', 'bot');
    }finally{
      sendBtn.disabled = false;
    }
  });
})();
