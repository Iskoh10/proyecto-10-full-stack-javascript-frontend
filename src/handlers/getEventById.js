import createSpinner from '../components/Loader/loader';
import createMessage from '../components/Message/message';

const getEventDetails = async (eventId) => {
  try {
    createSpinner('Cargando evento...');
    const { token } = JSON.parse(localStorage.getItem('user'));
    const response = await fetch(
      `http://localhost:3000/api/v1/events/${eventId}`,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (!response.ok) {
      createMessage(`Error HTTP: ${response.status}`);
    }

    const dataEvent = await response.json();
    createSpinner('close');
    return dataEvent;
  } catch (error) {
    console.error('Error al obtener detalles del evento:', error);
    return null;
  }
};

export default getEventDetails;
