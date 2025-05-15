import createSpinner from '../components/Loader/loader';
import createMessage from '../components/Message/message';
import apiRequest from './apiRequest';

const getAllUsers = async () => {
  const { token } = JSON.parse(localStorage.getItem('user'));
  try {
    createSpinner('Cargando a los malotes');
    const response = await apiRequest({
      method: 'GET',
      url: 'v1/users',
      token
    });

    const users = await response.json();

    if (response.ok) {
      createSpinner('close');
      return users;
    } else {
      createSpinner('close');
      createMessage('Hubo un error en la búsqueda', users.message);
    }
  } catch (error) {
    createSpinner('close');
    createMessage('Hubo un error en la conexión', error.message);
  }
};

export default getAllUsers;
