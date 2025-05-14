import createSpinner from '../components/Loader/loader';
import createMessage from '../components/Message/message';
import Events from '../pages/Events/Events';
import apiRequest from './apiRequest';

let listenerExist = false;

const createEvent = async () => {
  const createEventBtn = document.querySelector('#eventBtnGo');
  if (listenerExist) return;

  listenerExist = true;

  createEventBtn.addEventListener('click', async () => {
    const modalEvent = document.querySelector('#event-modal');
    const eventTitle = document.querySelector('#event-title');
    const eventImg = document.querySelector('#eventImgInput');
    const eventDate = document.querySelector('#event-date');
    const eventLocation = document.querySelector('#event-location');
    const eventDescription = document.querySelector('#event-description');

    const fileImg = eventImg.files[0];

    if (!fileImg) {
      createMessage('Selecciona una imagen');
      return;
    }

    modalEvent.close();

    const formData = new FormData();
    formData.append('title', eventTitle.value);
    formData.append('img', fileImg);
    formData.append('date', eventDate.value);
    formData.append('location', eventLocation.value);
    formData.append('description', eventDescription.value);

    try {
      createSpinner('Creando nuevo Evento');
      const { token } = JSON.parse(localStorage.getItem('user'));

      const response = await apiRequest({
        method: 'POST',
        url: 'v1/events',
        token,
        formData: formData
      });
      // const res = await fetch('http://localhost:3000/api/v1/events', {
      //   method: 'POST',
      //   headers: {
      //     authorization: `Bearer ${token}`
      //   },
      //   body: formData
      // });

      const dataRes = await response.json();

      if (response.ok) {
        createSpinner('close');
        Events();
        createMessage('Evento Creado con éxito');
      } else {
        createSpinner('close');
        createMessage('Error al publicar el nuevo Evento:', dataRes.message);
      }
    } catch (error) {
      createSpinner('close');
      createMessage(`Error en la conexión: ${error}`);
    }
  });
};

export default createEvent;
