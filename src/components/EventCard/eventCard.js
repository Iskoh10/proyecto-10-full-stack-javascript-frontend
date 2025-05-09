import './eventCard.css';
import getEventDetails from '../../handlers/getEventById';
import createButton from '../CreateButton/createButton';
import createModal from '../CreateModal/createModal';

const eventCard = async (eventId) => {
  const event = await getEventDetails(eventId);

  const sectionEvents = document.querySelector('#events');

  const oldModalEvent = document.querySelector('#event-details');

  if (oldModalEvent) {
    oldModalEvent.remove();
  }

  createModal({
    parentNode: sectionEvents,
    id: 'event-details'
  });

  const modal = document.querySelector('#event-details');

  modal.innerHTML = `
  <div class="modal-content flex-container">
    <h2>${event.title}</h2>
    <div class="img-container">
      <img class="event-img" src=${event.img} alt=${event.title}/>
    </div>
    <p class="description">${event.description}</p>
    <p class="participants">Asistentes: ${event.participants
      .map((p) => p.nameUser)
      .join(', ')}</p>
  </div>
`;

  modal.showModal();

  const modalContent = document.querySelector('.modal-content');

  createButton({
    parentNode: modalContent,
    text: 'Salir',
    classNameType: 'secondary',
    className: 'close-event-btn'
  });

  const closeBtn = document.querySelector('.close-event-btn');
  closeBtn.addEventListener('click', () => {
    modal.close();
  });
};

export default eventCard;
