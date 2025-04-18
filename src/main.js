import './style.css';
import Events from './pages/Events/Events';
import createNavbar from './components/Navbar/navbar';

const app = document.querySelector('#app');
app.className = 'flex-container';

const header = document.createElement('header');

const title = document.createElement('h1');
title.textContent = 'Organizador de Eventos';
title.classList.add('main-title', 'flex-container');

const main = document.createElement('main');
main.classList.add('main', 'flex-container');

const footer = document.createElement('footer');
footer.classList.add('footer', 'flex-container');

header.appendChild(title);
app.appendChild(header);
createNavbar();
app.appendChild(main);
app.appendChild(footer);

document.body.appendChild(app);

Events();

//! Añadir un logo, un favicon
