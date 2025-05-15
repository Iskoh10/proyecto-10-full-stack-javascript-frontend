import createSpinner from '../components/Loader/loader';
import createMessage from '../components/Message/message';
import Events from '../pages/Events/Events';
import apiRequest from './apiRequest';

const deleteAccount = async () => {
  const { id: userId, token } = JSON.parse(localStorage.getItem('user'));

  try {
    createSpinner('Eliminando tu cuenta');

    const response = await apiRequest({
      method: 'DELETE',
      url: `v1/users/${userId}`,
      token
    });

    const dataRes = await response.json();

    if (response.ok) {
      createSpinner('close');
      localStorage.removeItem('user');
      document.querySelector('main').innerHTML = '';
      Events();
      createMessage(`Tu cuenta fue eliminada, ${user.name}`);
      return;
    } else {
      createSpinner('close');
      createMessage('No se pudo eliminar tu cuenta', dataRes.message);
    }
  } catch (error) {
    createSpinner('close');
    createMessage('Error en la conexión a la red', error.message);
  }
};

export default deleteAccount;
