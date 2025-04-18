import './loader.css';

const createSpinner = (message) => {
  let spinner = document.querySelector('#dialog-loader');

  if (message === 'close') {
    if (spinner) spinner.remove();
    return;
  }

  if (spinner) {
    const textWaiting = spinner.querySelector('.text-waiting');
    if (textWaiting) textWaiting.textContent = message;
    return;
  }

  const dialogLoader = document.createElement('dialog');
  dialogLoader.setAttribute('id', 'dialog-loader');
  dialogLoader.classList.add('flex-container');
  const loader = document.createElement('div');
  loader.classList.add('loader');
  const textWaitContainer = document.createElement('div');
  textWaitContainer.classList.add('text-wait-container');
  const textWaiting = document.createElement('p');
  textWaiting.classList.add('text-waiting');
  textWaiting.textContent = `${message}`;

  const main = document.querySelector('main');

  textWaitContainer.appendChild(textWaiting);
  dialogLoader.appendChild(loader);
  dialogLoader.appendChild(textWaitContainer);
  main.appendChild(dialogLoader);
};

export default createSpinner;
