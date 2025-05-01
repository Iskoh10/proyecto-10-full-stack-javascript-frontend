import Login from '../../pages/Login/Login';
import createSpinner from '../Loader/loader';
import createMessage from '../Message/message';

const sendEmail = () => {
  const modal = document.querySelector('.recover-modal');
  const form = modal?.querySelector('.recover-modal > form');
  const emailInput = document.querySelector('#emailrec');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = emailInput.value;

    if (!email.trim()) {
      createMessage('Introduce un correo válido');
      return;
    }

    modal.close();
    createSpinner('Te estamos enviando un correo...');

    try {
      const response = await fetch(
        'http://localhost:3000/api/auth/forgot-password',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email })
        }
      );

      const result = await response.json();

      if (response.ok) {
        createSpinner('close');
        Login();
        createMessage('Correo de recuperación enviado!');
      } else {
        createSpinner('close');
        createSpinner('Algo va mal');
      }
    } catch (error) {
      console.error(error);
      alert('❌ Error de conexión con el servidor');
    }
  });
};

export default sendEmail;
