import registerSubmit from '../../handlers/registerHandler';
import validateForm from '../../utils/validateForm';

const registerTemplate = () => `
<section class="register" >
  <h2>Registrarse</h2>
  <form method="POST" enctype="multipart/form-data">
    <label for="username">Nombre</label>
    <input type="text" placeholder="Nombre" id="username" required/>

    <label for="email">Email</label>
    <input type="email" placeholder="Email" id="email" required/>

    <label for="password">Contraseña</label>
    <input type="password" placeholder="Contraseña" id="password" required autocomplete="new-password"/>

    <label for="userimg">Foto de perfil</label>
    <input type="file" id="userimg" accept=".jpg,.jpeg,.png,.gif,.webp">

    <button id="registerbtn" type="button">Crear cuenta</button>
    </form>
</section>
`;

const Register = () => {
  document.querySelector('main').innerHTML = registerTemplate();

  validateForm();

  document.querySelector('#registerbtn').addEventListener('click', (e) => {
    e.preventDefault();
    registerSubmit();
  });
  window.scrollTo(0, 0);
};

export default Register;
