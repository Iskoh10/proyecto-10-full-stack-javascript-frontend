import createMessage from '../components/Message/message';
import Profile from '../pages/Profile/profile';

const modProfilePost = async () => {
  const inputName = document.querySelector('#mod-username');
  const inputEmail = document.querySelector('#mod-email');
  const inputPassword = document.querySelector('#mod-password');
  const labelRePassword = document.querySelector('.label-re-pass');
  const inputRePassword = document.querySelector('#mod-repeat-password');

  if (inputPassword.value !== inputRePassword.value) {
    console.log('No coinciden');
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
      const modProfile = await fetch(
        `http://localhost:3000/api/v1/users/${userId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
          },
          body: JSON.stringify(updateData)
        }
      );

      const userData = await modProfile.json();

      if (modProfile.ok) {
        const updatedUser = {
          ...JSON.parse(localStorage.getItem('user')),
          ...updateData
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        Profile();
        createMessage('Perfil Actualizado');
      } else {
        createMessage('Error al actualizar el Perfil');
      }
    } catch (error) {
      createMessage('Error en la Conexión');
    }
  }
};

export default modProfilePost;
