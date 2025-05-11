import createSpinner from '../components/Loader/loader';
import createMessage from '../components/Message/message';
import loginSubmit from './loginHandler';

const registerSubmit = async () => {
  const username = document.querySelector('#username').value;
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  const userimg = document.querySelector('#userimg').files[0];

  const fields = [username, email, password];
  if (fields.some((field) => !field.trim())) {
    createMessage('Faltan datos para registrarte');
    return;
  }

  const formData = new FormData();
  formData.append('nameUser', username);
  formData.append('email', email);
  formData.append('password', password);
  if (userimg) {
    formData.append('img', userimg);
  }

  try {
    createSpinner('Creando tu Cuenta');

    const res = await fetch('http://localhost:3000/api/v1/users/register', {
      method: 'POST',
      body: formData
    });

    const dataRes = await res.json();

    if (res.ok) {
      loginSubmit(email, password);
      return;
    } else {
      createSpinner('close');
      createMessage('Error al registrar:', dataRes.message);
    }
  } catch (error) {
    createSpinner('close');
    createMessage('No se pudo conectar al servidor', error);
  }
};

export default registerSubmit;
