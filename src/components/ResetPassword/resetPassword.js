import Login from '../../pages/Login/Login';

const resetPassword = (token) => {
  Login();
  const resetModal = document.querySelector('#reset-modal');
  const resetForm = document.querySelector('#reset-form');
  const closeResetBtn = document.querySelector('#close-reset');

  if (resetModal) {
    resetModal.showModal();
  }

  if (!token) {
    alert('Token no encontrado en la URL');
    return;
  }

  resetForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const newPassword = document.querySelector('#new-password');
    const reNewPassword = document.querySelector('#renew-password');

    console.log(newPassword.value);
    console.log(reNewPassword.value);

    if (newPassword.value === reNewPassword.value) {
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
          createSpinner('Estamos actualizando tu contraseña');
          alert('Contraseña actualizada ✅');
          resetModal.close();
          window.history.replaceState({}, document.title, '/login');
          // window.location.href = '/login';
        } else {
          createSpinner('Algo va mal');
          alert(result.message || 'Error al actualizar la contraseña ❌');
        }
      } catch (error) {
        console.error(error);
        alert('Error de conexión con el servidor ❌');
      }
    } else {
      alert('Las contraseñas no coinciden');
    }
  });
  closeResetBtn?.addEventListener('click', () => resetModal.close());
};

export default resetPassword;
