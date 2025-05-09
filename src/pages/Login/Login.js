import './login.css';
import loginSubmit from '../../handlers/loginHandler';
import validateForm from '../../utils/validateForm';
import createButton from '../../components/CreateButton/createButton';
import createRecover from '../../components/CreateRecover/createRecover';

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

  createRecover();

  validateForm();

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
