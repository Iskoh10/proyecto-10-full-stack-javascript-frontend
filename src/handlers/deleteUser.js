import createSpinner from '../components/Loader/loader';
import createMessage from '../components/Message/message';
import Profile from '../pages/Profile/profile';

const deleteUser = async (userId) => {
  const { token } = JSON.parse(localStorage.getItem('user'));

  try {
    createSpinner('Eliminando al usuario...');

    const response = await fetch(
      `http://localhost:3000/api/v1/users/${userId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    );

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
