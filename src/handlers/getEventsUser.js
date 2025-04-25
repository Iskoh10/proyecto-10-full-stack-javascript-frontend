const getEventsUser = async () => {
  const { id, token } = JSON.parse(localStorage.getItem('user'));

  try {
    const events = await fetch(
      `http://localhost:3000/api/v1/events/user/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    );

    const eventsUser = await events.json();

    const attendingEventContainer = document.querySelector('#attending-events');
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
  } catch (error) {
    console.error('Error en la petición de eventos reservados:', error);
  }
};

export default getEventsUser;
