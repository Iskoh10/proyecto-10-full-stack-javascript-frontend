import './createNewEvent.css';
import createButton from '../CreateButton/createButton';
import createModal from '../CreateModal/createModal';

const createNewEvent = () => {
  const divInfoUser = document.querySelector('.info-user');

  createModal({
    parentNode: divInfoUser,
    id: 'event-modal'
  });

  const modal = document.querySelector('#event-modal');

  modal.innerHTML = `
    <div class="modal-content flex-container">
      <form id="event-form" method="dialog">
        <h2>Crear Nuevo Evento</h2>
        <label for="event-title">Título del Evento:</label>
        <input type="text" id="event-title" name="event-title" placeholder="Título" required />
        <label for="eventImgInput">Portada del Evento:</label>
        <input type="file" id="eventImgInput" accept="image/*" />
        <label for="event-date">Fecha del Evento:</label>
        <input type="date" id="event-date" required />
        <label for="event-location">Localización del Evento:</label>
        <input type="text" id="event-location" required />
        <label for="event-description">Descripción del Evento:</label>
        <textarea id="event-description"></textarea>
      </form>
    </div>`;

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

  const closeBtnEvent = document.querySelector('#close-event-modal');

  closeBtnEvent.addEventListener('click', () => {
    const eventForm = document.querySelector('#event-form');
    eventForm.reset();
    modal.close();
  });

  const textArea = document.querySelector('#event-description');

  textArea.addEventListener('input', () => {
    textArea.style.height = 'auto';
    textArea.style.height = `${textArea.scrollHeight}px`;
  });
};

export default createNewEvent;
