import createSpinner from '../components/Loader/loader';
import createMessage from '../components/Message/message';
import apiRequest from './apiRequest';
import renderSortedEvents from './renderSortedEvents';

const eventsSortBy = async (sort, text) => {
  const { token } = JSON.parse(localStorage.getItem('user'));

  try {
    createSpinner('Ordenando...');
    const response = await apiRequest({
      method: 'GET',
      url: `v1/events/sorted?sort=${sort}`,
      token
    });
    // const response = await fetch(
    //   `http://localhost:3000/api/v1/events/sorted?sort=${sort}`,
    //   {
    //     method: 'GET',
    //     headers: {
    //       Authorization: `Bearer ${token}`
    //     }
    //   }
    // );

    const sortedEvents = await response.json();

    if (response.ok) {
      createSpinner('close');
      renderSortedEvents(sortedEvents);
      createMessage(`Eventos ordenados ${text.toLowerCase()}`);
    } else {
      createSpinner('close');
      createMessage('Error al ordenar los eventos', sortedEvents.message);
    }
  } catch (error) {
    createSpinner('close');
    createMessage('Error en la conexión', error.message);
  }
};

export default eventsSortBy;
