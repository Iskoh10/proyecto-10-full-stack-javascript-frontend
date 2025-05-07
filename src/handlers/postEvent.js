import createSpinner from '../components/Loader/loader';
import createMessage from '../components/Message/message';
import Events from '../pages/Events/Events';

let listenerExist = false;

const CreateEvent = async () => {
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

      const res = await fetch('http://localhost:3000/api/v1/events', {
        method: 'POST',
        headers: {
          authorization: `Bearer ${token}`
        },
        body: formData
      });

      if (res.ok) {
        createSpinner('close');
        Events();
        createMessage('Evento Creado con éxito');
      } else {
        const errorData = await res.json();
        createSpinner('close');
        createMessage('Error al publicar el nuevo Evento:', errorData);
      }
    } catch (error) {
      createSpinner('close');
      createMessage(`Error en la conexión: ${error.message}`);
    }
  });
};

export default CreateEvent;
