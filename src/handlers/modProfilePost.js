import createMessage from '../components/Message/message';
import Profile from '../pages/Profile/profile';
import apiRequest from './apiRequest';

const modProfilePost = async () => {
  const inputName = document.querySelector('#mod-username');
  const inputEmail = document.querySelector('#mod-email');
  const inputPassword = document.querySelector('#mod-password');
  const labelRePassword = document.querySelector('.label-re-pass');
  const inputRePassword = document.querySelector('#mod-repeat-password');

  if (inputPassword.value !== inputRePassword.value) {
    labelRePassword.style.color = 'red';
    createMessage('Las contraseñas no coinciden');
  } else {
    const { id: userId, token } = JSON.parse(localStorage.getItem('user'));

    const updateData = {};

    if (inputName.value.trim()) {
      updateData.nameUser = inputName.value.trim();
    }

    if (inputEmail.value.trim()) {
      updateData.email = inputEmail.value.trim();
    }

    if (inputPassword.value.trim()) {
      updateData.password = inputPassword.value.trim();
    }

    try {
      const response = await apiRequest({
        method: 'PUT',
        url: `v1/users/${userId}`,
        token,
        body: updateData
      });

      const userData = await response.json();

      if (response.ok) {
        const updatedUser = {
          ...JSON.parse(localStorage.getItem('user')),
          ...updateData
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        Profile();
        createMessage('Perfil Actualizado');
      } else {
        createMessage('Error al actualizar el Perfil', userData.message);
      }
    } catch (error) {
      createMessage('Error en la Conexión', error.message);
    }
  }
};

export default modProfilePost;
