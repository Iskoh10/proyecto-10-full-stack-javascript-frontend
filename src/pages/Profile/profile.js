import './profile.css';

const profileTemplate = () => `
<section id="profile" class="flex-container">
<div class="div-img flex-container">
</div>

<div class="info-user flex-container">
  <header class="header-info">
  <h2 class="nameUser"></h2>
  <p class="emailUser"></p>
  </header>
<div id="tasks" class="flex-container">
<ul class="ul-tasks">
<li>Crear Evento</li>
<li>Modificar Evento</li>
<li>Eventos reservados</li>
<li>Modificar Perfil</li>
<li>Mandar Mensaje</li>
<li>Mensajes Recibidos</li>
<li>Eliminar Cuenta</li>
</ul>
</div>
</div>

</section>
  `;

const getUserById = async () => {
  const { id: userId, token } = JSON.parse(localStorage.getItem('user'));
  console.log(userId);

  const userData = await fetch(`http://localhost:3000/api/v1/users/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`
    }
  });

  const user = await userData.json();
  console.log(user);

  const divImg = document.querySelector('.div-img');
  const h2NameUser = document.querySelector('.nameUser');
  const pEmailUser = document.querySelector('.emailUser');

  const userImg = document.createElement('img');
  userImg.classList.add('user-img');
  userImg.src = user.img;

  h2NameUser.textContent = user.nameUser;
  pEmailUser.textContent = user.email;

  divImg.appendChild(userImg);
};

const Profile = () => {
  document.querySelector('main').innerHTML = profileTemplate();
  getUserById();
};

export default Profile;

//! Crear un la pag del perfil donde podrá crear eventos, buscar eventos por fechas, modificar o eliminar eventos (si ellos lo crearon) y mandar message a todos los usuarios cuando se logueen si estan asistiendo al evento. Eliminar su cuenta pidiendo su contraseña. No borrar de la bbdd pero tendria que recuperar como si hubiese olvidado contraseña. y debe aceptar el admin. Permite clickar en eventos para ver detalles del mismo "Permite a los usuarios explorar detalles de cada evento y la lista de asistentes".
