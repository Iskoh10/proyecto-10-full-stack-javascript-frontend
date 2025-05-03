import createButton from '../components/CreateButton/createButton';

const createAttendEventsModal = () => `
<dialog id="events-modal" class="flex-container">
<div class="modal-inner flex-container">
<h2>Eventos Reservados</h2>
<ul id="attending-events" class="flex-container"></ul>
</div>
</dialog>`;

const attendingEvents = () => {
  const divInfoUser = document.querySelector('.info-user');
  divInfoUser.insertAdjacentHTML('beforeend', createAttendEventsModal());
  const attendingEventModal = document.querySelector('#events-modal');
  const modalInnerContainer = document.querySelector('.modal-inner');

  createButton({
    parentNode: modalInnerContainer,
    text: 'Salir',
    classNameType: 'secondary',
    className: 'close-events-btn'
  });

  const closeEventsBtn = document.querySelector('.close-events-btn');
  closeEventsBtn.addEventListener('click', () => {
    attendingEventModal.close();
  });
};

export default attendingEvents;
