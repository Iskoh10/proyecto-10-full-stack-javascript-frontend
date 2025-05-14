import createSpinner from '../components/Loader/loader';
import createMessage from '../components/Message/message';
import apiRequest from './apiRequest';

const getUserById = async () => {
  const { id: userId, token } = JSON.parse(localStorage.getItem('user'));

  try {
    createSpinner('Cargando tu perfil');

    const response = await apiRequest({
      method: 'GET',
      url: `v1/users/${userId}`,
      token
    });

    const user = await response.json();

    if (response.ok) {
      createSpinner('close');
      const h2NameUser = document.querySelector('.nameUser');
      const pEmailUser = document.querySelector('.emailUser');

      const userImg = document.querySelector('.user-img');
      userImg.src = user.img;

      h2NameUser.textContent = user.nameUser;
      pEmailUser.textContent = user.email;
    } else {
      createSpinner('close');
      createMessage('No se pudo cargar tu perfil', user.message);
    }
  } catch (error) {
    createSpinner('close');
    createMessage('Error en la conexión,', error.message);
  }
};

export default getUserById;
