import createEventModal from '../../components/EventsModal/eventsModal';
import attendingEvents from '../../handlers/attendingEvents';
import changeImg from '../../handlers/changeImg';
import getEventsUser from '../../handlers/getEventsUser';
import createModProfileModal from '../../handlers/modifyProfile';
import modifyProfileModal from '../../handlers/modifyProfile';
import CreateEvent from '../../handlers/postEvent';
import './profile.css';

const profileTemplate = () => `
<section id="profile" class="flex-container">
<div class="div-img flex-container">
<img class="user-img"></img>
<button type="button" class="change-img">Cambiar Imagen</button>
</div>

 <dialog class="changeImg-modal" id="changeImg-modal">
  <form id="changeImg-form" method="dialog">
    <h2>Cambio de Imagen</h2>
    <input
      type="file"
      class="profileImgInput"
      accept="image/*" />
    <button id="makeChangeImg" type="button">Haz el cambio</button>
    <button type="button" id="close-changeImg">Cancelar</button>
  </form>
</dialog>

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
<li class="send-message">Mandar Mensaje</li>
<li class="messages">Mensajes Recibidos</li>
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
  getUserById();

  const modal = document.querySelector('.changeImg-modal');
  const closeBtn = document.querySelector('#close-changeImg');

  document.querySelector('.change-img').addEventListener('click', () => {
    modal.showModal();
  });

  changeImg();

  closeBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    modal.close();
  });

  const divInfoUser = document.querySelector('.info-user');

  divInfoUser.insertAdjacentHTML(
    'beforeend',
    createEventModal('Crear Nuevo Evento')
  );

  const eventModal = document.querySelector('#event-modal');
  const closeBtnEvent = document.querySelector('#close-event-modal');
  const textArea = document.querySelector('#event-description');

  closeBtnEvent.addEventListener('click', () => {
    const eventForm = document.querySelector('#event-form');
    eventForm.reset();
    eventModal.close();
  });

  textArea.addEventListener('input', () => {
    textArea.style.height = 'auto';
    textArea.style.height = `${textArea.scrollHeight}px`;
  });

  divInfoUser.insertAdjacentHTML('beforeend', attendingEvents());
  const attendingEventModal = document.querySelector('#events-modal');
  const closeEventsBtn = document.querySelector('.close-events-btn');

  closeEventsBtn.addEventListener('click', () => {
    attendingEventModal.close();
  });

  divInfoUser.insertAdjacentHTML('beforeend', createModProfileModal());
  const modProfileModal = document.querySelector('#events-modal');
  const closeModProfileBtn = document.querySelector('.close-events-btn');

  closeModProfileBtn.addEventListener('click', () => {
    modProfileModal.close();
  });

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
          getEventsUser();
          attendingEventModal.showModal();

          break;
        case 'modify-profile':
          const modProfileModal = document.querySelector('#mod-profile-modal');
          console.log(modProfileModal);

          break;
        case 'send-message':
          sendMessage();
          break;
        case 'messages':
          messages();
          break;
        case 'delete-account':
          deleteAccount();
          break;

        default:
          break;
      }
    });
  });
};

export default Profile;

//! Crear un la pag del perfil donde podrá crear eventos, buscar eventos por fechas, modificar o eliminar eventos (si ellos lo crearon) y mandar message a todos los usuarios cuando se logueen si estan asistiendo al evento. Eliminar su cuenta pidiendo su contraseña. No borrar de la bbdd pero tendria que recuperar como si hubiese olvidado contraseña. y debe aceptar el admin. Permite clickar en eventos para ver detalles del mismo "Permite a los usuarios explorar detalles de cada evento y la lista de asistentes".

//! Crear una clase mainButton para css para unificar

//! Unificar el añadir el dialog y el addeventlistener al boton cancelar

//! Quitar lo del user localStorage
