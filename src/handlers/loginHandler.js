import createSpinner from '../components/Loader/loader';
import createMessage from '../components/Message/message';
import createNavbar from '../components/Navbar/navbar';
import Events from '../pages/Events/Events';

const loginSubmit = async (emailParam, passwordParam) => {
  const email = emailParam || document.querySelector('#email').value;
  const password = passwordParam || document.querySelector('#password').value;

  try {
    createSpinner('Login en marcha');
    const data = await fetch('http://localhost:3000/api/v1/users/login', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

    const dataRes = await data.json();

    if (!data.ok) {
      console.error(dataRes.message || 'Error en el login');
      createMessage('Error en el login');
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
    console.error('Error en la petición de login:', error);
  }
};

export default loginSubmit;
