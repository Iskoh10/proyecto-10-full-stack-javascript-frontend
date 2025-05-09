import './deleteModal.css';
import createButton from '../CreateButton/createButton';
import createModal from '../CreateModal/createModal';
import deleteAccount from '../../handlers/deleteAccount';

const modalDeleteAccount = () => {
  const divInfoUser = document.querySelector('.info-user');

  createModal({
    parentNode: divInfoUser,
    id: 'delete-modal'
  });

  const modal = document.querySelector('#delete-modal');

  modal.innerHTML = `
  <div class="delete-modal-inner flex-container">
    <h2>Eliminar Cuenta</h2>
    <p>¿Desea eliminar su cuenta?</p>
  </div>
  `;

  createModal({
    parentNode: divInfoUser,
    id: 'confirm-delete-modal'
  });

  const confirmModal = document.querySelector('#confirm-delete-modal');

  confirmModal.innerHTML = `
  <div class="inner-confirm-delete-modal flex-container">
    <h2>¡ADVERTENCIA!</h2>
    <p>¿Estás a punto de eliminar tu cuenta?</p>
    <div class="btn-container flex-container"></div>
</div>
  `;

  const deleteModalInner = document.querySelector('.delete-modal-inner');

  createButton({
    parentNode: deleteModalInner,
    text: 'Eliminar Cuenta',
    classNameType: 'primary',
    className: 'delete-account-btn'
  });

  createButton({
    parentNode: deleteModalInner,
    text: 'Salir',
    classNameType: 'secondary',
    className: 'close-delete-btn'
  });

  const deleteAccountBtn = document.querySelector('.delete-account-btn');
  const closeDeleteBtn = document.querySelector('.close-delete-btn');

  deleteAccountBtn.addEventListener('click', () => {
    confirmModal.showModal();
  });

  closeDeleteBtn.addEventListener('click', () => {
    modal.close();
  });

  const btnContainer = document.querySelector('.btn-container');

  createButton({
    parentNode: btnContainer,
    text: 'Sí',
    classNameType: 'secondary',
    className: 'delete-yes-btn'
  });

  createButton({
    parentNode: btnContainer,
    text: 'No',
    classNameType: 'primary',
    className: 'delete-no-btn'
  });

  const deleteYesBtn = document.querySelector('.delete-yes-btn');
  const deleteNoBtn = document.querySelector('.delete-no-btn');

  deleteYesBtn.addEventListener('click', () => {
    deleteAccount();
  });

  deleteNoBtn.addEventListener('click', () => {
    confirmModal.close();
    modal.close();
  });
};

export default modalDeleteAccount;
