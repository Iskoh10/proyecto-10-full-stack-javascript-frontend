import createSpinner from '../components/Loader/loader';
import createMessage from '../components/Message/message';

const updatePassword = async (token) => {
  const newPassword = document.querySelector('#new-password');
  const reNewPassword = document.querySelector('#renew-password');
  const resetModal = document.querySelector('#reset-modal');

  if (newPassword.value === reNewPassword.value) {
    createSpinner('Actualizando tu contraseña');

    try {
      const response = await fetch(
        `http://localhost:3000/api/auth/reset-password/${token}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ password: newPassword.value })
        }
      );

      const result = await response.json();

      if (response.ok) {
        createSpinner('close');
        createMessage('Contraseña actualizada ✅');
        resetModal.close();
        window.location.href = '/login';
      } else {
        createMessage('Error al actualizar la contraseña ❌', result.message);
      }
    } catch (error) {
      createSpinner('close');
      createMessage('Error de conexión con el servidor ❌');
    }
  } else {
    createSpinner('close');
    createMessage('Las contraseñas no coinciden');
  }
};

export default updatePassword;
