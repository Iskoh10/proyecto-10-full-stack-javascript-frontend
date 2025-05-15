import createSpinner from '../components/Loader/loader';
import createMessage from '../components/Message/message';
import Events from '../pages/Events/Events';
import apiRequest from './apiRequest';

const deleteEvent = async (event) => {
  const { token } = JSON.parse(localStorage.getItem('user'));

  try {
    createSpinner('Eliminando Evento');

    const response = await apiRequest({
      method: 'DELETE',
      url: `v1/events/${event}`,
      token
    });

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
      createMessage('Error en la eliminación del evento', data.message);
      createSpinner('close');
    }
  } catch (error) {
    createMessage(`Error en la red: ${error.message}`);
    createSpinner('close');
  }
};

export default deleteEvent;
