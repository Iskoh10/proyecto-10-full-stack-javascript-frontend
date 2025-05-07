import createSpinner from '../components/Loader/loader';
import createMessage from '../components/Message/message';
import Events from '../pages/Events/Events';

const deleteEvent = async (event) => {
  const { token } = JSON.parse(localStorage.getItem('user'));

  try {
    createSpinner('Eliminando Evento');
    const response = await fetch(
      `http://localhost:3000/api/v1/events/${event}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    );

    const data = await response.json();

    if (response.ok) {
      const eventElement = document.querySelector(`[data-event-id="${event}"]`);
      if (eventElement) {
        eventElement.remove();
      }
      createSpinner('close');
      Events();
      createMessage('Evento Eliminado con éxito');
    } else {
      createMessage('Error en la eliminación del evento', data);
      createSpinner('close');
    }
  } catch (error) {
    createMessage(`Error en la red: ${error.message}`);
    createSpinner('close');
  }
};

export default deleteEvent;
