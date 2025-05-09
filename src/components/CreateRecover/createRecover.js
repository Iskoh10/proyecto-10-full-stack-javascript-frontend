import createButton from '../CreateButton/createButton';
import createModal from '../CreateModal/createModal';
import sendEmail from '../ForgotPassword/forgotPassword';
import './createRecover.css';

const createRecover = () => {
  const loginSection = document.querySelector('.login');

  createModal({
    parentNode: loginSection,
    id: 'recover-modal'
  });

  const modalRecover = document.querySelector('#recover-modal');

  modalRecover.innerHTML = `
  <div class="modal-container">
    <form method="post" class="recover-form flex-container">
      <h2>Recuperar contraseña</h2>
      <label for="emailrec">Introduce tu correo:</label>
      <input type="email" id="emailrec" name="emailrec" placeholder="email">
    </form>
  </div>
  `;

  const recoverForm = document.querySelector('.recover-form');

  createButton({
    parentNode: recoverForm,
    text: 'Recuperar contraseña',
    classNameType: 'primary',
    className: 'recover-btn'
  });

  const recoverBtn = document.querySelector('.recover-btn');
  recoverBtn.type = 'submit';

  recoverBtn.addEventListener('click', () => {
    sendEmail();
  });

  createButton({
    parentNode: recoverForm,
    text: 'Cerrar',
    classNameType: 'secondary',
    id: 'close-dialog'
  });

  const openModal = document.querySelector('#recover-password');
  const modal = document.querySelector('#recover-modal');
  const closeBtn = document.querySelector('#close-dialog');

  openModal?.addEventListener('click', (e) => {
    e.preventDefault();
    modal.showModal();
  });

  closeBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    modal.close();
  });
};

export default createRecover;
