const sendEmail = () => {
  const modal = document.querySelector('.recover-modal');
  const form = modal?.querySelector('form');
  const emailInput = document.querySelector('#emailrec');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = emailInput.value;

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
        createSpinner('Te estamos enviando un correo');
        alert('📧 ¡Correo de recuperación enviado!');
        modal.close();
      } else {
        createSpinner('Algo va mal');
        alert(result.message || '❌ Error al enviar el correo');
      }
    } catch (error) {
      console.error(error);
      alert('❌ Error de conexión con el servidor');
    }
  });
};

export default sendEmail;
