import './createModal.css';

const createModal = ({ parentNode, className = '', id = '' }) => {
  const dialog = document.createElement('dialog');
  dialog.classList.add('modal');

  if (className) {
    dialog.classList.add(...className.split(' '));
  }

  if (id) {
    dialog.id = id;
  }

  parentNode.appendChild(dialog);
  return dialog;
};

export default createModal;
