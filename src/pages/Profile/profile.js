import './profile.css';
import createNewEvent from '../../components/CreateEvent/createNewEvent';
import createSpinner from '../../components/Loader/loader';
import attendingEvents from '../../components/AttendingEvents/attendingEvents';
import modalDeleteAccount from '../../components/CreateDeleteAccountModal/deleteModal';
import modProfile from '../../components/CreateModProfileModal/modifyProfile';
import createChangeImgModal from '../../components/CreateChangeImgModal/createChangeImgModal';
import getUserById from '../../handlers/getUserById';
import attachProfileListeners from '../../handlers/attachProfileListeners';

const profileTemplate = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return `
${
  user.rol === 'admih'
    ? `<section id="profile" class="flex-container">
      <div class="div-img flex-container">
        <img class="user-img"></img>
      </div>

      <div class="info-user flex-container">
        <div class="header-info">
        <h2 class="nameUser"></h2>
        <p class="emailUser"></p>
      </div>

      <div id="tasks" class="flex-container">
        <ul class="ul-tasks flex-container">
          <li class="create-event">Crear Evento</li>
          <li class="attending-events">Eventos reservados</li>
          <li class="modify-profile">Modificar Perfil</li>
          <li class="delete-user">Eliminar Usuario</li>
        </ul>
      </div>
      </div>
    </section>`
    : `<section id="profile" class="flex-container">
      <div class="div-img flex-container">
        <img class="user-img"></img>
      </div>

      <div class="info-user flex-container">
        <div class="header-info">
        <h2 class="nameUser"></h2>
        <p class="emailUser"></p>
        </div>

      <div id="tasks" class="flex-container">
        <ul class="ul-tasks flex-container">
          <li class="create-event">Crear Evento</li>
          <li class="attending-events">Eventos reservados</li>
          <li class="modify-profile">Modificar Perfil</li>
          <li class="delete-account">Eliminar Cuenta</li>
        </ul>
      </div>
      </div>
    </section>`
}`;
};

const Profile = () => {
  document.querySelector('main').innerHTML = profileTemplate();

  createSpinner('Cargando tu perfil');

  getUserById();

  createChangeImgModal();

  createNewEvent();

  attendingEvents();

  modProfile();

  modalDeleteAccount();

  attachProfileListeners();
};

export default Profile;
