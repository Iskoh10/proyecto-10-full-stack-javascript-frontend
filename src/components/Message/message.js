import './message.css';

const createMessage = (text, duration = 3000) => {
  const messageContainer = document.createElement('div');
  messageContainer.classList.add('message-modal', 'hidden');
  let messageText = document.createElement('p');
  messageText.classList.add('message-text');
  messageText.textContent = `${text}`;

  const main = document.querySelector('main');

  messageContainer.appendChild(messageText);
  main.appendChild(messageContainer);
  messageContainer.classList.remove('hidden');
  messageContainer.classList.add('show');

  setTimeout(() => {
    messageContainer.classList.remove('show');
    setTimeout(() => {
      messageContainer.classList.add('hidden');
    }, 500);
  }, duration);
};

export default createMessage;
