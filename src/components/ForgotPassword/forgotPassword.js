import apiRequest from '../../handlers/apiRequest';
import Login from '../../pages/Login/Login';
import createSpinner from '../Loader/loader';
import createMessage from '../Message/message';

const sendEmail = () => {
  const modal = document.querySelector('#recover-modal');
  const form = modal?.querySelector('.recover-form');
  const emailInput = document.querySelector('#emailrec');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = emailInput.value;

    if (!email.trim()) {
      createMessage('Introduce un correo válido');
      return;
    }

    modal.close();

    try {
      createSpinner('Te estamos enviando un correo...');

      const response = await apiRequest({
        method: 'POST',
        url: 'auth/forgot-password',
        body: { email: email }
      });

      const result = await response.json();

      if (response.ok) {
        createSpinner('close');
        Login();
        createMessage('Correo de recuperación enviado!');
      } else {
        createSpinner('close');
        createMessage(
          'Algo pasa, email incorrecto o usuario no registrado',
          result.message
        );
      }
    } catch (error) {
      createSpinner('close');
      createMessage('❌ Error de conexión con el servidor', error.message);
    }
  });
};

export default sendEmail;
