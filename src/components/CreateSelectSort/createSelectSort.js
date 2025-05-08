import eventsSortBy from '../../handlers/eventsSortBy';
import './createSelectSort.css';

const createSelectSort = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user) {
    const welcomeContainer = document.querySelector('.welcome-container');
    const select = document.createElement('select');
    select.id = 'sort-by-choose';

    const optionByDefault = document.createElement('option');
    optionByDefault.textContent = 'Ordena los eventos';
    optionByDefault.disabled = true;
    optionByDefault.selected = true;
    optionByDefault.hidden = true;
    const optionDate = document.createElement('option');
    optionDate.value = 'date';
    optionDate.textContent = 'Por fecha';
    const optionPopularity = document.createElement('option');
    optionPopularity.value = 'popularity';
    optionPopularity.textContent = 'Por popularidad';

    select.appendChild(optionByDefault);
    select.appendChild(optionDate);
    select.appendChild(optionPopularity);
    welcomeContainer.appendChild(select);

    select.addEventListener('change', (e) => {
      const selectedOption = e.target.options[e.target.selectedIndex];

      eventsSortBy(selectedOption.value, selectedOption.textContent);
    });
  }
};

export default createSelectSort;
