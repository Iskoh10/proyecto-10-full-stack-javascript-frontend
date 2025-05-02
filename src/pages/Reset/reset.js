import createButton from '../../components/CreateButton/createButton';

const registerTemplate = () => `<dialog class="reset-modal" id="reset-modal">
  <form id="reset-form" method="dialog" class="flex-container">
    <h2>🔐 Nueva contraseña</h2>
    <input
      type="password"
      id="new-password"
      placeholder="Nueva contraseña"
      required
    />
    <input
      type="password"
      id="renew-password"
      placeholder="Repetir contraseña"
      required
    />
  </form>
</dialog>
  `;

const createModalReset = () => {
  document.querySelector('header').innerHTML = '';
  const mainContent = document.querySelector('main');
  mainContent.innerHTML = registerTemplate();

  const resetModalForm = document.querySelector('#reset-form');
  createButton({
    parentNode: resetModalForm,
    text: 'Actualizar contraseña',
    classNameType: 'primary',
    className: 'update-pass-btn'
  });
};

export default createModalReset;

//! revisar y borrar codigo del boton cerrar del reset modal,
