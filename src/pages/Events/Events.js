import './events.css';
import attachEventListeners from '../../handlers/eventHandlers';
import resetPassword from '../../components/ResetPassword/resetPassword';
import createSpinner from '../../components/Loader/loader';
import eventCard from '../../components/EventCard/eventCard';
import createButton from '../../components/CreateButton/createButton';

const eventTemplate = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return `
<section id="events">
${
  user
    ? `<h3>Bienvenid@ ${user.name}</h3>`
    : `<h3>➡️ Registrate, por favor ⬅️</h3>`
}
<ul id="events-container" class="flex-container"></ul>
</section>
`;
};

const getEvents = async () => {
  createSpinner('Cargando Eventos');
  const eventsData = await fetch('http://localhost:3000/api/v1/events');
  const events = await eventsData.json();
  const eventsContainer = document.querySelector('#events-container');

  for (const event of events) {
    const rawDate = event.date;
    const date = new Date(rawDate);
    const formattedDate = date.toLocaleDateString('es-Es', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    const liEvent = document.createElement('li');
    liEvent.classList.add('li-event', 'flex-container');

    liEvent.eventData = event;

    if (!localStorage.getItem('user')) {
      liEvent.innerHTML = `
      <div class="day flex-container">
      <p>${formattedDate.split('/')[0]}</p>
      </div>
      <div class="data flex-container">
      <h3 class="event-title">${event.title}</h3>
      <div class="event-info flex-container">
       <p class="date">${formattedDate}</p>
      <p class="location">${event.location}</p>
      </div>
      </div>
          `;
      eventsContainer?.appendChild(liEvent);
    } else {
      liEvent.classList.add('li-event-in');
      liEvent.innerHTML = `
      <div class="day flex-container">
      <p>${formattedDate.split('/')[0]}</p>
      </div>
      <div class="data flex-container">
      <h3 class="event-title">${event.title}</h3>
      <div class="event-info flex-container">
      <p class="date">${formattedDate}</p>
      <p class="location">${event.location}</p>
      </div>
      </div>
      `;

      const user = JSON.parse(localStorage.getItem('user'));
      const userId = user.id;
      const alreadyParticipating = event.participants.some(
        (p) => p._id === userId
      );

      const btnAttend = createButton({
        parentNode: liEvent,
        text: 'ASISTIR',
        classNameType: 'primary',
        className: 'attend'
      });
      btnAttend.dataset.eventId = event._id;
      btnAttend.dataset.attending = alreadyParticipating ? 'true' : 'false';
      btnAttend.innerHTML = alreadyParticipating
        ? '❤️‍🔥 Dejar de asistir'
        : 'Asistir';

      eventsContainer.appendChild(liEvent);
    }
    attachEventListeners();
    createSpinner('close');
  }
  const liEventsIn = document.querySelectorAll('.li-event-in');

  for (const li of liEventsIn) {
    li.addEventListener('click', () => {
      const event = li.eventData;
      eventCard(event._id);
    });
  }
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

  getEvents();
};

export default Events;

//!  Implementar que el fondo del dia sea verde si la fecha es hoy o futuro y si es un evento pasado que el fondo sea rojizo y se pierda el hover del evento.

//           //! Esto es mejor en cada evento??? o teniendo la lista de eventos modificar/eliminar eventos solo lo tendrá el admin y será en la lista de eventos
