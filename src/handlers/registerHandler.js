import createSpinner from '../components/Loader/loader';
import createMessage from '../components/Message/message';
import apiRequest from './apiRequest';
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

    const response = await apiRequest({
      method: 'POST',
      url: 'v1/users/register',
      formData
    });

    const dataRes = await response.json();

    if (response.ok) {
      loginSubmit(email, password);
      return;
    } else {
      createSpinner('close');
      createMessage('Error al registrar:', dataRes.message);
    }
  } catch (error) {
    createSpinner('close');
    createMessage('No se pudo conectar al servidor', error.message);
  }
};

export default registerSubmit;
