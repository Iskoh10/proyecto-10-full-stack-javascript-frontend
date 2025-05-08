import './events.css';
import resetPassword from '../../components/ResetPassword/resetPassword';
import getEvents from '../../handlers/getEvents';
import createFooter from '../../components/Footer/footer';

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

  const user = JSON.parse(localStorage.getItem('user'));

  if (user) {
    const welcomeContainer = document.querySelector('.welcome-container');
    const select = document.createElement('select');
    select.id = 'sort-by-date';
    const optionDate = document.createElement('option');
    optionDate.value = 'date';
    optionDate.textContent = 'Por fecha';
    const optionOther = document.createElement('option');

    select.appendChild(optionDate);
    welcomeContainer.appendChild(select);
    console.log(welcomeContainer);

    //! Hacer el select de ordenar eventos
  }

  getEvents();

  createFooter();
};

export default Events;

//!  Implementar que el fondo del dia sea verde si la fecha es hoy o futuro y si es un evento pasado que el fondo sea rojizo y se pierda el hover del evento.

//           //! Esto es mejor en cada evento??? o teniendo la lista de eventos modificar/eliminar eventos solo lo tendrá el admin y será en la lista de eventos
