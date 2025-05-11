import createMessage from '../components/Message/message';

const leaveEvent = async (eventId) => {
  const { id: userId, token } = JSON.parse(localStorage.getItem('user'));

  try {
    const response = await fetch(
      `http://localhost:3000/api/v1/events/${eventId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          participants: userId,
          leave: true
        })
      }
    );

    const dataRes = response.json();

    if (response.ok) {
      createMessage('Has sido eliminado del evento correctamente');
    } else {
      createMessage('Error al eliminarte del evento', dataRes.message);
    }
  } catch (error) {
    console.log('Error inesperado', error);
  }
};

export default leaveEvent;
