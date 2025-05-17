(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function e(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(s){if(s.ep)return;s.ep=!0;const a=e(s);fetch(s.href,a)}})();const u=({parentNode:o,text:t,classNameType:e,className:n="",id:s=""})=>{const a=document.createElement("button");return a.textContent=t,a.className="flex-container",a.classList.add(e),n&&a.classList.add(n),s&&(a.id=s),o.appendChild(a),a},y=({parentNode:o,className:t="",id:e=""})=>{const n=document.createElement("dialog");return n.classList.add("modal","flex-container"),t&&n.classList.add(...t.split(" ")),e&&(n.id=e),o.appendChild(n),n},U=()=>{const o=document.querySelector("header");o.innerHTML='<h2 class="recTitle">RECUPERACIÓN DE CONTRASEÑA</h2>';const t=document.querySelector("main");t.innerHTML="",y({parentNode:t,id:"reset-modal"});const e=document.querySelector("#reset-modal");e.innerHTML=`
  <div class="modal-container">
    <form id="reset-form" method="dialog">
      <h2>🔐 Nueva contraseña</h2>
      <input type="password" id="new-password" placeholder="Nueva contraseña" required/>
      <input type="password" id="renew-password" placeholder="Repetir contraseña" required/>
    </form>
  </div>
  `;const n=document.querySelector("#reset-form");u({parentNode:n,text:"Actualizar contraseña",classNameType:"primary",className:"update-pass-btn"}),document.querySelector(".footer").innerHTML=""},c=o=>{let t=document.querySelector("#dialog-loader");if(o==="close"){t&&t.remove();return}if(t){const i=t.querySelector(".text-waiting");i&&(i.textContent=o);return}const e=document.createElement("dialog");e.setAttribute("id","dialog-loader"),e.classList.add("flex-container");const n=document.createElement("div");n.classList.add("loader");const s=document.createElement("div");s.classList.add("text-wait-container");const a=document.createElement("p");a.classList.add("text-waiting"),a.textContent=`${o}`;const r=document.querySelector("main");s.appendChild(a),e.appendChild(n),e.appendChild(s),r.appendChild(e)},l=(o,t=3e3)=>{const e=document.createElement("div");e.classList.add("message-modal","hidden");let n=document.createElement("p");n.classList.add("message-text"),n.textContent=`${o}`;const s=document.querySelector("main");e.appendChild(n),s.appendChild(e),e.classList.remove("hidden"),e.classList.add("show"),setTimeout(()=>{e.classList.remove("show"),setTimeout(()=>{e.classList.add("hidden")},500)},t)},f=async({method:o,url:t,token:e="",body:n=null,formData:s=null})=>{try{const a={},r={method:o,headers:a};return e&&(a.Authorization=`Bearer ${e}`),o!=="GET"&&(s?r.body=s:n&&(a["Content-Type"]="application/json",r.body=JSON.stringify(n))),await fetch(`https://proyecto10-backend-beta.vercel.app/api/${t}`,r)}catch(a){c("close"),l("Error de conexión con el servidor ❌",a.message)}},B=async o=>{const t=document.querySelector("#new-password"),e=document.querySelector("#renew-password"),n=document.querySelector("#reset-modal");if(t.value===e.value){c("Actualizando tu contraseña");try{const s=await f({method:"POST",url:`auth/reset-password/${o}`,body:{password:t.value}}),a=await s.json();s.ok?(c("close"),l("Contraseña actualizada ✅"),n.close(),window.location.href="/login"):l("Error al actualizar la contraseña ❌",a.message)}catch(s){c("close"),l("Error de conexión con el servidor ❌",s.message)}}else c("close"),l("Las contraseñas no coinciden")},R=o=>{U();const t=document.querySelector("#reset-modal"),e=document.querySelector(".update-pass-btn"),n=document.querySelector("#close-reset");t&&t.showModal(),e.addEventListener("click",()=>{B(o)}),n==null||n.addEventListener("click",()=>{t.close()})},j=async o=>{const{token:t}=JSON.parse(localStorage.getItem("user"));try{c("Cargando evento...");const e=await f({method:"GET",url:`v1/events/${o}`,token:t}),n=await e.json();return e.ok||l("Error en la recuperación de los detalles del evento:",n.message),c("close"),n}catch(e){c("close"),l("Error al obtener detalles del evento:",e.message)}},k=async o=>{const t=await j(o),e=document.querySelector("#events"),n=document.querySelector("#event-details");n&&n.remove(),y({parentNode:e,id:"event-details"});const s=document.querySelector("#event-details");s.innerHTML=`
  <div class="modal-content flex-container">
    <h2>${t.title}</h2>
    <div class="img-container">
      <img class="event-img" src=${t.img} alt=${t.title}/>
    </div>
    <p class="description">${t.description}</p>
    <p class="participants">Asistentes: ${t.participants.map(i=>i.nameUser).join(", ")}</p>
  </div>
`,s.showModal();const a=document.querySelector(".modal-content");u({parentNode:a,text:"Salir",classNameType:"secondary",className:"close-event-btn"}),document.querySelector(".close-event-btn").addEventListener("click",()=>{s.close()})},M=async o=>{const{token:t}=JSON.parse(localStorage.getItem("user"));try{c("Eliminando Evento");const e=await f({method:"DELETE",url:`v1/events/${o}`,token:t}),n=await e.json();if(e.ok){const s=document.querySelector(`[data-event-id="${o}"]`);s&&s.remove(),c("close"),S(),l("Evento Eliminado con éxito")}else l("Error en la eliminación del evento",n.message),c("close")}catch(e){l(`Error en la red: ${e.message}`),c("close")}},J=async o=>{try{const{id:t,token:e}=JSON.parse(localStorage.getItem("user"));(await f({method:"PUT",url:`v1/events/${o}`,token:e,body:{participants:t}})).ok?l("Has sido añadido correctamente"):l("Error, no has sido añadido al evento")}catch(t){l("Error inesperado",t)}},z=async o=>{const{id:t,token:e}=JSON.parse(localStorage.getItem("user"));try{const n=await f({method:"PUT",url:`v1/events/${o}`,token:e,body:{participants:t,leave:!0}}),s=n.json();n.ok?l("Has sido eliminado del evento correctamente"):l("Error al eliminarte del evento",s.message)}catch(n){l("Error inesperado",n.message)}},F=async o=>{o.stopPropagation();const t=o.target,e=t.dataset.eventId;t.dataset.attending==="true"?(await z(e),t.dataset.attending="false",t.innerHTML="Asistir"):(await J(e),t.dataset.attending="true",t.innerHTML="❤️‍🔥 Dejar de asistir")},D=()=>{document.querySelectorAll(".attend").forEach(o=>{o.addEventListener("click",F)})},_=async()=>{c("Cargando Eventos");const t=await(await f({method:"GET",url:"v1/events"})).json(),e=document.querySelector("#events-container");for(const a of t){const r=a.date,m=new Date(r).toLocaleDateString("es-Es",{day:"2-digit",month:"2-digit",year:"numeric"}),d=document.createElement("li");d.classList.add("li-event","flex-container"),d.eventData=a;const p=JSON.parse(localStorage.getItem("user"));if(!p)d.innerHTML=`
      <div class="day flex-container">
      <p>${m.split("/")[0]}</p>
      </div>
      <div class="data flex-container">
      <h3 class="event-title">${a.title}</h3>
      <div class="event-info flex-container">
       <p class="date">${m}</p>
      <p class="location">${a.location}</p>
      </div>
      </div>
          `,e==null||e.appendChild(d);else if(p.rol==="admin")d.classList.add("li-event-in"),d.innerHTML=`
      <div class="day flex-container">
      <p>${m.split("/")[0]}</p>
      </div>
      <div class="data flex-container">
      <h3 class="event-title">${a.title}</h3>
      <div class="event-info flex-container">
      <p class="date">${m}</p>
      <p class="location">${a.location}</p>
      </div>
      </div>
      `,e==null||e.appendChild(d),u({parentNode:d,text:"Eliminar",classNameType:"primary",className:"delete-event-btn"});else{d.classList.add("li-event-in"),d.innerHTML=`
      <div class="day flex-container">
      <p>${m.split("/")[0]}</p>
      </div>
      <div class="data flex-container">
      <h3 class="event-title">${a.title}</h3>
      <div class="event-info flex-container">
      <p class="date">${m}</p>
      <p class="location">${a.location}</p>
      </div>
      </div>
      `,e==null||e.appendChild(d);const v=p.id,g=a.participants.some(A=>A._id===v),h=u({parentNode:d,text:"ASISTIR",classNameType:"primary",className:"attend"});h.dataset.eventId=a._id,h.dataset.attending=g?"true":"false",h.innerHTML=g?"❤️‍🔥 Dejar de asistir":"Asistir",e.appendChild(d)}D(),c("close")}document.querySelectorAll(".delete-event-btn").forEach(a=>{a.addEventListener("click",r=>{r.stopPropagation(),M(r.target.offsetParent.eventData._id)})});const s=document.querySelectorAll(".li-event-in");for(const a of s)a.addEventListener("click",()=>{const r=a.eventData;k(r._id)})},G=o=>{const t=JSON.parse(localStorage.getItem("user")),e=document.querySelector("#events-container");e.innerHTML="";for(const a of o){const r=a.date,m=new Date(r).toLocaleDateString("es-Es",{day:"2-digit",month:"2-digit",year:"numeric"}),d=document.createElement("li");if(d.classList.add("li-event","flex-container"),d.eventData=a,t.rol==="admin")d.classList.add("li-event-in"),d.innerHTML=`
      <div class="day flex-container">
      <p>${m.split("/")[0]}</p>
      </div>
      <div class="data flex-container">
      <h3 class="event-title">${a.title}</h3>
      <div class="event-info flex-container">
      <p class="date">${m}</p>
      <p class="location">${a.location}</p>
      </div>
      </div>
      `,e==null||e.appendChild(d),u({parentNode:d,text:"Eliminar",classNameType:"primary",className:"delete-event-btn"});else{d.classList.add("li-event-in"),d.innerHTML=`
      <div class="day flex-container">
      <p>${m.split("/")[0]}</p>
      </div>
      <div class="data flex-container">
      <h3 class="event-title">${a.title}</h3>
      <div class="event-info flex-container">
      <p class="date">${m}</p>
      <p class="location">${a.location}</p>
      </div>
      </div>
      `,e==null||e.appendChild(d);const p=t.id,v=a.participants.some(h=>h._id===p),g=u({parentNode:d,text:"ASISTIR",classNameType:"primary",className:"attend"});g.dataset.eventId=a._id,g.dataset.attending=v?"true":"false",g.innerHTML=v?"❤️‍🔥 Dejar de asistir":"Asistir",e.appendChild(d)}D()}document.querySelectorAll(".delete-event-btn").forEach(a=>{a.addEventListener("click",r=>{r.stopPropagation(),M(r.target.offsetParent.eventData._id)})});const s=document.querySelectorAll(".li-event-in");for(const a of s)a.addEventListener("click",()=>{const r=a.eventData;k(r._id)})},W=async(o,t)=>{const{token:e}=JSON.parse(localStorage.getItem("user"));try{c("Ordenando...");const n=await f({method:"GET",url:`v1/events/sorted?sort=${o}`,token:e}),s=await n.json();n.ok?(c("close"),G(s),l(`Eventos ordenados ${t.toLowerCase()}`)):(c("close"),l("Error al ordenar los eventos",s.message))}catch(n){c("close"),l("Error en la conexión",n.message)}},Z=()=>{if(JSON.parse(localStorage.getItem("user"))){const t=document.querySelector(".welcome-container"),e=document.createElement("select");e.id="sort-by-choose";const n=document.createElement("option");n.textContent="Ordena los eventos",n.disabled=!0,n.selected=!0,n.hidden=!0;const s=document.createElement("option");s.value="date",s.textContent="Por fecha";const a=document.createElement("option");a.value="popularity",a.textContent="Por popularidad",e.appendChild(n),e.appendChild(s),e.appendChild(a),t.appendChild(e),e.addEventListener("change",r=>{const i=r.target.options[r.target.selectedIndex];W(i.value,i.textContent)})}},Y=()=>{const o=JSON.parse(localStorage.getItem("user"));return`
<section id="events">
<div class="welcome-container">
${o?`<h3>Bienvenid@ ${o.name}</h3>`:"<h3>➡️ Registrate, por favor ⬅️</h3>"}
</div>
<ul id="events-container" class="flex-container"></ul>
</section>
`},S=o=>{o&&o.preventDefault(),window.history.pushState("","","/events"),document.querySelector("main").innerHTML=Y();const e=window.location.pathname.split("/")[3];setTimeout(()=>{e&&R(e)},0),Z(),_()},$=async(o,t)=>{const e=o||document.querySelector("#email").value,n=t||document.querySelector("#password").value;try{c("Login en marcha");const s=await f({method:"POST",url:"v1/users/login",body:{email:e,password:n}}),a=await s.json();if(!s.ok){l("Error en el login",a.message),c("close");return}const r=a.user;localStorage.setItem("user",JSON.stringify({id:r._id,token:a.token,name:r.nameUser,img:r.img,rol:r.rol})),b(),S(),l("Logueado con éxito")}catch(s){console.error("Error en la petición de login:",s.message)}},P=()=>{document.querySelectorAll("input").forEach(t=>{const e=document.querySelector(`label[for="${t.id}"]`),n=e.textContent.replace("✔️","").replace("❌","").trim();t.addEventListener("focus",()=>{e.style.color="#4a90e2",e.style.fontSize="1.1rem"}),t.addEventListener("blur",()=>{t.value===""?(e.textContent=n,e.style.color="#444",e.style.fontSize="1rem"):t.id==="email"?/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(t.value)?(e.textContent=`${n} ✔️`,e.style.color="#008f39"):(e.textContent=`${n} ❌`,e.style.color="#e74c3c"):(e.textContent=`${n} ✔️`,e.style.color="#008f39")})})},K=()=>{const o=document.querySelector("#recover-modal"),t=o==null?void 0:o.querySelector(".recover-form"),e=document.querySelector("#emailrec");t==null||t.addEventListener("submit",async n=>{n.preventDefault();const s=e.value;if(!s.trim()){l("Introduce un correo válido");return}o.close();try{c("Te estamos enviando un correo...");const a=await f({method:"POST",url:"auth/forgot-password",body:{email:s}}),r=await a.json();a.ok?(c("close"),w(),l("Correo de recuperación enviado!")):(c("close"),l("Algo pasa, email incorrecto o usuario no registrado",r.message))}catch(a){c("close"),l("❌ Error de conexión con el servidor",a.message)}})},Q=()=>{const o=document.querySelector(".login");y({parentNode:o,id:"recover-modal"});const t=document.querySelector("#recover-modal");t.innerHTML=`
  <div class="modal-container">
    <form method="post" class="recover-form flex-container">
      <h2>Recuperar contraseña</h2>
      <label for="emailrec">Introduce tu correo:</label>
      <input type="email" id="emailrec" name="emailrec" placeholder="email">
    </form>
  </div>
  `;const e=document.querySelector(".recover-form");u({parentNode:e,text:"Recuperar contraseña",classNameType:"primary",className:"recover-btn"});const n=document.querySelector(".recover-btn");n.type="submit",n.addEventListener("click",()=>{K()}),u({parentNode:e,text:"Cerrar",classNameType:"secondary",id:"close-dialog"});const s=document.querySelector("#recover-password"),a=document.querySelector("#recover-modal"),r=document.querySelector("#close-dialog");s==null||s.addEventListener("click",i=>{i.preventDefault(),a.showModal()}),r==null||r.addEventListener("click",i=>{i.preventDefault(),a.close()})},V=()=>`
<section class="login">
${localStorage.getItem("user")?"<h2>Ya estás Logueado</h2>":`<form>
  <label for="email">Email</label>
  <input type="email" placeholder="Email" id="email"/>

  <label for="password">Contraseña</label>
  <input type="password" placeholder="Contraseña" id="password"  />
  </form>
  `}
</section>
`,w=(o,t,e)=>{o&&o.preventDefault(),window.history.pushState("","","/login"),document.querySelector("main").innerHTML=V();const n=document.querySelector(".login > form");u({parentNode:n,text:"Login",classNameType:"primary",id:"loginbtn"}),u({parentNode:n,text:"¿Olvidaste tu contraseña?",classNameType:"secondary",id:"recover-password"}),Q(),P();try{document.querySelector("#loginbtn").addEventListener("click",s=>{s.preventDefault(),$(t,e)})}catch{console.log("Estamos logueado")}},X=()=>{const o=document.querySelector(".info-user");y({parentNode:o,id:"event-modal"});const t=document.querySelector("#event-modal");t.innerHTML=`
    <div class="modal-content flex-container">
      <form id="event-form" method="dialog">
        <h2>Crear Nuevo Evento</h2>
        <label for="event-title">Título del Evento:</label>
        <input type="text" id="event-title" name="event-title" placeholder="Título" required />
        <label for="eventImgInput">Portada del Evento:</label>
        <input type="file" id="eventImgInput" accept="image/*" />
        <label for="event-date">Fecha del Evento:</label>
        <input type="date" id="event-date" required />
        <label for="event-location">Localización del Evento:</label>
        <input type="text" id="event-location" required />
        <label for="event-description">Descripción del Evento:</label>
        <textarea id="event-description"></textarea>
      </form>
    </div>`;const e=document.querySelector("#event-form");u({parentNode:e,text:"Crear Evento",classNameType:"primary",id:"eventBtnGo"}),u({parentNode:e,text:"Cancelar",classNameType:"secondary",id:"close-event-modal"}),document.querySelector("#close-event-modal").addEventListener("click",()=>{document.querySelector("#event-form").reset(),t.close()});const s=document.querySelector("#event-description");s.addEventListener("input",()=>{s.style.height="auto",s.style.height=`${s.scrollHeight}px`})},ee=()=>{const o=document.querySelector(".info-user");y({parentNode:o,id:"events-modal"});const t=document.querySelector("#events-modal");t.innerHTML=`
  <div class="modal-inner flex-container">
    <h2>Eventos Reservados</h2>
    <ul id="attending-events" class="flex-container"></ul>
  </div>`;const e=document.querySelector(".modal-inner");u({parentNode:e,text:"Salir",classNameType:"secondary",className:"close-events-btn"}),document.querySelector(".close-events-btn").addEventListener("click",()=>{t.close()})},te=async()=>{const{id:o,token:t}=JSON.parse(localStorage.getItem("user"));try{c("Eliminando tu cuenta");const e=await f({method:"DELETE",url:`v1/users/${o}`,token:t}),n=await e.json();if(e.ok){c("close"),localStorage.removeItem("user"),document.querySelector("main").innerHTML="",S(),l(`Tu cuenta fue eliminada, ${user.name}`);return}else c("close"),l("No se pudo eliminar tu cuenta",n.message)}catch(e){c("close"),l("Error en la conexión a la red",e.message)}},oe=()=>{const o=document.querySelector(".info-user");y({parentNode:o,id:"delete-modal"});const t=document.querySelector("#delete-modal");t.innerHTML=`
  <div class="delete-modal-inner flex-container">
    <h2>Eliminar Cuenta</h2>
    <p>¿Desea eliminar su cuenta?</p>
  </div>
  `,y({parentNode:o,id:"confirm-delete-modal"});const e=document.querySelector("#confirm-delete-modal");e.innerHTML=`
  <div class="inner-confirm-delete-modal flex-container">
    <h2>¡ADVERTENCIA!</h2>
    <p>¿Estás a punto de eliminar tu cuenta?</p>
    <div class="btn-container flex-container"></div>
</div>
  `;const n=document.querySelector(".delete-modal-inner");u({parentNode:n,text:"Eliminar Cuenta",classNameType:"primary",className:"delete-account-btn"}),u({parentNode:n,text:"Salir",classNameType:"secondary",className:"close-delete-btn"});const s=document.querySelector(".delete-account-btn"),a=document.querySelector(".close-delete-btn");s.addEventListener("click",()=>{e.showModal()}),a.addEventListener("click",()=>{t.close()});const r=document.querySelector(".btn-container");u({parentNode:r,text:"Sí",classNameType:"secondary",className:"delete-yes-btn"}),u({parentNode:r,text:"No",classNameType:"primary",className:"delete-no-btn"});const i=document.querySelector(".delete-yes-btn"),m=document.querySelector(".delete-no-btn");i.addEventListener("click",()=>{te()}),m.addEventListener("click",()=>{e.close(),t.close()})},ne=async()=>{const o=document.querySelector("#mod-username"),t=document.querySelector("#mod-email"),e=document.querySelector("#mod-password"),n=document.querySelector(".label-re-pass"),s=document.querySelector("#mod-repeat-password");if(e.value!==s.value)n.style.color="red",l("Las contraseñas no coinciden");else{const{id:a,token:r}=JSON.parse(localStorage.getItem("user")),i={};o.value.trim()&&(i.nameUser=o.value.trim()),t.value.trim()&&(i.email=t.value.trim()),e.value.trim()&&(i.password=e.value.trim());try{const m=await f({method:"PUT",url:`v1/users/${a}`,token:r,body:i}),d=await m.json();if(m.ok){const p={...JSON.parse(localStorage.getItem("user")),...i};localStorage.setItem("user",JSON.stringify(p)),L(),l("Perfil Actualizado")}else l("Error al actualizar el Perfil",d.message)}catch(m){l("Error en la Conexión",m.message)}}},ae=()=>{const o=document.querySelector(".info-user");y({parentNode:o,id:"mod-profile-modal"});const t=document.querySelector("#mod-profile-modal");t.innerHTML=`
  <div class="modal-container">
  <h2>Modificar Perfil</h2>
  <form id="mod-profile" method="dialog" enctype="multipart/form-data">
  
  <label for="username">Nombre</label>
  <input type="text" id="mod-username" placeholder="Nombre"/>
  
  <label for="email">Email</label>
  <input type="email" id="mod-email" placeholder="Email" />
  
  <label for="password">Contraseña</label>
  <input type="password" id="mod-password" placeholder="Contraseña" autocomplete="new-password"/>
  
  <label for="password" class="label-re-pass">Repetir Contraseña</label>
  <input type="password" id="mod-repeat-password" placeholder="Repetir contraseña" autocomplete="new-password"/>
  
  </form>
  </div>`;const e=document.querySelector("#mod-profile");u({parentNode:e,text:"Modificar",classNameType:"primary",className:"mod-profile-btn"}),u({parentNode:e,text:"Salir",classNameType:"secondary",className:"close-mod-profile-btn"});const n=document.querySelector(".mod-profile-btn"),s=document.querySelector(".close-mod-profile-btn");n.addEventListener("click",()=>{ne()}),s.addEventListener("click",()=>{e.reset(),t.close()})},se=()=>{const o=document.querySelector(".profileImgInput"),t=document.querySelector("#makeChangeImg"),e=document.querySelector("#changeImg-modal");o||console.log("No se encontró el input de la imagen"),t==null||t.addEventListener("click",async()=>{const n=o.files[0];if(!n){l("Selecciona una imagen");return}e.close(),c("Cambiando imagen");const s=new FormData;s.append("img",n);const{id:a,token:r}=JSON.parse(localStorage.getItem("user"));try{(await f({method:"PUT",url:`v1/users/${a}`,token:r,formData:s})).ok||l("Error al subir la imagen"),L(),l("Tu imagen se ha actualizado")}catch{l("Hubo un error para cambiar la imagen")}})},re=()=>{const o=document.querySelector("#profile");y({parentNode:o,id:"changeImg-modal"});const t=document.querySelector("#changeImg-modal");t.innerHTML=`
  <form id="changeImg-form" class="flex-container" method="dialog">
    <h2>Cambio de Imagen</h2>
    <input
      type="file"
      class="profileImgInput"
      accept="image/*" />
  </form>
  `;const e=document.querySelector("#changeImg-form"),n=document.querySelector(".div-img");u({parentNode:n,text:"Cambiar Imagen",classNameType:"primary",className:"change-img"}),document.querySelector(".change-img").addEventListener("click",()=>{t.showModal()}),u({parentNode:e,text:"Haz el cambio",classNameType:"primary",id:"makeChangeImg"}),se(),u({parentNode:e,text:"Cancelar",classNameType:"secondary",id:"close-changeImg"});const s=document.querySelector("#close-changeImg");s==null||s.addEventListener("click",a=>{a.preventDefault(),t.close()})},ce=async()=>{const{id:o,token:t}=JSON.parse(localStorage.getItem("user"));try{c("Cargando tu perfil");const e=await f({method:"GET",url:`v1/users/${o}`,token:t}),n=await e.json();if(e.ok){c("close");const s=document.querySelector(".nameUser"),a=document.querySelector(".emailUser"),r=document.querySelector(".user-img");r.src=n.img,s.textContent=n.nameUser,a.textContent=n.email}else c("close"),l("No se pudo cargar tu perfil",n.message)}catch(e){c("close"),l("Error en la conexión,",e.message)}},le=async()=>{const{token:o}=JSON.parse(localStorage.getItem("user"));try{c("Cargando a los malotes");const t=await f({method:"GET",url:"v1/users",token:o}),e=await t.json();if(t.ok)return c("close"),e;c("close"),l("Hubo un error en la búsqueda",e.message)}catch(t){c("close"),l("Hubo un error en la conexión",t.message)}},ie=async o=>{const{token:t}=JSON.parse(localStorage.getItem("user"));try{c("Eliminando al usuario...");const e=await f({method:"DELETE",url:`v1/users/${o}`,token:t}),n=e.json();e.ok?(c("close"),L(),l("Usuario eliminado con éxito")):(c("close"),l("Error en la eliminación del usuario",n.message))}catch(e){c("close"),l("Error en la conexión",e.message)}},de=async()=>{const o=document.querySelector(".info-user");y({parentNode:o,id:"delete-user-modal"});const t=document.querySelector("#delete-user-modal");t.innerHTML=`
  <div class="modal-inner">
  <form id="user-delete-form" class="flex-container">
    <h2>Eliminar Usuarios</h2>
    <label for="users-select">Selecciona al usuario que quieres eliminar</label>
    <select name="select" id="users-select">
    <option value="" selected disabled>Selecciona un usuario</option>
    </select>
    </form>
  </div>`;const e=await le(),n=document.querySelector("#users-select");e.forEach(p=>{if(p.rol!=="admin"){const v=document.createElement("option");v.value=p._id,v.textContent=p.nameUser,n.appendChild(v)}});const s=document.querySelector("#user-delete-form");u({parentNode:s,text:"Salir",classNameType:"secondary",id:"close-user-delete-modal-btn"}),document.querySelector("#close-user-delete-modal-btn").addEventListener("click",()=>{t.close()}),y({parentNode:o,id:"confirm-del-user-modal"});const r=document.querySelector("#confirm-del-user-modal");r.innerHTML=`
  <div class="modal-inner">
  <h2>¿Deseas eliminar a este Usuario?</h2>
  <p class="user-to-del"></p>
  </div>
  <div class="btn-container-admin flex-container">
  </div>
  `,n.addEventListener("change",p=>{const v=p.target.options[p.target.selectedIndex];r.dataset.value=v.value;const g=document.querySelector(".user-to-del");g.textContent=`🤝 ${v.textContent}`,r.showModal()});const i=document.querySelector(".btn-container-admin");u({parentNode:i,text:"Sí",classNameType:"primary",className:"confirm-yes-del-user-btn"}),document.querySelector(".confirm-yes-del-user-btn").addEventListener("click",()=>{ie(r.dataset.value),r.close(),t.close()}),u({parentNode:i,text:"No",classNameType:"secondary",className:"confirm-no-del-user-btn"}),document.querySelector(".confirm-no-del-user-btn").addEventListener("click",()=>{r.close(),t.close()}),t.showModal()},me=async()=>{const{id:o,token:t}=JSON.parse(localStorage.getItem("user"));try{c("Cargando tus próximos eventos");const e=await f({method:"GET",url:`v1/events/user/${o}`,token:t}),n=await e.json();if(e.ok){const s=document.querySelector("#attending-events");s.innerHTML="";for(const a of n){const r=a.date,m=new Date(r).toLocaleDateString("es-Es",{day:"2-digit",month:"2-digit",year:"numeric"}),d=document.createElement("li");d.classList.add("li-event-user","flex-container");const p=document.createElement("h2");p.textContent=a.title;const v=document.createElement("div");v.classList.add("info-event-resume","flex-container");const g=document.createElement("p");g.textContent=m;const h=document.createElement("p");h.textContent=a.location,v.appendChild(g),v.appendChild(h),d.appendChild(p),d.appendChild(v),s.appendChild(d)}c("close")}else c("close"),l("Hubo un error en tu lista de eventos")}catch(e){c("close"),l("Error en la petición de eventos reservados:",e.message)}};let I=!1;const ue=async()=>{const o=document.querySelector("#eventBtnGo");I||(I=!0,o.addEventListener("click",async()=>{const t=document.querySelector("#event-modal"),e=document.querySelector("#event-title"),n=document.querySelector("#eventImgInput"),s=document.querySelector("#event-date"),a=document.querySelector("#event-location"),r=document.querySelector("#event-description"),i=n.files[0];if(!i){l("Selecciona una imagen");return}t.close();const m=new FormData;m.append("title",e.value),m.append("img",i),m.append("date",s.value),m.append("location",a.value),m.append("description",r.value);try{c("Creando nuevo Evento");const{token:d}=JSON.parse(localStorage.getItem("user")),p=await f({method:"POST",url:"v1/events",token:d,formData:m}),v=await p.json();p.ok?(c("close"),S(),l("Evento Creado con éxito")):(c("close"),l("Error al publicar el nuevo Evento:",v.message))}catch(d){c("close"),l("Error en la conexión:",d.message)}}))},pe=()=>{const o=document.querySelector(".delete-user");o&&o.addEventListener("click",()=>{de()}),document.querySelectorAll(".ul-tasks li").forEach(e=>{const n=e.classList[0];e.addEventListener("click",()=>{switch(n){case"create-event":const s=document.querySelector("#event-modal");ue(),s.showModal();break;case"attending-events":document.querySelector("#events-modal").showModal(),me();break;case"modify-profile":document.querySelector("#mod-profile-modal").showModal();break;case"delete-account":document.querySelector("#delete-modal").showModal();break}})}),c("close")},ve=()=>`
${JSON.parse(localStorage.getItem("user")).rol==="admin"?`<section id="profile" class="flex-container">
      <div class="div-img flex-container">
        <img class="user-img"></img>
      </div>

      <div class="info-user flex-container">
        <div class="header-info">
        <h2 class="nameUser"></h2>
        <p class="emailUser"></p>
      </div>

      <div id="tasks" class="flex-container">
        <ul class="ul-tasks flex-container">
          <li class="create-event">Crear Evento</li>
          <li class="attending-events">Eventos reservados</li>
          <li class="modify-profile">Modificar Perfil</li>
          <li class="delete-user">Eliminar Usuario</li>
        </ul>
      </div>
      </div>
    </section>`:`<section id="profile" class="flex-container">
      <div class="div-img flex-container">
        <img class="user-img"></img>
      </div>

      <div class="info-user flex-container">
        <div class="header-info">
        <h2 class="nameUser"></h2>
        <p class="emailUser"></p>
        </div>

      <div id="tasks" class="flex-container">
        <ul class="ul-tasks flex-container">
          <li class="create-event">Crear Evento</li>
          <li class="attending-events">Eventos reservados</li>
          <li class="modify-profile">Modificar Perfil</li>
          <li class="delete-account">Eliminar Cuenta</li>
        </ul>
      </div>
      </div>
    </section>`}`,L=o=>{o&&o.preventDefault(),window.history.pushState("","","/profile"),document.querySelector("main").innerHTML=ve(),c("Cargando tu perfil"),ce(),re(),X(),ee(),ae(),oe(),pe()},fe=async()=>{const o=document.querySelector("#username").value,t=document.querySelector("#email").value,e=document.querySelector("#password").value,n=document.querySelector("#userimg").files[0];if([o,t,e].some(r=>!r.trim())){l("Faltan datos para registrarte");return}const a=new FormData;a.append("nameUser",o),a.append("email",t),a.append("password",e),n&&a.append("img",n);try{c("Creando tu Cuenta");const r=await f({method:"POST",url:"v1/users/register",formData:a}),i=await r.json();if(r.ok){$(t,e);return}else c("close"),l("Error al registrar:",i.message)}catch(r){c("close"),l("No se pudo conectar al servidor",r.message)}},ge=()=>`
<section class="register" >
  <h2>Registrarse</h2>
  <form method="POST" enctype="multipart/form-data">
    <label for="username">Nombre</label>
    <input type="text" placeholder="Nombre" id="username" required/>

    <label for="email">Email</label>
    <input type="email" placeholder="Email" id="email" required/>

    <label for="password">Contraseña</label>
    <input type="password" placeholder="Contraseña" id="password" required autocomplete="new-password"/>

    <label for="userimg">Foto de perfil</label>
    <input type="file" id="userimg" accept=".jpg,.jpeg,.png,.gif,.webp">

    </form>
</section>
`,ye=o=>{o&&o.preventDefault(),window.history.pushState("","","/register"),document.querySelector("main").innerHTML=ge();const t=document.querySelector(".register > form");u({parentNode:t,text:"Crear cuenta",classNameType:"primary",id:"registerbtn"}),P(),document.querySelector("#registerbtn").addEventListener("click",e=>{e.preventDefault(),fe()})},b=()=>{var n,s,a,r,i;const o=document.querySelector(".div-nav");let t=document.querySelector(".navBar");t||(t=document.createElement("nav"),t.classList.add("navBar","flex-container"),o.appendChild(t));let e=t.querySelector("ul");e||(e=document.createElement("ul"),e.classList.add("ul-navBar","flex-container"),t.appendChild(e)),e.innerHTML=`
  <li>
    <a id="eventsLink" href="#events">Eventos</a>
  </li>
  ${JSON.parse(localStorage.getItem("user"))?`
  <li>
    <a id="profileLink" href="#profile">Perfil</a>
  </li>
  <li>
    <a id="logoutLink" href="#logout">Salir</a>
  </li>
  `:`
  <li>
    <a id="registerLink" href="#register">Registrarse</a>
  </li>
  <li>
    <a id="loginLink" href="#login">Loguearse</a>
  </li>
  `}
`,(n=t.querySelector("#eventsLink"))==null||n.addEventListener("click",m=>S(m)),(s=t.querySelector("#registerLink"))==null||s.addEventListener("click",m=>ye(m)),(a=t.querySelector("#loginLink"))==null||a.addEventListener("click",m=>{w(m)}),(r=t.querySelector("#profileLink"))==null||r.addEventListener("click",m=>{L(m)}),(i=document.querySelector("#logoutLink"))==null||i.addEventListener("click",()=>{localStorage.removeItem("user"),document.querySelector("main").innerHTML="",w(),b(),l("Hasta pronto 🫶!",5e3)})},he=o=>{const t=document.createElement("div");t.classList.add("toggle-container");const e=document.createElement("div");e.classList.add("sun-moon"),t.appendChild(e),o.appendChild(t),document.querySelector(".toggle-container").addEventListener("click",()=>{const s=document.querySelector("body");s.classList.toggle("night");const a=document.querySelector(".img-logo");s.classList.contains("night")?a.src="/darkLogo.png":a.src="/lightLogo.png"})},Se=()=>{const o=document.querySelector("footer");o.innerHTML=`
<section class="footer-section flex-container">
  <div class="who-we-are flex-container">
    <h3>¿Quienes somos?</h3>
    <p>Somos un portal especializado en la gestión integral de eventos. Nuestro objetivo es conectar a personas, empresas y organizaciones con experiencias memorables, personalizadas y eficientes. Contamos con un equipo profesional y tecnología que facilita la planificación, organización y seguimiento de todo tipo de eventos, desde reuniones corporativas hasta celebraciones sociales.</p>
  </div>
  <div class="follow-social-media flex-container">
    <h3>Síguenos en redes!</h3>
    <div class="logo-container flex-container">
    <div class="flex-container">
      <a href="#"><img src="/footerImg/facebook.svg" alt="facebook"></a>
      </div>
      <div class="flex-container">
      <a href="#"><img src="/footerImg/instagram.svg" alt="instagram"></a>
      </div>
      <div class="flex-container">
      <a href="#"><img src="/footerImg/linkedin.svg" alt="linkedin"></a>
      </div>
      <div class="flex-container">
      <a href="#"><img src="/footerImg/whatsapp.svg" alt="whatsapp"></a>
      </div>
      <div class="flex-container">
      <a href="#"><img src="/footerImg/x.svg" alt="x"></a>
      </div>
    </div>
  </div>

</section>
<section class="legality">
  <ul class="ul-legality flex-container">
    <li class="legal-advice"><a href="#">Aviso legal</a></li>
    <li class="privacy"><a href="#">Privacidad y Cookies</a></li>
  </ul>
<section>
`},E=document.querySelector("#app");E.className="flex-container";const x=document.createElement("header");x.classList.add("header","flex-container");const N=document.createElement("div");N.classList.add("div-logo","flex-container");const q=document.createElement("img");q.className="img-logo";q.src="/darkLogo.png";q.addEventListener("click",()=>S());const C=document.createElement("div");C.classList.add("div-nav","flex-container");const T=document.createElement("h1");T.textContent="Organizador de Eventos";T.classList.add("main-title","flex-container");const H=document.createElement("main");H.classList.add("main","flex-container");const O=document.createElement("footer");O.classList.add("footer","flex-container");N.appendChild(q);C.appendChild(T);x.appendChild(N);x.appendChild(C);he(E);E.appendChild(x);E.appendChild(H);E.appendChild(O);document.body.appendChild(E);b();S();Se();window.addEventListener("beforeunload",()=>{localStorage.removeItem("user")});
