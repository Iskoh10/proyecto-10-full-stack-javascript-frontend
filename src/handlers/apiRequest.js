import createSpinner from '../components/Loader/loader';
import createMessage from '../components/Message/message';

const apiRequest = async ({
  method,
  url,
  token = '',
  body = null,
  formData = null
}) => {
  try {
    const headers = {};

    const options = { method, headers };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    if (method !== 'GET') {
      if (formData) {
        options.body = formData;
      } else if (body) {
        headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(body);
      }
    }

    const response = await fetch(
      `https://proyecto10-backend-beta.vercel.app/api/${url}`,
      options
    );
    return response;
  } catch (error) {
    createSpinner('close');
    createMessage('Error de conexión con el servidor ❌', error.message);
  }
};

export default apiRequest;
