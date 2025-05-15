import createSpinner from '../components/Loader/loader';
import createMessage from '../components/Message/message';
import apiRequest from './apiRequest';

const updatePassword = async (tokenUrl) => {
  const newPassword = document.querySelector('#new-password');
  const reNewPassword = document.querySelector('#renew-password');
  const resetModal = document.querySelector('#reset-modal');

  if (newPassword.value === reNewPassword.value) {
    createSpinner('Actualizando tu contraseña');

    try {
      const response = await apiRequest({
        method: 'POST',
        url: `auth/reset-password/${tokenUrl}`,
        body: { password: newPassword.value }
      });

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
      createMessage('Error de conexión con el servidor ❌', error.message);
    }
  } else {
    createSpinner('close');
    createMessage('Las contraseñas no coinciden');
  }
};

export default updatePassword;
