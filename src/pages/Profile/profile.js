import './profile.css';
import createNewEvent from '../../components/CreateEvent/createNewEvent';
import createSpinner from '../../components/Loader/loader';
import attendingEvents from '../../components/AttendingEvents/attendingEvents';
import modalDeleteAccount from '../../handlers/deleteModal';
import getEventsUser from '../../handlers/getEventsUser';
import modProfile from '../../handlers/modifyProfile';
import CreateEvent from '../../handlers/postEvent';
import createChangeImgModal from '../../components/CreateChangeImgModal/createChangeImgModal';
import getUserById from '../../handlers/getUserById';
import createDeleteUserModal from '../../components/CreateDeleteUserModal/createDeleteUserModal';

const profileTemplate = () => {
  const main = document.querySelector('main');
  const user = JSON.parse(localStorage.getItem('user'));

  if (user.rol === 'admin') {
    main.innerHTML = `
    <section id="profile" class="flex-container">
      <div class="div-img flex-container">
        <img class="user-img"></img>
      </div>

      <div class="info-user flex-container">
        <header class="header-info">
        <h2 class="nameUser"></h2>
        <p class="emailUser"></p>
      </header>

      <div id="tasks" class="flex-container">
        <ul class="ul-tasks flex-container">
          <li class="create-event">Crear Evento</li>
          <li class="attending-events">Eventos reservados</li>
          <li class="modify-profile">Modificar Perfil</li>
          <li class="delete-user">Eliminar Usuario</li>
        </ul>
      </div>
      </div>
    </section>
  `;

    const deleteUserBtn = document.querySelector('.delete-user');

    deleteUserBtn.addEventListener('click', () => {
      createDeleteUserModal();
    });
  } else {
    main.innerHTML = `
    <section id="profile" class="flex-container">
      <div class="div-img flex-container">
        <img class="user-img"></img>
      </div>

      <div class="info-user flex-container">
        <header class="header-info">
        <h2 class="nameUser"></h2>
        <p class="emailUser"></p>
        </header>

      <div id="tasks" class="flex-container">
        <ul class="ul-tasks flex-container">
          <li class="create-event">Crear Evento</li>
          <li class="attending-events">Eventos reservados</li>
          <li class="modify-profile">Modificar Perfil</li>
          <li class="delete-account">Eliminar Cuenta</li>
        </ul>
      </div>
      </div>
    </section>
  `;
  }

  getUserById();

  createChangeImgModal();

  createNewEvent();

  attendingEvents();

  modProfile();

  modalDeleteAccount();

  const liItemsTask = document.querySelectorAll('.ul-tasks li');

  liItemsTask.forEach((li) => {
    const className = li.classList[0];

    li.addEventListener('click', (e) => {
      switch (className) {
        case 'create-event':
          const eventModal = document.querySelector('#event-modal');
          CreateEvent();
          eventModal.showModal();
          break;

        case 'attending-events':
          const attendingEventModal = document.querySelector('#events-modal');
          attendingEventModal.showModal();
          getEventsUser();
          break;

        case 'modify-profile':
          const modProfileModal = document.querySelector('#mod-profile-modal');
          modProfileModal.showModal();
          break;

        case 'delete-account':
          const deleteModal = document.querySelector('#delete-modal');
          deleteModal.showModal();
          break;

        default:
          break;
      }
    });
  });

  createSpinner('close');
};

const Profile = () => {
  profileTemplate();

  createSpinner('Cargando tu perfil');
};

export default Profile;
