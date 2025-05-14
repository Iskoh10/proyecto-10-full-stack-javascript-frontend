import createSpinner from '../components/Loader/loader';
import createMessage from '../components/Message/message';

const apiRequest = async ({
  method,
  url,
  userId = '',
  token = '',
  eventId = '',
  body = null,
  formData = null,
  leave = '',
  email = '',
  password = ''
}) => {
  try {
    const headers = {};

    if (!formData && method !== 'GET') {
      headers['Content-Type'] = 'application/json';
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const options = { method, headers };

    if (method !== 'GET') {
      options.body = formData ? formData : JSON.stringify(body);
    }

    const response = await fetch(`http://localhost:3000/api/${url}`, options);
    return response;
  } catch (error) {
    createSpinner('close');
    createMessage('Error de conexión con el servidor ❌');
  }
};

export default apiRequest;

/* GET */
//! http://localhost:3000/api/v1/events (getEvents)
//! http://localhost:3000/api/v1/events/${eventId} (getEventDetails)
//! http://localhost:3000/api/v1/events/sorted?sort=${sort} (eventsSortBy)

//! http://localhost:3000/api/v1/users (getAllUsers)
//! http://localhost:3000/api/v1/events/user/${userId} (getEventsUser)
//! http://localhost:3000/api/v1/users/${userId} (getUserById)

/* POST */
//! http://localhost:3000/api/v1/users/register (registerSubmit)
//! http://localhost:3000/api/v1/users/login (loginSubmit)
//! http://localhost:3000/api/v1/events (CreateEvent)
//! http://localhost:3000/api/auth/reset-password/${tokenUrl} (updatePassword)

/* PUT */
// http://localhost:3000/api/v1/events/${eventId} (attendToEvent)
// http://localhost:3000/api/v1/users/${userId} (ChangeImg)
// http://localhost:3000/api/v1/events/${eventId} (leaveEvent)
// http://localhost:3000/api/v1/users/${userId} (modProfilePost)

/* DELETE */
// http://localhost:3000/api/v1/events/${event} (deleteEvent)
// http://localhost:3000/api/v1/users/${userId} (deleteAccount)
// http://localhost:3000/api/v1/events/${event} (deleteEvent)
// http://localhost:3000/api/v1/users/${userId} (deleteUser)
