import './style.css';
import Events from './pages/Events/Events';
import createNavbar from './components/Navbar/navbar';
import createToggle from './components/ToggleTheme/toggleTheme';
import createFooter from './components/Footer/footer';
import resetPassword from './components/ResetPassword/resetPassword';

const app = document.querySelector('#app');
app.className = 'flex-container';

const header = document.createElement('header');
header.classList.add('header', 'flex-container');

const divLogo = document.createElement('div');
divLogo.classList.add('div-logo', 'flex-container');

const logoImg = document.createElement('img');
logoImg.className = 'img-logo';
logoImg.src = '/darkLogo.png';

logoImg.addEventListener('click', () => Events());

const divNav = document.createElement('div');
divNav.classList.add('div-nav', 'flex-container');

const title = document.createElement('h1');
title.textContent = 'Organizador de Eventos';
title.classList.add('main-title', 'flex-container');

const main = document.createElement('main');
main.classList.add('main', 'flex-container');

const footer = document.createElement('footer');
footer.classList.add('footer', 'flex-container');

divLogo.appendChild(logoImg);
divNav.appendChild(title);
header.appendChild(divLogo);
header.appendChild(divNav);

createToggle(app);

app.appendChild(header);
app.appendChild(main);
app.appendChild(footer);

document.body.appendChild(app);

createNavbar();

const pathParts = window.location.pathname.split('/');
const token = pathParts[3];

setTimeout(() => {
  if (token) {
    resetPassword(token);
  }
}, 0);

Events();

createFooter();

window.addEventListener('beforeunload', () => {
  localStorage.removeItem('user');
});
