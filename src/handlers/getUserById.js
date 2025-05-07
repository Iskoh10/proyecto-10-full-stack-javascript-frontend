import createSpinner from '../components/Loader/loader';
import createMessage from '../components/Message/message';

const getUserById = async () => {
  const { id: userId, token } = JSON.parse(localStorage.getItem('user'));

  try {
    createSpinner('Cargando tu perfil');
    const userData = await fetch(
      `http://localhost:3000/api/v1/users/${userId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`
        }
      }
    );

    const user = await userData.json();

    if (userData.ok) {
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
