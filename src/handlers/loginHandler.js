import createSpinner from '../components/Loader/loader';
import createMessage from '../components/Message/message';
import createNavbar from '../components/Navbar/navbar';
import Events from '../pages/Events/Events';
import apiRequest from './apiRequest';

const loginSubmit = async (emailParam, passwordParam) => {
  const email = emailParam || document.querySelector('#email').value;
  const password = passwordParam || document.querySelector('#password').value;

  try {
    createSpinner('Login en marcha');

    const response = await apiRequest({
      method: 'POST',
      url: 'v1/users/login',
      body: { email, password }
    });

    const dataRes = await response.json();

    if (!response.ok) {
      createMessage('Error en el login', dataRes.message);
      createSpinner('close');
      return;
    }

    const user = dataRes.user;

    localStorage.setItem(
      'user',
      JSON.stringify({
        id: user._id,
        token: dataRes.token,
        name: user.nameUser,
        img: user.img,
        rol: user.rol
      })
    );

    createNavbar();
    Events();
    createMessage(`Logueado con éxito`);
  } catch (error) {
    console.error('Error en la petición de login:', error.message);
  }
};

export default loginSubmit;
