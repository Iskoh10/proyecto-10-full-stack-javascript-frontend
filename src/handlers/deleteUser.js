import createSpinner from '../components/Loader/loader';
import createMessage from '../components/Message/message';
import Profile from '../pages/Profile/profile';
import apiRequest from './apiRequest';

const deleteUser = async (userId) => {
  const { token } = JSON.parse(localStorage.getItem('user'));

  try {
    createSpinner('Eliminando al usuario...');

    const response = await apiRequest({
      method: 'DELETE',
      url: `v1/users/${userId}`,
      token
    });

    const dataRes = response.json();

    if (response.ok) {
      createSpinner('close');
      Profile();
      createMessage('Usuario eliminado con éxito');
    } else {
      createSpinner('close');
      createMessage('Error en la eliminación del usuario', dataRes.message);
    }
  } catch (error) {
    createSpinner('close');
    createMessage('Error en la conexión', error.message);
  }
};

export default deleteUser;
