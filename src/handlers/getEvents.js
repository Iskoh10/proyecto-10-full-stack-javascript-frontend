import createButton from '../components/CreateButton/createButton';
import eventCard from '../components/EventCard/eventCard';
import createSpinner from '../components/Loader/loader';
import deleteEvent from './deleteEvent';
import attachEventListeners from './eventHandlers';

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

    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
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
    } else if (user.rol === 'admin') {
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
      <p class="quien">Soy Admin</p>
      </div>
      </div>
      `;
      eventsContainer?.appendChild(liEvent);
      createButton({
        parentNode: liEvent,
        text: 'Eliminar',
        classNameType: 'primary',
        className: 'delete-event-btn'
      });
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
      eventsContainer?.appendChild(liEvent);

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

  const deleteEventBtns = document.querySelectorAll('.delete-event-btn');
  for (const deleteEventBtn of deleteEventBtns) {
    deleteEventBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      console.log(e.target.offsetParent.eventData._id);
      deleteEvent(e.target.offsetParent.eventData._id);
    });
  }

  const liEventsIn = document.querySelectorAll('.li-event-in');

  for (const li of liEventsIn) {
    li.addEventListener('click', () => {
      const event = li.eventData;
      eventCard(event._id);
    });
  }
};

export default getEvents;
