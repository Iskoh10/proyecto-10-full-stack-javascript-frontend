import createSpinner from '../components/Loader/loader';
import createMessage from '../components/Message/message';
import apiRequest from './apiRequest';

const getEventDetails = async (eventId) => {
  const { token } = JSON.parse(localStorage.getItem('user'));
  try {
    createSpinner('Cargando evento...');

    const response = await apiRequest({
      method: 'GET',
      url: `v1/events/${eventId}`,
      token
    });

    const dataEvent = await response.json();

    if (!response.ok) {
      createMessage(
        'Error en la recuperación de los detalles del evento:',
        dataEvent.message
      );
    }

    createSpinner('close');
    return dataEvent;
  } catch (error) {
    createSpinner('close');
    createMessage('Error al obtener detalles del evento:', error.message);
  }
};

export default getEventDetails;
