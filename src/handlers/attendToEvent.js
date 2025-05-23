import createMessage from '../components/Message/message';
import apiRequest from './apiRequest';

const attendToEvent = async (eventId) => {
  try {
    const { id: userId, token } = JSON.parse(localStorage.getItem('user'));

    const response = await apiRequest({
      method: 'PUT',
      url: `v1/events/${eventId}`,
      token,
      body: { participants: userId }
    });

    if (response.ok) {
      createMessage('Has sido añadido correctamente');
    } else {
      createMessage('Error, no has sido añadido al evento');
    }
  } catch (error) {
    createMessage('Error inesperado', error);
  }
};

export default attendToEvent;
