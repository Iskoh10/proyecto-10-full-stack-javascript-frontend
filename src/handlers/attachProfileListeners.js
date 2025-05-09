import createDeleteUserModal from '../components/CreateDeleteUserModal/createDeleteUserModal';
import createSpinner from '../components/Loader/loader';
import getEventsUser from './getEventsUser';
import CreateEvent from './postEvent';

const attachProfileListeners = () => {
  const deleteUserBtn = document.querySelector('.delete-user');
  if (deleteUserBtn) {
    deleteUserBtn.addEventListener('click', () => {
      createDeleteUserModal();
    });
  }

  const liItemsTask = document.querySelectorAll('.ul-tasks li');

  liItemsTask.forEach((li) => {
    const className = li.classList[0];

    li.addEventListener('click', () => {
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

export default attachProfileListeners;
