import createMessage from '../components/Message/message';
import apiRequest from './apiRequest';

const leaveEvent = async (eventId) => {
  const { id: userId, token } = JSON.parse(localStorage.getItem('user'));

  try {
    const response = await apiRequest({
      method: 'PUT',
      url: `v1/events/${eventId}`,
      token,
      body: { participants: userId, leave: true }
    });

    const dataRes = response.json();

    if (response.ok) {
      createMessage('Has sido eliminado del evento correctamente');
    } else {
      createMessage('Error al eliminarte del evento', dataRes.message);
    }
  } catch (error) {
    createMessage('Error inesperado', error.message);
  }
};

export default leaveEvent;
