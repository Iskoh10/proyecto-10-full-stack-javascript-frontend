import Events from '../pages/Events/Events';

const handleStorageOnWindowClose = () => {
  const maxIdleTime = 360 * 60 * 1000;

  const checkInactivityAndClear = () => {
    const lastVisit = localStorage.getItem('lastVisit');

    if (lastVisit) {
      const now = Date.now();
      const diff = now - parseInt(lastVisit, 10);

      if (diff > maxIdleTime) {
        localStorage.removeItem('user');
      } else {
        console.log('Sesión válida');
      }
    }
  };

  checkInactivityAndClear();

  window.addEventListener('load', () => {
    const user = localStorage.getItem('user');

    if (!user) {
      Events();
    }
  });
};

export default handleStorageOnWindowClose;
