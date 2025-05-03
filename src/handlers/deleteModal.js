import createButton from '../components/CreateButton/createButton';

const createDeleteModal = () => `
<dialog id="delete-modal" class="flex-container">
<div class="delete-modal-inner flex-container">
<h2>Eliminar Cuenta</h2>
<p>¿Desea eliminar su cuenta?</p>

<dialog id="confirm-delete-modal" class="flex-container">
<h2>¡ADVERTENCIA!</h2>
<p>¿Estás a punto de eliminar tu cuenta?</p>
</dialog>
</div>
</dialog>
`;

//! Trabajar el css del modal de eliminar cuenta

const deleteAccount = () => {
  const divInfoUser = document.querySelector('.info-user');
  divInfoUser.insertAdjacentHTML('beforeend', createDeleteModal());
  const deleteModal = document.querySelector('#delete-modal');

  createButton({
    parentNode: deleteModal,
    text: 'Eliminar Cuenta',
    classNameType: 'primary',
    className: 'delete-account-btn'
  });

  createButton({
    parentNode: deleteModal,
    text: 'Salir',
    classNameType: 'secondary',
    className: 'close-delete-btn'
  });

  const deleteAccountBtn = document.querySelector('.delete-account-btn');
  const closeDeleteBtn = document.querySelector('.close-delete-btn');

  deleteAccountBtn.addEventListener('click', () => {
    // deleteAccount();
    confirmDeleteModal.showModal();
    console.log(
      'Crear un nuevo modal donde se le advierta, ¿Estás a punto de borrar tu cuenta estás seguro? si no'
    );
  });

  closeDeleteBtn.addEventListener('click', () => {
    deleteModal.close();
  });

  const confirmDeleteModal = document.querySelector('#confirm-delete-modal');

  createButton({
    parentNode: confirmDeleteModal,
    text: 'Sí',
    classNameType: 'secondary',
    className: 'delete-yes-btn'
  });

  createButton({
    parentNode: confirmDeleteModal,
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

export default deleteAccount;
