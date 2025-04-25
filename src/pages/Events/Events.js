import './events.css';
import checkUserEvent from '../../handlers/attendHandler';
import attachEventListeners from '../../handlers/eventHandlers';
import handleStorageOnWindowClose from '../../handlers/storageHandler';
import resetPassword from '../../components/ResetPassword/resetPassword';

const eventTemplate = () => {
  handleStorageOnWindowClose();
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

export const attendToEvent = async (eventId) => {
  try {
    const { id: userId, token } = JSON.parse(localStorage.getItem('user'));

    console.log(userId);

    const response = await fetch(
      `http://localhost:3000/api/v1/events/${eventId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          participants: userId
        })
      }
    );

    console.log(response);

    if (response.ok) {
      console.log('Asistente añadido al evento');
    } else {
      console.error('Error al añadir asistente al evento');
    }
  } catch (error) {
    console.log('Error inesperado', error);
  }
};

const getEvents = async () => {
  const ul = document.querySelector('.navBar > ul');

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

    if (!localStorage.getItem('user')) {
      // <img class="event-img" src=${event.img} alt=${event.title}/>
      // <p class="description">${event.description}</p>
      // <p class="participants">Asistentes: ${event.participants
      //   .map((p) => p.nameUser)
      //   .join(', ')}</p>

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
      <button class="attend" data-event-id="${event._id}">Asistir</button>
          `;
      eventsContainer.appendChild(liEvent);

      const user = JSON.parse(localStorage.getItem('user'));
      const userId = user.id;
      checkUserEvent(event.participants, userId, event._id);
      attachEventListeners();
    }
  }

  const liEventsIn = document.querySelectorAll('.li-event-in');
  console.log(liEventsIn);
  for (const li of liEventsIn) {
    li.addEventListener('click', (e) => {
      console.log(e.target.innerText);
    });
  }
};

const Events = () => {
  document.querySelector('main').innerHTML = eventTemplate();
  getEvents();

  const pathParts = window.location.pathname.split('/');
  const token = pathParts[3];

  if (token) {
    const resetModal = document.querySelector('#reset-modal');
    resetModal?.showModal();
    resetPassword(token);
  }
};

export default Events;

//! Quitar la imagen, solo aparezca cuando hacemos click en el evento para ver mas detalles junto a los participantes y la descripcion. Quitarse de un evento debe ser en el perfil del usuario que será una pagina. Implementar que el fondo del dia sea verde si la fecha es hoy o futuro y si es un evento pasado que el fondo sea rojizo y se pierda el hover del evento.

//! Implementar la modificacion de la contraseña en el modal del perfil: ultima contraseña, contraseña y repetir contraseña

//!  <li class="modify-event">Modificar Evento</li>
//  case 'modify-event':
//           const modifyEventModal = document.querySelector('#event-modal');
//           const allinputs = document.querySelectorAll('form input');
//           const modalTitle = document.querySelector('#event-form h2');

//           modalTitle.textContent = 'Modificar Evento';
//           allinputs.forEach((el) => el.removeAttribute('required'));

//           modifyEvent();
//           modifyEventModal.showModal();

//           //! Esto es mejor en cada evento??? o teniendo la lista de eventos modificar/eliminar eventos solo lo tendrá el admin y será en la lista de eventos
