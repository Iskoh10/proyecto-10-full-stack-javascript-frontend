const createDeleteModal = () => `
<dialog id="delete-modal" class="flex-container">
<h2>Eliminar Cuenta</h2>
<p>¿Desea eliminar su cuenta?</p>
<button class="delete-account-btn" type="button">Eliminar Cuenta</button>

<dialog id="confirm-delete-modal" class="flex-container">
<h2>¡ADVERTENCIA!</h2>
<p>¿Estás a punto de eliminar tu cuenta?</p>
<button class="delete-yes-btn" type="button">Sí</button>
<button class="delete-no-btn" type="button">No</button>
</dialog>

<button class="close-delete-btn" type="button">Salir</button>
</dialog>


`;

export default createDeleteModal;
