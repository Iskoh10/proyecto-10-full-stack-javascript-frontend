const attendToEvent = async (eventId) => {
  try {
    const { id: userId, token } = JSON.parse(localStorage.getItem('user'));

    const response = await fetch(
      `http://localhost:3000/api/v1/events/${eventId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          participants: userId
        })
      }
    );

    if (response.ok) {
      console.log('Asistente añadido al evento');
    } else {
      console.error('Error al añadir asistente al evento');
    }
  } catch (error) {
    console.log('Error inesperado', error);
  }
};

export default attendToEvent;
