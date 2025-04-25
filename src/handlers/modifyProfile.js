const createModProfileModal = () => `
<dialog id="mod-profile-modal" class="flex-container">
<h2>Modificar Perfil</h2>
<form id="mod-profile" method="POST" enctype="multipart/form-data">

<label for="username">Nombre</label>
<input type="text" id="mod-username" placeholder="Nombre"/>

<label for="email">Email</label>
<input type="email" id="mod-email" placeholder="Email" />

<label for="password">Contraseña</label>
<input type="password" id="mod-password" placeholder="Contraseña" autocomplete="new-password"/>

<label for="password"Repetir Contraseña</label>
<input type="password" id="mod-repeat-password" placeholder="Repetir contraseña" autocomplete="new-password"/>

</form>
<button class="mod-profile-btn" type="button">Modificar</button>
<button class="close-mod-profile-btn" type="button">Salir</button>
</dialog>
`;

export default createModProfileModal;
