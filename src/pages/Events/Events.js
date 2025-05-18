import './events.css';
import resetPassword from '../../components/ResetPassword/resetPassword';
import getEvents from '../../handlers/getEvents';
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

const Events = (e) => {
  if (e) {
    e.preventDefault();
  }

  window.history.pushState('', '', '/events');

  document.querySelector('main').innerHTML = eventTemplate();

  createSelectSort();

  getEvents();
};

export default Events;
