import './createButton.css';

const createButton = ({
  parentNode,
  text,
  classNameType,
  className = '',
  id = ''
}) => {
  const button = document.createElement('button');
  button.textContent = text;
  button.className = 'flex-container';
  button.classList.add(classNameType);
  if (className) {
    button.classList.add(className);
  }

  if (id) {
    button.id = id;
  }
  parentNode.appendChild(button);
  return button;
};

export default createButton;
