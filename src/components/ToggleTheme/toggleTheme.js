import './toggleTheme.css';

const createToggle = (parentNode) => {
  const divContainer = document.createElement('div');
  divContainer.classList.add('toggle-container');

  const divSunMoon = document.createElement('div');
  divSunMoon.classList.add('sun-moon');

  divContainer.appendChild(divSunMoon);
  parentNode.appendChild(divContainer);

  const divToggle = document.querySelector('.toggle-container');
  divToggle.addEventListener('click', () => {
    const body = document.querySelector('body');
    body.classList.toggle('night');

    const logo = document.querySelector('.img-logo');

    if (body.classList.contains('night')) {
      logo.src = 'src/assets/darkLogo.png';
    } else {
      logo.src = 'src/assets/lightLogo.png';
    }
  });
};

export default createToggle;
