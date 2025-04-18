import Events, { attendToEvent } from '../pages/Events/Events';

const handleAttendClick = async (e) => {
  e.preventDefault();
  const btn = e.target;
  const eventId = btn.dataset.eventId;

  btn.classList.add('animate-attend');
  btn.innerHTML = '❤️‍🔥 Asistiré';
  btn.disabled = true;

  await attendToEvent(eventId);
  Events();
};

const attachEventListeners = () => {
  document.querySelectorAll('.attend').forEach((btn) => {
    btn.addEventListener('click', handleAttendClick);
  });
};

export default attachEventListeners;
