import './attendingEvents.css';
import createButton from '../CreateButton/createButton';
import createModal from '../CreateModal/createModal';

const attendingEvents = () => {
  const divInfoUser = document.querySelector('.info-user');

  createModal({
    parentNode: divInfoUser,
    className: 'flex-container',
    id: 'events-modal'
  });

  const modal = document.querySelector('#events-modal');

  modal.innerHTML = `
  <div class="modal-inner flex-container">
    <h2>Eventos Reservados</h2>
    <ul id="attending-events" class="flex-container"></ul>
  </div>`;

  const modalInnerContainer = document.querySelector('.modal-inner');

  createButton({
    parentNode: modalInnerContainer,
    text: 'Salir',
    classNameType: 'secondary',
    className: 'close-events-btn'
  });

  const closeEventsBtn = document.querySelector('.close-events-btn');
  closeEventsBtn.addEventListener('click', () => {
    modal.close();
  });
};

export default attendingEvents;
