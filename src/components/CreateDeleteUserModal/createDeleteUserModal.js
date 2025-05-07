import './createDeleteUserModal.css';
import getAllUsers from '../../handlers/getAllUsers';
import createButton from '../CreateButton/createButton';
import createModal from '../CreateModal/createModal';
import './createDeleteUserModal.css';

const createDeleteUserModal = async () => {
  const divInfoUser = document.querySelector('.info-user');

  createModal({
    parentNode: divInfoUser,
    className: 'flex-container',
    id: 'delete-user-modal'
  });

  const modal = document.querySelector('#delete-user-modal');

  modal.innerHTML = `
  <div class="modal-inner">
  <form id="user-delete-form" class="flex-container">
    <h2>Eliminar Usuarios</h2>
    <label for="users-select">Selecciona al usuario que quieres eliminar</label>
    <select name="select" id="users-select">
    </select>
    </form>
  </div>`;

  createModal({
    parentNode: divInfoUser,
    className: 'flex-container',
    id: 'confirm-del-user-modal'
  });

  const modalCorfirm = document.querySelector('#confirm-del-user-modal');

  modalCorfirm.innerHTML = `
  <div class"modal-inner">
  <h2>¿Deseas eliminar a este Usuario?</h2>
  <p class="user-to-del"></p>
  </div>
  <div class="btn-container flex-container">
  </div>
  `;

  const btnContainer = document.querySelector('.btn-container');

  createButton({
    parentNode: btnContainer,
    text: 'Sí',
    classNameType: 'primary',
    className: 'confirm-yes-del-user-btn'
  });

  createButton({
    parentNode: btnContainer,
    text: 'No',
    classNameType: 'secondary',
    className: 'confirm-no-del-user-btn'
  });

  const users = await getAllUsers();
  const select = document.querySelector('#users-select');

  users.forEach((user) => {
    const option = document.createElement('option');
    option.value = user._id;
    option.textContent = user.nameUser;

    if (user.rol === 'admin') {
      option.disabled = true;
    }

    select.appendChild(option);
  });

  select.addEventListener('change', (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];

    modalCorfirm.showModal();
    // deleteUser(selectedOption);

    //! Añadir esto para que aparezca el nombre del usuario en el modal de confirmacion
    // modalConfirm.dataset.username = selectedOption.textContent;
    // modalConfirm.showModal();

    // const username = modalConfirm.dataset.username;
  });

  const form = document.querySelector('#user-delete-form');

  createButton({
    parentNode: form,
    text: 'Salir',
    classNameType: 'secondary',
    id: 'close-user-delete-modal-btn'
  });

  const closeBtn = document.querySelector('#close-user-delete-modal-btn');

  closeBtn.addEventListener('click', () => {
    modal.close();
  });

  modal.showModal();
};

export default createDeleteUserModal;
