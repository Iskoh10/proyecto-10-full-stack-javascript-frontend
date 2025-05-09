import './events.css';
import resetPassword from '../../components/ResetPassword/resetPassword';
import getEvents from '../../handlers/getEvents';
import createFooter from '../../components/Footer/footer';
import createSelectSort from '../../components/CreateSelectSort/createSelectSort';

const eventTemplate = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return `
<section id="events">
<div class="welcome-container">
${
  user
    ? `<h3>Bienvenid@ ${user.name}</h3>`
    : `<h3>➡️ Registrate, por favor ⬅️</h3>`
}
</div>
<ul id="events-container" class="flex-container"></ul>
</section>
`;
};

const Events = () => {
  document.querySelector('main').innerHTML = eventTemplate();

  const pathParts = window.location.pathname.split('/');
  const token = pathParts[3];

  setTimeout(() => {
    if (token) {
      resetPassword(token);
    }
  }, 0);

  createSelectSort();

  getEvents();

  createFooter();
};

export default Events;
