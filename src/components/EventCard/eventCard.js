import './eventCard.css';
const eventCard = (event) => {
  const sectionEvents = document.querySelector('#events');

  const oldModalEvent = document.querySelector('#event-details');

  if (oldModalEvent) {
    oldModalEvent.remove();
  }

  const modal = document.createElement('dialog');
  modal.className = 'flex-container';
  modal.setAttribute('id', 'event-details');

  modal.innerHTML = `
  <div class="modal-content">
<h2>${event.title}</h2>
<div class="img-container">
<img class="event-img" src=${event.img} alt=${event.title}/>
</div>
<p class="description">${event.description}</p>
<p class="participants">Asistentes: ${event.participants
    .map((p) => p.nameUser)
    .join(', ')}</p>
</div>
<button class="close-event-btn" type="button"> Salir</button>
`;

  sectionEvents.appendChild(modal);
  modal.showModal();

  const closeBtn = document.querySelector('.close-event-btn');
  closeBtn.addEventListener('click', () => {
    modal.close();
  });
};

export default eventCard;
