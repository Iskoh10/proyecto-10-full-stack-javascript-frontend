import './createReset.css';
import createButton from '../CreateButton/createButton';
import createModal from '../CreateModal/createModal';

const createModalReset = () => {
  const headerRec = document.querySelector('header');
  headerRec.innerHTML = `<h2 class="recTitle">RECUPERACIÓN DE CONTRASEÑA</h2>`;

  const mainContent = document.querySelector('main');
  mainContent.innerHTML = '';

  createModal({
    parentNode: mainContent,
    className: 'flex-container',
    id: 'reset-modal'
  });

  const resetModal = document.querySelector('#reset-modal');

  resetModal.innerHTML = `
  <div class="modal-container">
    <form id="reset-form" method="dialog">
      <h2>🔐 Nueva contraseña</h2>
      <input type="password" id="new-password" placeholder="Nueva contraseña" required/>
      <input type="password" id="renew-password" placeholder="Repetir contraseña" required/>
    </form>
  </div>
  `;

  const resetForm = document.querySelector('#reset-form');

  createButton({
    parentNode: resetForm,
    text: 'Actualizar contraseña',
    classNameType: 'primary',
    className: 'update-pass-btn'
  });

  const updatePassBtn = document.querySelector('.update-pass-btn');
  updatePassBtn.addEventListener('click', () => {
    console.log('Cambiar');
  });
};

export default createModalReset;
