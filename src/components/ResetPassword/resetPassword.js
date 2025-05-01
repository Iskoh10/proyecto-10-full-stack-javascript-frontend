import createModalReset from '../../pages/Reset/reset';
import createSpinner from '../Loader/loader';
import createMessage from '../Message/message';

const resetPassword = (token) => {
  createModalReset();
  const resetModal = document.querySelector('#reset-modal');
  const resetForm = document.querySelector('#reset-form');
  const closeResetBtn = document.querySelector('#close-reset');

  if (resetModal) {
    resetModal.showModal();
  }

  if (!token) {
    createMessage('Token no encontrado en la URL');
    return;
  }

  const existingHandler = resetForm.dataset.listenerAdded;
  if (existingHandler) return;
  resetForm.dataset.listenerAdded = 'true';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPassword = document.querySelector('#new-password');
    const reNewPassword = document.querySelector('#renew-password');

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
          window.history.replaceState({}, document.title, '/login');
          // window.location.href = '/login';
        } else {
          createMessage(
            result.message || 'Error al actualizar la contraseña ❌'
          );
        }
      } catch (error) {
        createSpinner('close');
        createMessage('Error de conexión con el servidor ❌');
      }
    } else {
      createMessage('Las contraseñas no coinciden');
    }
  };

  resetForm.addEventListener('submit', handleSubmit);

  closeResetBtn?.addEventListener('click', () => {
    resetModal.close();
    resetForm.removeEventListener('submit', handleSubmit);
    resetForm.removeAttribute('data-listener-added');
  });
};

export default resetPassword;
