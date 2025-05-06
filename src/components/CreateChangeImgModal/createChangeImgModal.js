import changeImg from '../../handlers/changeImg';
import createButton from '../CreateButton/createButton';
import createModal from '../CreateModal/createModal';

const createChangeImgModal = () => {
  const sectionProfile = document.querySelector('#profile');

  createModal({
    parentNode: sectionProfile,
    className: 'flex-container',
    id: 'changeImg-modal'
  });

  const modal = document.querySelector('#changeImg-modal');

  modal.innerHTML = `
  <form id="changeImg-form" class="flex-container" method="dialog">
    <h2>Cambio de Imagen</h2>
    <input
      type="file"
      class="profileImgInput"
      accept="image/*" />
  </form>
  `;

  const changeImgForm = document.querySelector('#changeImg-form');
  const divImg = document.querySelector('.div-img');

  createButton({
    parentNode: divImg,
    text: 'Cambiar Imagen',
    classNameType: 'primary',
    className: 'change-img'
  });

  document.querySelector('.change-img').addEventListener('click', () => {
    modal.showModal();
  });

  createButton({
    parentNode: changeImgForm,
    text: 'Haz el cambio',
    classNameType: 'primary',
    id: 'makeChangeImg'
  });

  changeImg();

  createButton({
    parentNode: changeImgForm,
    text: 'Cancelar',
    classNameType: 'secondary',
    id: 'close-changeImg'
  });

  const closeBtn = document.querySelector('#close-changeImg');

  closeBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    modal.close();
  });
};

export default createChangeImgModal;
