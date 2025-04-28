import createSpinner from '../components/Loader/loader';
import loginSubmit from './loginHandler';

const registerSubmit = async () => {
  const username = document.querySelector('#username').value;
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  const userimg = document.querySelector('#userimg').files[0];

  const formData = new FormData();
  formData.append('nameUser', username);
  formData.append('email', email);
  formData.append('password', password);
  if (userimg) {
    formData.append('img', userimg);
  }

  createSpinner('Creando tu Cuenta');
  try {
    const res = await fetch('http://localhost:3000/api/v1/users/register', {
      method: 'POST',
      body: formData
    });

    if (res.ok) {
      loginSubmit(email, password);
      return;
    } else {
      const errorData = await res.json();
      console.error('Error al registrar:', errorData);
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
    alert('No se pudo conectar al servidor');
  }
};

export default registerSubmit;
