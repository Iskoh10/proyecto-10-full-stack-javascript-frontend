const validateForm = () => {
  const inputs = document.querySelectorAll('input');

  inputs.forEach((input) => {
    const label = document.querySelector(`label[for="${input.id}"]`);

    const originalLabelText = label.textContent
      .replace('✔️', '')
      .replace('❌', '')
      .trim();

    input.addEventListener('focus', () => {
      label.style.color = '#4a90e2';
      label.style.fontSize = '1.1rem';
    });

    input.addEventListener('blur', () => {
      if (input.value === '') {
        label.textContent = originalLabelText;
        label.style.color = '#444';
        label.style.fontSize = '1rem';
      } else if (input.id === 'email') {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (emailRegex.test(input.value)) {
          label.textContent = `${originalLabelText} ✔️`;
          label.style.color = '#008f39';
        } else {
          label.textContent = `${originalLabelText} ❌`;
          label.style.color = '#e74c3c';
        }
      } else {
        label.textContent = `${originalLabelText} ✔️`;
        label.style.color = '#008f39';
      }
    });
  });
};

export default validateForm;
