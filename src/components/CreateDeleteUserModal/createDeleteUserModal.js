import './createDeleteUserModal.css';
import getAllUsers from '../../handlers/getAllUsers';
import createButton from '../CreateButton/createButton';
import createModal from '../CreateModal/createModal';
import './createDeleteUserModal.css';
import deleteUser from '../../handlers/deleteUser';

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
    <option value="" selected disabled>Selecciona un usuario</option>
    </select>
    </form>
  </div>`;

  const users = await getAllUsers();
  const select = document.querySelector('#users-select');

  users.forEach((user) => {
    if (user.rol === 'admin') {
      return;
    } else {
      const option = document.createElement('option');
      option.value = user._id;
      option.textContent = user.nameUser;

      select.appendChild(option);
    }
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

  createModal({
    parentNode: divInfoUser,
    className: 'flex-container',
    id: 'confirm-del-user-modal'
  });

  const modalConfirm = document.querySelector('#confirm-del-user-modal');

  modalConfirm.innerHTML = `
  <div class="modal-inner">
  <h2>¿Deseas eliminar a este Usuario?</h2>
  <p class="user-to-del"></p>
  </div>
  <div class="btn-container-admin flex-container">
  </div>
  `;

  select.addEventListener('change', (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];

    modalConfirm.dataset.value = selectedOption.value;

    const usernameToDel = document.querySelector('.user-to-del');
    usernameToDel.textContent = `🤝 ${selectedOption.textContent}`;

    modalConfirm.showModal();
  });

  const btnContainer = document.querySelector('.btn-container-admin');

  createButton({
    parentNode: btnContainer,
    text: 'Sí',
    classNameType: 'primary',
    className: 'confirm-yes-del-user-btn'
  });

  const yesBtn = document.querySelector('.confirm-yes-del-user-btn');
  yesBtn.addEventListener('click', () => {
    deleteUser(modalConfirm.dataset.value);
    modalConfirm.close();
    modal.close();
  });

  createButton({
    parentNode: btnContainer,
    text: 'No',
    classNameType: 'secondary',
    className: 'confirm-no-del-user-btn'
  });

  const noBtn = document.querySelector('.confirm-no-del-user-btn');
  noBtn.addEventListener('click', () => {
    modalConfirm.close();
    modal.close();
  });

  modal.showModal();
};

export default createDeleteUserModal;
