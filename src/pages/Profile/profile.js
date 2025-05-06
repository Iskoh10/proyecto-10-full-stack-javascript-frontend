import './profile.css';
import createNewEvent from '../../components/CreateEvent/createNewEvent';
import createSpinner from '../../components/Loader/loader';
import attendingEvents from '../../components/AttendingEvents/attendingEvents';
import modalDeleteAccount from '../../handlers/deleteModal';
import getEventsUser from '../../handlers/getEventsUser';
import modProfile from '../../handlers/modifyProfile';
import CreateEvent from '../../handlers/postEvent';
import createChangeImgModal from '../../components/CreateChangeImgModal/createChangeImgModal';

const profileTemplate = () => `
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

const getUserById = async () => {
  const { id: userId, token } = JSON.parse(localStorage.getItem('user'));

  const userData = await fetch(`http://localhost:3000/api/v1/users/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`
    }
  });

  const user = await userData.json();

  const h2NameUser = document.querySelector('.nameUser');
  const pEmailUser = document.querySelector('.emailUser');

  const userImg = document.querySelector('.user-img');
  userImg.src = user.img;

  h2NameUser.textContent = user.nameUser;
  pEmailUser.textContent = user.email;
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

export default Profile;
