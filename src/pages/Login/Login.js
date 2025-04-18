import './login.css';
import loginSubmit from '../../handlers/loginHandler';
import validateForm from '../../utils/validateForm';
import sendEmail from '../../components/ForgotPassword/forgotPassword';

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

  <button id="loginbtn">Login</button>
  
  <button id="recover-password" >¿Olvidaste tu contraseña?</button>
  </form>
  
  <dialog class="recover-modal" id="modal">
  <div class="modalrec_container">

  <form method="post">
  <h2>Recuperar contraseña</h2>
  <label for="emailrec">Introduce tu correo:</label>
  <input type="email" id="emailrec" name="emailrec" placeholder="email">
  <button type="submit">Recuperar contraseña</button>
  <button id="close-dialog" type="button">Cerrar</button>
  </form>
  </div>
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
    <button type="submit">Cambiar contraseña</button>
    <button type="button" id="close-reset">Cancelar</button>
  </form>
</dialog>
  `
}
</section>
`;

const Login = (email, password) => {
  document.querySelector('main').innerHTML = loginTemplate();

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
