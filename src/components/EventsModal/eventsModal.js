const createEventModal = (title) => {
  return `
  <dialog  id="event-modal">
  <form id="event-form" method="dialog">
    <h2>${title}</h2>
<label for="event-title">Título del Evento:</label>
    <input type="text" id="event-title" name="event-title" placeholder="Título" required />
    <label for="eventImgInput">Portada del Evento:</label>
    <input
      type="file"
      id="eventImgInput"
      accept="image/*" />
      <label for="event-date">Fecha del Evento:</label>
      <input type="date" id="event-date" required />
      <label for="event-location">Localización del Evento:</label>
      <input type="text" id="event-location" required />
      <label for="event-description">Descripción del Evento:</label>
      <textarea id="event-description"></textarea>
    <button id="eventBtnGo" type="button">Crear Evento</button>
    <button type="button" id="close-event-modal">Cancelar</button>
  </form>
</dialog>`;
};

export default createEventModal;
