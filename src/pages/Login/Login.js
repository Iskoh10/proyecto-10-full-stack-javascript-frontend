import './login.css';
import loginSubmit from '../../handlers/loginHandler';
import validateForm from '../../utils/validateForm';
import sendEmail from '../../components/ForgotPassword/forgotPassword';
import createButton from '../../components/CreateButton/createButton';

const loginTemplate = () => `
<section class="login">
${
  localStorage.getItem('user')
    ? `<h2>Ya estás Logueado</h2>`
    : `<form>
  <label for="email">Email</label>
  <input type="email" placeholder="Email" id="email"/>

  <label for="password">Contraseña</label>
  <input type="password" placeholder="Contraseña" id="password"  />

  </form>
  
  <dialog class="recover-modal" id="modal">
 

  <form method="post" class="flex-container">
  <h2>Recuperar contraseña</h2>
  <label for="emailrec">Introduce tu correo:</label>
  <input type="email" id="emailrec" name="emailrec" placeholder="email">
  </form>

  </dialog>

  <dialog class="reset-modal" id="reset-modal">
  <form id="reset-form" method="dialog">
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
  `
}
</section>
`;

const Login = (email, password) => {
  document.querySelector('main').innerHTML = loginTemplate();
  const loginForm = document.querySelector('.login > form');
  createButton({
    parentNode: loginForm,
    text: 'Login',
    classNameType: 'primary',
    id: 'loginbtn'
  });
  createButton({
    parentNode: loginForm,
    text: '¿Olvidaste tu contraseña?',
    classNameType: 'secondary',
    id: 'recover-password'
  });

  const recoverForm = document.querySelector('.recover-modal form');
  createButton({
    parentNode: recoverForm,
    text: 'Recuperar contraseña',
    classNameType: 'primary',
    className: 'recover-btn'
  });
  createButton({
    parentNode: recoverForm,
    text: 'Cerrar',
    classNameType: 'secondary',
    id: 'close-dialog'
  });

  const resetForm = document.querySelector('#reset-form');
  createButton({
    parentNode: resetForm,
    text: 'Cambiar contraseña',
    classNameType: 'primary'
  });
  const recoverBtn = document.querySelector('.recover-btn');
  recoverBtn.type = 'submit';

  createButton({
    parentNode: resetForm,
    text: 'Cancelar',
    classNameType: 'secondary',
    id: 'close-reset'
  });

  const openModal = document.querySelector('#recover-password');
  const modal = document.querySelector('.recover-modal');
  const closeBtn = document.querySelector('#close-dialog');

  openModal?.addEventListener('click', (e) => {
    e.preventDefault();
    modal.showModal();
  });

  closeBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    modal.close();
  });

  validateForm();
  sendEmail();

  try {
    document.querySelector('#loginbtn').addEventListener('click', (e) => {
      e.preventDefault();
      loginSubmit(email, password);
    });
  } catch (error) {
    console.log('Estamos logueado');
  }
};

export default Login;
