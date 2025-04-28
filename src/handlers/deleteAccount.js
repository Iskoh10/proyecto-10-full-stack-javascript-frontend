import createSpinner from '../components/Loader/loader';
import createMessage from '../components/Message/message';
import Events from '../pages/Events/Events';

const deleteAccount = async () => {
  const { id: userId, token } = JSON.parse(localStorage.getItem('user'));

  createSpinner('Eliminando tu cuenta');
  try {
    const response = await fetch(
      `http://localhost:3000/api/v1/users/${userId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`
        }
      }
    );

    const dataRes = await response.json();

    if (response.ok) {
      createSpinner('close');
      localStorage.removeItem('user');
      document.querySelector('main').innerHTML = '';
      Events();
      createMessage(`Tu cuenta fué eliminada, ${user.name}`);
      return;
    }
  } catch (error) {
    createMessage('Error al eliminar tu cuenta');
  }
};

export default deleteAccount;
