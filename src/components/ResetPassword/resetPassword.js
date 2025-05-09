import './resetPassword.css';
import createModalReset from '../CreateReset/createReset';
import updatePassword from '../../handlers/updatePassword';

const resetPassword = (token) => {
  createModalReset();

  const resetModal = document.querySelector('#reset-modal');
  const updatePassBtn = document.querySelector('.update-pass-btn');
  const closeResetBtn = document.querySelector('#close-reset');

  if (resetModal) {
    resetModal.showModal();
  }

  updatePassBtn.addEventListener('click', () => {
    updatePassword(token);
  });

  closeResetBtn?.addEventListener('click', () => {
    resetModal.close();
  });
};

export default resetPassword;
