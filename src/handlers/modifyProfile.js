import createButton from '../components/CreateButton/createButton';
import modProfilePost from './modProfilePost';

const createModProfileModal = () => `
<dialog id="mod-profile-modal" class="flex-container">
<h2>Modificar Perfil</h2>
<form id="mod-profile" method="dialog" enctype="multipart/form-data">

<label for="username">Nombre</label>
<input type="text" id="mod-username" placeholder="Nombre"/>

<label for="email">Email</label>
<input type="email" id="mod-email" placeholder="Email" />

<label for="password">Contraseña</label>
<input type="password" id="mod-password" placeholder="Contraseña" autocomplete="new-password"/>

<label for="password" class="label-re-pass">Repetir Contraseña</label>
<input type="password" id="mod-repeat-password" placeholder="Repetir contraseña" autocomplete="new-password"/>

</form>
</dialog>
`;

const modProfile = () => {
  const divInfoUser = document.querySelector('.info-user');
  divInfoUser.insertAdjacentHTML('beforeend', createModProfileModal());
  const modProfileModal = document.querySelector('#mod-profile-modal');
  const modForm = document.querySelector('#mod-profile');

  createButton({
    parentNode: modForm,
    text: 'Modificar',
    classNameType: 'primary',
    className: 'mod-profile-btn'
  });

  createButton({
    parentNode: modForm,
    text: 'Salir',
    classNameType: 'secondary',
    className: 'close-mod-profile-btn'
  });

  const modProfileBtn = document.querySelector('.mod-profile-btn');
  const closeModProfileBtn = document.querySelector('.close-mod-profile-btn');

  modProfileBtn.addEventListener('click', () => {
    modProfilePost();
  });

  closeModProfileBtn.addEventListener('click', () => {
    modForm.reset();
    modProfileModal.close();
  });
};

export default modProfile;
