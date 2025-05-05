import eventCard from '../components/EventCard/eventCard';
import attendToEvent from './attendToEvent';
import getEventDetails from './getEventById';
import leaveEvent from './leaveEvent';

// const updateEventDetails = async (eventId) => {
//   const newEventData = await getEventDetails(eventId);
//   eventCard(newEventData);
// };

const handleAttendClick = async (e) => {
  e.stopPropagation();
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

  // await updateEventDetails(eventId);
};

const attachEventListeners = () => {
  document.querySelectorAll('.attend').forEach((btn) => {
    btn.addEventListener('click', handleAttendClick);
  });
};

export default attachEventListeners;
