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

    if (response.ok) {
      console.log('Asistente eliminado del evento');
    } else {
      console.error('Error al eliminar al asistente del evento');
    }
  } catch (error) {
    console.log('Error inesperado', error);
  }
};

export default leaveEvent;
