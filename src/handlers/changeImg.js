import createSpinner from '../components/Loader/loader';
import createMessage from '../components/Message/message';
import Profile from '../pages/Profile/profile';
import apiRequest from './apiRequest';

const changeImg = () => {
  const fileInput = document.querySelector('.profileImgInput');
  const makeChangeBtn = document.querySelector('#makeChangeImg');
  const modal = document.querySelector('#changeImg-modal');

  if (!fileInput) {
    console.log('No se encontró el input de la imagen');
  }

  makeChangeBtn?.addEventListener('click', async () => {
    const file = fileInput.files[0];

    if (!file) {
      createMessage('Selecciona una imagen');
      return;
    }

    modal.close();
    createSpinner('Cambiando imagen');

    const formData = new FormData();
    formData.append('img', file);

    const { id: userId, token } = JSON.parse(localStorage.getItem('user'));
    try {
      const response = await apiRequest({
        method: 'PUT',
        url: `v1/users/${userId}`,
        token,
        formData
      });

      if (!response.ok) {
        createMessage('Error al subir la imagen');
      }

      Profile();
      createMessage('Tu imagen se ha actualizado');
    } catch (error) {
      createMessage('Hubo un error para cambiar la imagen');
    }
  });
};

export default changeImg;
