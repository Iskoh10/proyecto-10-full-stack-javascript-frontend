const handleStorageOnWindowClose = () => {
  const maxIdleTime = 20 * 60 * 1000;

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

  window.addEventListener('unload', () => {
    localStorage.setItem('lastVisit', Date.now());
  });
};

export default handleStorageOnWindowClose;
