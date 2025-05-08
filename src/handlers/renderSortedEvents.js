import createButton from '../components/CreateButton/createButton';
import eventCard from '../components/EventCard/eventCard';
import deleteEvent from './deleteEvent';
import attachEventListeners from './eventHandlers';

const renderSortedEvents = (sortedEvents) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const eventsContainer = document.querySelector('#events-container');
  eventsContainer.innerHTML = '';

  for (const event of sortedEvents) {
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

    if (user.rol === 'admin') {
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
  }

  const deleteEventBtns = document.querySelectorAll('.delete-event-btn');
  deleteEventBtns.forEach((deleteEventBtn) => {
    deleteEventBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      deleteEvent(e.target.offsetParent.eventData._id);
    });
  });

  const liEventsIn = document.querySelectorAll('.li-event-in');

  for (const li of liEventsIn) {
    li.addEventListener('click', () => {
      const event = li.eventData;
      eventCard(event._id);
    });
  }
};

export default renderSortedEvents;
