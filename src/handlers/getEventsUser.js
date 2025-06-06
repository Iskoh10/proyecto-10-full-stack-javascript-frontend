import createMessage from '../components/Message/message';
import createSpinner from '../components/Loader/loader';
import apiRequest from './apiRequest';

const getEventsUser = async () => {
  const { id: userId, token } = JSON.parse(localStorage.getItem('user'));

  try {
    createSpinner('Cargando tus próximos eventos');

    const response = await apiRequest({
      method: 'GET',
      url: `v1/events/user/${userId}`,
      token
    });

    const eventsUser = await response.json();

    if (response.ok) {
      const attendingEventContainer =
        document.querySelector('#attending-events');
      attendingEventContainer.innerHTML = '';
      for (const event of eventsUser) {
        const rawDate = event.date;
        const date = new Date(rawDate);
        const formattedDate = date.toLocaleDateString('es-Es', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });

        const liEvent = document.createElement('li');
        liEvent.classList.add('li-event-user', 'flex-container');

        const titleEvent = document.createElement('h2');
        titleEvent.textContent = event.title;

        const infoEventResume = document.createElement('div');
        infoEventResume.classList.add('info-event-resume', 'flex-container');

        const pDate = document.createElement('p');
        pDate.textContent = formattedDate;
        const pLocation = document.createElement('p');
        pLocation.textContent = event.location;

        infoEventResume.appendChild(pDate);
        infoEventResume.appendChild(pLocation);

        liEvent.appendChild(titleEvent);
        liEvent.appendChild(infoEventResume);
        attendingEventContainer.appendChild(liEvent);
      }
      createSpinner('close');
    } else {
      createSpinner('close');
      createMessage('Hubo un error en tu lista de eventos');
    }
  } catch (error) {
    createSpinner('close');
    createMessage('Error en la petición de eventos reservados:', error.message);
  }
};

export default getEventsUser;
