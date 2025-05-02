import createButton from '../CreateButton/createButton';

const newModalEvent = (title) => {
  return `
  <dialog  id="event-modal">
  <form id="event-form" method="dialog">
    <h2>${title}</h2>
<label for="event-title">Título del Evento:</label>
    <input type="text" id="event-title" name="event-title" placeholder="Título" required />
    <label for="eventImgInput">Portada del Evento:</label>
    <input
      type="file"
      id="eventImgInput"
      accept="image/*" />
      <label for="event-date">Fecha del Evento:</label>
      <input type="date" id="event-date" required />
      <label for="event-location">Localización del Evento:</label>
      <input type="text" id="event-location" required />
      <label for="event-description">Descripción del Evento:</label>
      <textarea id="event-description"></textarea>
  </form>
</dialog>`;
};

const createEventModal = () => {
  const divInfoUser = document.querySelector('.info-user');

  divInfoUser.insertAdjacentHTML(
    'beforeend',
    newModalEvent('Crear Nuevo Evento')
  );

  const eventForm = document.querySelector('#event-form');
  createButton({
    parentNode: eventForm,
    text: 'Crear Evento',
    classNameType: 'primary',
    id: 'eventBtnGo'
  });
  createButton({
    parentNode: eventForm,
    text: 'Cancelar',
    classNameType: 'secondary',
    id: 'close-event-modal'
  });
};

export default createEventModal;
