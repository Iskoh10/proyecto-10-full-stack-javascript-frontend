import Events from '../../pages/Events/Events';
import Login from '../../pages/Login/Login';
import Profile from '../../pages/Profile/profile';
import Register from '../../pages/Register/Register';
import createMessage from '../Message/message';
import './navbar.css';

const createNavbar = () => {
  const divNav = document.querySelector('.div-nav');
  if (!divNav) return console.error('No se encontró el divNav');

  let navBar = document.querySelector('.navBar');

  if (!navBar) {
    navBar = document.createElement('nav');
    navBar.classList.add('navBar', 'flex-container');
    divNav.appendChild(navBar);
  }

  let ul = navBar.querySelector('ul');
  if (!ul) {
    ul = document.createElement('ul');
    ul.classList.add('ul-navBar', 'flex-container');
    navBar.appendChild(ul);
  }

  ul.innerHTML = `
  <li>
    <a id="eventsLink" href="#events">Eventos</a>
  </li>
  ${
    !JSON.parse(localStorage.getItem('user'))
      ? `
  <li>
    <a id="registerLink" href="#register">Registrarse</a>
  </li>
  <li>
    <a id="loginLink" href="#login">Loguearse</a>
  </li>
  `
      : `
  <li>
    <a id="profileLink" href="#profile">Perfil</a>
  </li>
  <li>
    <a id="logoutLink" href="#logout">Salir</a>
  </li>
  `
  }
`;

  navBar
    .querySelector('#eventsLink')
    ?.addEventListener('click', () => Events());

  navBar
    .querySelector('#registerLink')
    ?.addEventListener('click', () => Register());

  navBar.querySelector('#loginLink')?.addEventListener('click', () => {
    Login();
  });

  navBar.querySelector('#profileLink')?.addEventListener('click', () => {
    Profile();
  });

  document.querySelector('#logoutLink')?.addEventListener('click', () => {
    localStorage.removeItem('user');
    document.querySelector('main').innerHTML = '';
    Login();
    createNavbar();
    createMessage('Hasta pronto 🫶!', 5000);
  });
};

export default createNavbar;
