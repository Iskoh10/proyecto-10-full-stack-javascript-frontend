const checkUserEvent = (participants, userId, eventId) => {
  const alreadyParticipating = participants.some((p) => p._id === userId);

  if (alreadyParticipating) {
    const btn = document.querySelector(`.attend[data-event-id="${eventId}"]`);

    if (btn) {
      btn.classList.add('animate-attend');
      btn.innerHTML = '❤️‍🔥 Asistiré';
      btn.disabled = true;
    }
  } else {
  }
};

export default checkUserEvent;
