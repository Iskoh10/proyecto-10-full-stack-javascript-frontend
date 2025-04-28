import attendToEvent from './attendToEvent';
import leaveEvent from './leaveEvent';

const handleAttendClick = async (e) => {
  e.preventDefault();
  const btn = e.target;
  const eventId = btn.dataset.eventId;
  const isAttending = btn.dataset.attending === 'true';

  if (isAttending) {
    await leaveEvent(eventId);
    btn.dataset.attending = 'false';
    btn.innerHTML = 'Asistir';
  } else {
    await attendToEvent(eventId);
    btn.dataset.attending = 'true';
    btn.innerHTML = '❤️‍🔥 Dejar de asistir';
  }

  // Events();
};

const attachEventListeners = () => {
  document.querySelectorAll('.attend').forEach((btn) => {
    btn.addEventListener('click', handleAttendClick);
  });
};

export default attachEventListeners;
