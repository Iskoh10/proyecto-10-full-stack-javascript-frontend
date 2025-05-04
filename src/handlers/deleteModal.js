import createButton from '../components/CreateButton/createButton';
import deleteAccount from './deleteAccount';

const createDeleteModal = () => `
<dialog id="delete-modal" class="flex-container">
  <div class="delete-modal-inner flex-container">
    <h2>Eliminar Cuenta</h2>
    <p>¿Desea eliminar su cuenta?</p>
  </div>
</dialog>

<dialog id="confirm-delete-modal" class="flex-container">
<div class="inner-confirm-delete-modal flex-container">
<h2>¡ADVERTENCIA!</h2>
<p>¿Estás a punto de eliminar tu cuenta?</p>
</div>
</dialog>
`;

const modalDeleteAccount = () => {
  const divInfoUser = document.querySelector('.info-user');

  divInfoUser.insertAdjacentHTML('beforeend', createDeleteModal());
  const deleteModalInner = document.querySelector('.delete-modal-inner');
  const deleteModal = document.querySelector('#delete-modal');

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
  const confirmDeleteModal = document.querySelector('#confirm-delete-modal');

  deleteAccountBtn.addEventListener('click', () => {
    confirmDeleteModal.showModal();
  });

  closeDeleteBtn.addEventListener('click', () => {
    deleteModal.close();
  });

  const innerConfirmDelModal = document.querySelector(
    '.inner-confirm-delete-modal'
  );

  createButton({
    parentNode: innerConfirmDelModal,
    text: 'Sí',
    classNameType: 'secondary',
    className: 'delete-yes-btn'
  });

  createButton({
    parentNode: innerConfirmDelModal,
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
    confirmDeleteModal.close();
    deleteModal.close();
  });
};

export default modalDeleteAccount;
