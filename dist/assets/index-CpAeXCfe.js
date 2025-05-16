(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function e(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(s){if(s.ep)return;s.ep=!0;const n=e(s);fetch(s.href,n)}})();const u=({parentNode:a,text:t,classNameType:e,className:o="",id:s=""})=>{const n=document.createElement("button");return n.textContent=t,n.className="flex-container",n.classList.add(e),o&&n.classList.add(o),s&&(n.id=s),a.appendChild(n),n},y=({parentNode:a,className:t="",id:e=""})=>{const o=document.createElement("dialog");return o.classList.add("modal","flex-container"),t&&o.classList.add(...t.split(" ")),e&&(o.id=e),a.appendChild(o),o},U=()=>{const a=document.querySelector("header");a.innerHTML='<h2 class="recTitle">RECUPERACIÓN DE CONTRASEÑA</h2>';const t=document.querySelector("main");t.innerHTML="",y({parentNode:t,id:"reset-modal"});const e=document.querySelector("#reset-modal");e.innerHTML=`
  <div class="modal-container">
    <form id="reset-form" method="dialog">
      <h2>🔐 Nueva contraseña</h2>
      <input type="password" id="new-password" placeholder="Nueva contraseña" required/>
      <input type="password" id="renew-password" placeholder="Repetir contraseña" required/>
    </form>
  </div>
  `;const o=document.querySelector("#reset-form");u({parentNode:o,text:"Actualizar contraseña",classNameType:"primary",className:"update-pass-btn"}),document.querySelector(".footer").innerHTML=""},c=a=>{let t=document.querySelector("#dialog-loader");if(a==="close"){t&&t.remove();return}if(t){const i=t.querySelector(".text-waiting");i&&(i.textContent=a);return}const e=document.createElement("dialog");e.setAttribute("id","dialog-loader"),e.classList.add("flex-container");const o=document.createElement("div");o.classList.add("loader");const s=document.createElement("div");s.classList.add("text-wait-container");const n=document.createElement("p");n.classList.add("text-waiting"),n.textContent=`${a}`;const r=document.querySelector("main");s.appendChild(n),e.appendChild(o),e.appendChild(s),r.appendChild(e)},l=(a,t=3e3)=>{const e=document.createElement("div");e.classList.add("message-modal","hidden");let o=document.createElement("p");o.classList.add("message-text"),o.textContent=`${a}`;const s=document.querySelector("main");e.appendChild(o),s.appendChild(e),e.classList.remove("hidden"),e.classList.add("show"),setTimeout(()=>{e.classList.remove("show"),setTimeout(()=>{e.classList.add("hidden")},500)},t)},f=async({method:a,url:t,token:e="",body:o=null,formData:s=null})=>{try{const n={},r={method:a,headers:n};return e&&(n.Authorization=`Bearer ${e}`),a!=="GET"&&(s?r.body=s:o&&(n["Content-Type"]="application/json",r.body=JSON.stringify(o))),await fetch(`http://localhost:3000/api/${t}`,r)}catch(n){c("close"),l("Error de conexión con el servidor ❌",n.message)}},B=async a=>{const t=document.querySelector("#new-password"),e=document.querySelector("#renew-password"),o=document.querySelector("#reset-modal");if(t.value===e.value){c("Actualizando tu contraseña");try{const s=await f({method:"POST",url:`auth/reset-password/${a}`,body:{password:t.value}}),n=await s.json();s.ok?(c("close"),l("Contraseña actualizada ✅"),o.close(),window.location.href="/login"):l("Error al actualizar la contraseña ❌",n.message)}catch(s){c("close"),l("Error de conexión con el servidor ❌",s.message)}}else c("close"),l("Las contraseñas no coinciden")},R=a=>{U();const t=document.querySelector("#reset-modal"),e=document.querySelector(".update-pass-btn"),o=document.querySelector("#close-reset");t&&t.showModal(),e.addEventListener("click",()=>{B(a)}),o==null||o.addEventListener("click",()=>{t.close()})},j=async a=>{const{token:t}=JSON.parse(localStorage.getItem("user"));try{c("Cargando evento...");const e=await f({method:"GET",url:`v1/events/${a}`,token:t}),o=await e.json();return e.ok||l("Error en la recuperación de los detalles del evento:",o.message),c("close"),o}catch(e){c("close"),l("Error al obtener detalles del evento:",e.message)}},k=async a=>{const t=await j(a),e=document.querySelector("#events"),o=document.querySelector("#event-details");o&&o.remove(),y({parentNode:e,id:"event-details"});const s=document.querySelector("#event-details");s.innerHTML=`
  <div class="modal-content flex-container">
    <h2>${t.title}</h2>
    <div class="img-container">
      <img class="event-img" src=${t.img} alt=${t.title}/>
    </div>
    <p class="description">${t.description}</p>
    <p class="participants">Asistentes: ${t.participants.map(i=>i.nameUser).join(", ")}</p>
  </div>
`,s.showModal();const n=document.querySelector(".modal-content");u({parentNode:n,text:"Salir",classNameType:"secondary",className:"close-event-btn"}),document.querySelector(".close-event-btn").addEventListener("click",()=>{s.close()})},M=async a=>{const{token:t}=JSON.parse(localStorage.getItem("user"));try{c("Eliminando Evento");const e=await f({method:"DELETE",url:`v1/events/${a}`,token:t}),o=await e.json();if(e.ok){const s=document.querySelector(`[data-event-id="${a}"]`);s&&s.remove(),c("close"),S(),l("Evento Eliminado con éxito")}else l("Error en la eliminación del evento",o.message),c("close")}catch(e){l(`Error en la red: ${e.message}`),c("close")}},J=async a=>{try{const{id:t,token:e}=JSON.parse(localStorage.getItem("user"));(await f({method:"PUT",url:`v1/events/${a}`,token:e,body:{participants:t}})).ok?l("Has sido añadido correctamente"):l("Error, no has sido añadido al evento")}catch(t){l("Error inesperado",t)}},z=async a=>{const{id:t,token:e}=JSON.parse(localStorage.getItem("user"));try{const o=await f({method:"PUT",url:`v1/events/${a}`,token:e,body:{participants:t,leave:!0}}),s=o.json();o.ok?l("Has sido eliminado del evento correctamente"):l("Error al eliminarte del evento",s.message)}catch(o){l("Error inesperado",o.message)}},F=async a=>{a.stopPropagation();const t=a.target,e=t.dataset.eventId;t.dataset.attending==="true"?(await z(e),t.dataset.attending="false",t.innerHTML="Asistir"):(await J(e),t.dataset.attending="true",t.innerHTML="❤️‍🔥 Dejar de asistir")},$=()=>{document.querySelectorAll(".attend").forEach(a=>{a.addEventListener("click",F)})},_=async()=>{c("Cargando Eventos");const t=await(await f({method:"GET",url:"v1/events"})).json(),e=document.querySelector("#events-container");for(const n of t){const r=n.date,m=new Date(r).toLocaleDateString("es-Es",{day:"2-digit",month:"2-digit",year:"numeric"}),d=document.createElement("li");d.classList.add("li-event","flex-container"),d.eventData=n;const p=JSON.parse(localStorage.getItem("user"));if(!p)d.innerHTML=`
      <div class="day flex-container">
      <p>${m.split("/")[0]}</p>
      </div>
      <div class="data flex-container">
      <h3 class="event-title">${n.title}</h3>
      <div class="event-info flex-container">
       <p class="date">${m}</p>
      <p class="location">${n.location}</p>
      </div>
      </div>
          `,e==null||e.appendChild(d);else if(p.rol==="admin")d.classList.add("li-event-in"),d.innerHTML=`
      <div class="day flex-container">
      <p>${m.split("/")[0]}</p>
      </div>
      <div class="data flex-container">
      <h3 class="event-title">${n.title}</h3>
      <div class="event-info flex-container">
      <p class="date">${m}</p>
      <p class="location">${n.location}</p>
      </div>
      </div>
      `,e==null||e.appendChild(d),u({parentNode:d,text:"Eliminar",classNameType:"primary",className:"delete-event-btn"});else{d.classList.add("li-event-in"),d.innerHTML=`
      <div class="day flex-container">
      <p>${m.split("/")[0]}</p>
      </div>
      <div class="data flex-container">
      <h3 class="event-title">${n.title}</h3>
      <div class="event-info flex-container">
      <p class="date">${m}</p>
      <p class="location">${n.location}</p>
      </div>
      </div>
      `,e==null||e.appendChild(d);const v=p.id,g=n.participants.some(A=>A._id===v),h=u({parentNode:d,text:"ASISTIR",classNameType:"primary",className:"attend"});h.dataset.eventId=n._id,h.dataset.attending=g?"true":"false",h.innerHTML=g?"❤️‍🔥 Dejar de asistir":"Asistir",e.appendChild(d)}$(),c("close")}document.querySelectorAll(".delete-event-btn").forEach(n=>{n.addEventListener("click",r=>{r.stopPropagation(),M(r.target.offsetParent.eventData._id)})});const s=document.querySelectorAll(".li-event-in");for(const n of s)n.addEventListener("click",()=>{const r=n.eventData;k(r._id)})},G=()=>{const a=document.querySelector("footer");a.innerHTML=`
<section class="footer-section flex-container">
  <div class="who-we-are flex-container">
    <h3>¿Quienes somos?</h3>
    <p>Somos un portal especializado en la gestión integral de eventos. Nuestro objetivo es conectar a personas, empresas y organizaciones con experiencias memorables, personalizadas y eficientes. Contamos con un equipo profesional y tecnología que facilita la planificación, organización y seguimiento de todo tipo de eventos, desde reuniones corporativas hasta celebraciones sociales.</p>
  </div>
  <div class="follow-social-media flex-container">
    <h3>Síguenos en redes!</h3>
    <div class="logo-container flex-container">
    <div class="flex-container">
      <a href="#"><img src="./src/assets/footerImg/facebook.svg" alt="facebook"></a>
      </div>
      <div class="flex-container">
      <a href="#"><img src="./src/assets/footerImg/instagram.svg" alt="instagram"></a>
      </div>
      <div class="flex-container">
      <a href="#"><img src="./src/assets/footerImg/linkedin.svg" alt="linkedin"></a>
      </div>
      <div class="flex-container">
      <a href="#"><img src="./src/assets/footerImg/whatsapp.svg" alt="whatsapp"></a>
      </div>
      <div class="flex-container">
      <a href="#"><img src="./src/assets/footerImg/x.svg" alt="x"></a>
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
`},W=a=>{const t=JSON.parse(localStorage.getItem("user")),e=document.querySelector("#events-container");e.innerHTML="";for(const n of a){const r=n.date,m=new Date(r).toLocaleDateString("es-Es",{day:"2-digit",month:"2-digit",year:"numeric"}),d=document.createElement("li");if(d.classList.add("li-event","flex-container"),d.eventData=n,t.rol==="admin")d.classList.add("li-event-in"),d.innerHTML=`
      <div class="day flex-container">
      <p>${m.split("/")[0]}</p>
      </div>
      <div class="data flex-container">
      <h3 class="event-title">${n.title}</h3>
      <div class="event-info flex-container">
      <p class="date">${m}</p>
      <p class="location">${n.location}</p>
      </div>
      </div>
      `,e==null||e.appendChild(d),u({parentNode:d,text:"Eliminar",classNameType:"primary",className:"delete-event-btn"});else{d.classList.add("li-event-in"),d.innerHTML=`
      <div class="day flex-container">
      <p>${m.split("/")[0]}</p>
      </div>
      <div class="data flex-container">
      <h3 class="event-title">${n.title}</h3>
      <div class="event-info flex-container">
      <p class="date">${m}</p>
      <p class="location">${n.location}</p>
      </div>
      </div>
      `,e==null||e.appendChild(d);const p=t.id,v=n.participants.some(h=>h._id===p),g=u({parentNode:d,text:"ASISTIR",classNameType:"primary",className:"attend"});g.dataset.eventId=n._id,g.dataset.attending=v?"true":"false",g.innerHTML=v?"❤️‍🔥 Dejar de asistir":"Asistir",e.appendChild(d)}$()}document.querySelectorAll(".delete-event-btn").forEach(n=>{n.addEventListener("click",r=>{r.stopPropagation(),M(r.target.offsetParent.eventData._id)})});const s=document.querySelectorAll(".li-event-in");for(const n of s)n.addEventListener("click",()=>{const r=n.eventData;k(r._id)})},Z=async(a,t)=>{const{token:e}=JSON.parse(localStorage.getItem("user"));try{c("Ordenando...");const o=await f({method:"GET",url:`v1/events/sorted?sort=${a}`,token:e}),s=await o.json();o.ok?(c("close"),W(s),l(`Eventos ordenados ${t.toLowerCase()}`)):(c("close"),l("Error al ordenar los eventos",s.message))}catch(o){c("close"),l("Error en la conexión",o.message)}},Y=()=>{if(JSON.parse(localStorage.getItem("user"))){const t=document.querySelector(".welcome-container"),e=document.createElement("select");e.id="sort-by-choose";const o=document.createElement("option");o.textContent="Ordena los eventos",o.disabled=!0,o.selected=!0,o.hidden=!0;const s=document.createElement("option");s.value="date",s.textContent="Por fecha";const n=document.createElement("option");n.value="popularity",n.textContent="Por popularidad",e.appendChild(o),e.appendChild(s),e.appendChild(n),t.appendChild(e),e.addEventListener("change",r=>{const i=r.target.options[r.target.selectedIndex];Z(i.value,i.textContent)})}},K=()=>{const a=JSON.parse(localStorage.getItem("user"));return`
<section id="events">
<div class="welcome-container">
${a?`<h3>Bienvenid@ ${a.name}</h3>`:"<h3>➡️ Registrate, por favor ⬅️</h3>"}
</div>
<ul id="events-container" class="flex-container"></ul>
</section>
`},S=()=>{document.querySelector("main").innerHTML=K();const t=window.location.pathname.split("/")[3];setTimeout(()=>{t&&R(t)},0),Y(),_(),G()},D=async(a,t)=>{const e=a||document.querySelector("#email").value,o=t||document.querySelector("#password").value;try{c("Login en marcha");const s=await f({method:"POST",url:"v1/users/login",body:{email:e,password:o}}),n=await s.json();if(!s.ok){l("Error en el login",n.message),c("close");return}const r=n.user;localStorage.setItem("user",JSON.stringify({id:r._id,token:n.token,name:r.nameUser,img:r.img,rol:r.rol})),N(),S(),l("Logueado con éxito")}catch(s){console.error("Error en la petición de login:",s.message)}},P=()=>{document.querySelectorAll("input").forEach(t=>{const e=document.querySelector(`label[for="${t.id}"]`),o=e.textContent.replace("✔️","").replace("❌","").trim();t.addEventListener("focus",()=>{e.style.color="#4a90e2",e.style.fontSize="1.1rem"}),t.addEventListener("blur",()=>{t.value===""?(e.textContent=o,e.style.color="#444",e.style.fontSize="1rem"):t.id==="email"?/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(t.value)?(e.textContent=`${o} ✔️`,e.style.color="#008f39"):(e.textContent=`${o} ❌`,e.style.color="#e74c3c"):(e.textContent=`${o} ✔️`,e.style.color="#008f39")})})},Q=()=>{const a=document.querySelector("#recover-modal"),t=a==null?void 0:a.querySelector(".recover-form"),e=document.querySelector("#emailrec");t==null||t.addEventListener("submit",async o=>{o.preventDefault();const s=e.value;if(!s.trim()){l("Introduce un correo válido");return}a.close();try{c("Te estamos enviando un correo...");const n=await fetch("http://localhost:3000/api/auth/forgot-password",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:s})}),r=await n.json();n.ok?(c("close"),b(),l("Correo de recuperación enviado!")):(c("close"),l("Algo pasa, email incorrecto o usuario no registrado",r.message))}catch(n){c("close"),l("❌ Error de conexión con el servidor",n.message)}})},V=()=>{const a=document.querySelector(".login");y({parentNode:a,id:"recover-modal"});const t=document.querySelector("#recover-modal");t.innerHTML=`
  <div class="modal-container">
    <form method="post" class="recover-form flex-container">
      <h2>Recuperar contraseña</h2>
      <label for="emailrec">Introduce tu correo:</label>
      <input type="email" id="emailrec" name="emailrec" placeholder="email">
    </form>
  </div>
  `;const e=document.querySelector(".recover-form");u({parentNode:e,text:"Recuperar contraseña",classNameType:"primary",className:"recover-btn"});const o=document.querySelector(".recover-btn");o.type="submit",o.addEventListener("click",()=>{Q()}),u({parentNode:e,text:"Cerrar",classNameType:"secondary",id:"close-dialog"});const s=document.querySelector("#recover-password"),n=document.querySelector("#recover-modal"),r=document.querySelector("#close-dialog");s==null||s.addEventListener("click",i=>{i.preventDefault(),n.showModal()}),r==null||r.addEventListener("click",i=>{i.preventDefault(),n.close()})},X=()=>`
<section class="login">
${localStorage.getItem("user")?"<h2>Ya estás Logueado</h2>":`<form>
  <label for="email">Email</label>
  <input type="email" placeholder="Email" id="email"/>

  <label for="password">Contraseña</label>
  <input type="password" placeholder="Contraseña" id="password"  />
  </form>
  `}
</section>
`,b=(a,t)=>{document.querySelector("main").innerHTML=X();const e=document.querySelector(".login > form");u({parentNode:e,text:"Login",classNameType:"primary",id:"loginbtn"}),u({parentNode:e,text:"¿Olvidaste tu contraseña?",classNameType:"secondary",id:"recover-password"}),V(),P();try{document.querySelector("#loginbtn").addEventListener("click",o=>{o.preventDefault(),D(a,t)})}catch{console.log("Estamos logueado")}},ee=()=>{const a=document.querySelector(".info-user");y({parentNode:a,id:"event-modal"});const t=document.querySelector("#event-modal");t.innerHTML=`
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
    </div>`;const e=document.querySelector("#event-form");u({parentNode:e,text:"Crear Evento",classNameType:"primary",id:"eventBtnGo"}),u({parentNode:e,text:"Cancelar",classNameType:"secondary",id:"close-event-modal"}),document.querySelector("#close-event-modal").addEventListener("click",()=>{document.querySelector("#event-form").reset(),t.close()});const s=document.querySelector("#event-description");s.addEventListener("input",()=>{s.style.height="auto",s.style.height=`${s.scrollHeight}px`})},te=()=>{const a=document.querySelector(".info-user");y({parentNode:a,id:"events-modal"});const t=document.querySelector("#events-modal");t.innerHTML=`
  <div class="modal-inner flex-container">
    <h2>Eventos Reservados</h2>
    <ul id="attending-events" class="flex-container"></ul>
  </div>`;const e=document.querySelector(".modal-inner");u({parentNode:e,text:"Salir",classNameType:"secondary",className:"close-events-btn"}),document.querySelector(".close-events-btn").addEventListener("click",()=>{t.close()})},oe=async()=>{const{id:a,token:t}=JSON.parse(localStorage.getItem("user"));try{c("Eliminando tu cuenta");const e=await f({method:"DELETE",url:`v1/users/${a}`,token:t}),o=await e.json();if(e.ok){c("close"),localStorage.removeItem("user"),document.querySelector("main").innerHTML="",S(),l(`Tu cuenta fue eliminada, ${user.name}`);return}else c("close"),l("No se pudo eliminar tu cuenta",o.message)}catch(e){c("close"),l("Error en la conexión a la red",e.message)}},ne=()=>{const a=document.querySelector(".info-user");y({parentNode:a,id:"delete-modal"});const t=document.querySelector("#delete-modal");t.innerHTML=`
  <div class="delete-modal-inner flex-container">
    <h2>Eliminar Cuenta</h2>
    <p>¿Desea eliminar su cuenta?</p>
  </div>
  `,y({parentNode:a,id:"confirm-delete-modal"});const e=document.querySelector("#confirm-delete-modal");e.innerHTML=`
  <div class="inner-confirm-delete-modal flex-container">
    <h2>¡ADVERTENCIA!</h2>
    <p>¿Estás a punto de eliminar tu cuenta?</p>
    <div class="btn-container flex-container"></div>
</div>
  `;const o=document.querySelector(".delete-modal-inner");u({parentNode:o,text:"Eliminar Cuenta",classNameType:"primary",className:"delete-account-btn"}),u({parentNode:o,text:"Salir",classNameType:"secondary",className:"close-delete-btn"});const s=document.querySelector(".delete-account-btn"),n=document.querySelector(".close-delete-btn");s.addEventListener("click",()=>{e.showModal()}),n.addEventListener("click",()=>{t.close()});const r=document.querySelector(".btn-container");u({parentNode:r,text:"Sí",classNameType:"secondary",className:"delete-yes-btn"}),u({parentNode:r,text:"No",classNameType:"primary",className:"delete-no-btn"});const i=document.querySelector(".delete-yes-btn"),m=document.querySelector(".delete-no-btn");i.addEventListener("click",()=>{oe()}),m.addEventListener("click",()=>{e.close(),t.close()})},ae=async()=>{const a=document.querySelector("#mod-username"),t=document.querySelector("#mod-email"),e=document.querySelector("#mod-password"),o=document.querySelector(".label-re-pass"),s=document.querySelector("#mod-repeat-password");if(e.value!==s.value)o.style.color="red",l("Las contraseñas no coinciden");else{const{id:n,token:r}=JSON.parse(localStorage.getItem("user")),i={};a.value.trim()&&(i.nameUser=a.value.trim()),t.value.trim()&&(i.email=t.value.trim()),e.value.trim()&&(i.password=e.value.trim());try{const m=await f({method:"PUT",url:`v1/users/${n}`,token:r,body:i}),d=await m.json();if(m.ok){const p={...JSON.parse(localStorage.getItem("user")),...i};localStorage.setItem("user",JSON.stringify(p)),L(),l("Perfil Actualizado")}else l("Error al actualizar el Perfil",d.message)}catch(m){l("Error en la Conexión",m.message)}}},se=()=>{const a=document.querySelector(".info-user");y({parentNode:a,id:"mod-profile-modal"});const t=document.querySelector("#mod-profile-modal");t.innerHTML=`
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
  </div>`;const e=document.querySelector("#mod-profile");u({parentNode:e,text:"Modificar",classNameType:"primary",className:"mod-profile-btn"}),u({parentNode:e,text:"Salir",classNameType:"secondary",className:"close-mod-profile-btn"});const o=document.querySelector(".mod-profile-btn"),s=document.querySelector(".close-mod-profile-btn");o.addEventListener("click",()=>{ae()}),s.addEventListener("click",()=>{e.reset(),t.close()})},re=()=>{const a=document.querySelector(".profileImgInput"),t=document.querySelector("#makeChangeImg"),e=document.querySelector("#changeImg-modal");a||console.log("No se encontró el input de la imagen"),t==null||t.addEventListener("click",async()=>{const o=a.files[0];if(!o){l("Selecciona una imagen");return}e.close(),c("Cambiando imagen");const s=new FormData;s.append("img",o);const{id:n,token:r}=JSON.parse(localStorage.getItem("user"));try{(await f({method:"PUT",url:`v1/users/${n}`,token:r,formData:s})).ok||l("Error al subir la imagen"),L(),l("Tu imagen se ha actualizado")}catch{l("Hubo un error para cambiar la imagen")}})},ce=()=>{const a=document.querySelector("#profile");y({parentNode:a,id:"changeImg-modal"});const t=document.querySelector("#changeImg-modal");t.innerHTML=`
  <form id="changeImg-form" class="flex-container" method="dialog">
    <h2>Cambio de Imagen</h2>
    <input
      type="file"
      class="profileImgInput"
      accept="image/*" />
  </form>
  `;const e=document.querySelector("#changeImg-form"),o=document.querySelector(".div-img");u({parentNode:o,text:"Cambiar Imagen",classNameType:"primary",className:"change-img"}),document.querySelector(".change-img").addEventListener("click",()=>{t.showModal()}),u({parentNode:e,text:"Haz el cambio",classNameType:"primary",id:"makeChangeImg"}),re(),u({parentNode:e,text:"Cancelar",classNameType:"secondary",id:"close-changeImg"});const s=document.querySelector("#close-changeImg");s==null||s.addEventListener("click",n=>{n.preventDefault(),t.close()})},le=async()=>{const{id:a,token:t}=JSON.parse(localStorage.getItem("user"));try{c("Cargando tu perfil");const e=await f({method:"GET",url:`v1/users/${a}`,token:t}),o=await e.json();if(e.ok){c("close");const s=document.querySelector(".nameUser"),n=document.querySelector(".emailUser"),r=document.querySelector(".user-img");r.src=o.img,s.textContent=o.nameUser,n.textContent=o.email}else c("close"),l("No se pudo cargar tu perfil",o.message)}catch(e){c("close"),l("Error en la conexión,",e.message)}},ie=async()=>{const{token:a}=JSON.parse(localStorage.getItem("user"));try{c("Cargando a los malotes");const t=await f({method:"GET",url:"v1/users",token:a}),e=await t.json();if(t.ok)return c("close"),e;c("close"),l("Hubo un error en la búsqueda",e.message)}catch(t){c("close"),l("Hubo un error en la conexión",t.message)}},de=async a=>{const{token:t}=JSON.parse(localStorage.getItem("user"));try{c("Eliminando al usuario...");const e=await f({method:"DELETE",url:`v1/users/${a}`,token:t}),o=e.json();e.ok?(c("close"),L(),l("Usuario eliminado con éxito")):(c("close"),l("Error en la eliminación del usuario",o.message))}catch(e){c("close"),l("Error en la conexión",e.message)}},me=async()=>{const a=document.querySelector(".info-user");y({parentNode:a,id:"delete-user-modal"});const t=document.querySelector("#delete-user-modal");t.innerHTML=`
  <div class="modal-inner">
  <form id="user-delete-form" class="flex-container">
    <h2>Eliminar Usuarios</h2>
    <label for="users-select">Selecciona al usuario que quieres eliminar</label>
    <select name="select" id="users-select">
    <option value="" selected disabled>Selecciona un usuario</option>
    </select>
    </form>
  </div>`;const e=await ie(),o=document.querySelector("#users-select");e.forEach(p=>{if(p.rol!=="admin"){const v=document.createElement("option");v.value=p._id,v.textContent=p.nameUser,o.appendChild(v)}});const s=document.querySelector("#user-delete-form");u({parentNode:s,text:"Salir",classNameType:"secondary",id:"close-user-delete-modal-btn"}),document.querySelector("#close-user-delete-modal-btn").addEventListener("click",()=>{t.close()}),y({parentNode:a,id:"confirm-del-user-modal"});const r=document.querySelector("#confirm-del-user-modal");r.innerHTML=`
  <div class="modal-inner">
  <h2>¿Deseas eliminar a este Usuario?</h2>
  <p class="user-to-del"></p>
  </div>
  <div class="btn-container-admin flex-container">
  </div>
  `,o.addEventListener("change",p=>{const v=p.target.options[p.target.selectedIndex];r.dataset.value=v.value;const g=document.querySelector(".user-to-del");g.textContent=`🤝 ${v.textContent}`,r.showModal()});const i=document.querySelector(".btn-container-admin");u({parentNode:i,text:"Sí",classNameType:"primary",className:"confirm-yes-del-user-btn"}),document.querySelector(".confirm-yes-del-user-btn").addEventListener("click",()=>{de(r.dataset.value),r.close(),t.close()}),u({parentNode:i,text:"No",classNameType:"secondary",className:"confirm-no-del-user-btn"}),document.querySelector(".confirm-no-del-user-btn").addEventListener("click",()=>{r.close(),t.close()}),t.showModal()},ue=async()=>{const{id:a,token:t}=JSON.parse(localStorage.getItem("user"));try{c("Cargando tus próximos eventos");const e=await f({method:"GET",url:`v1/events/user/${a}`,token:t}),o=await e.json();if(e.ok){const s=document.querySelector("#attending-events");s.innerHTML="";for(const n of o){const r=n.date,m=new Date(r).toLocaleDateString("es-Es",{day:"2-digit",month:"2-digit",year:"numeric"}),d=document.createElement("li");d.classList.add("li-event-user","flex-container");const p=document.createElement("h2");p.textContent=n.title;const v=document.createElement("div");v.classList.add("info-event-resume","flex-container");const g=document.createElement("p");g.textContent=m;const h=document.createElement("p");h.textContent=n.location,v.appendChild(g),v.appendChild(h),d.appendChild(p),d.appendChild(v),s.appendChild(d)}c("close")}else c("close"),l("Hubo un error en tu lista de eventos")}catch(e){c("close"),l("Error en la petición de eventos reservados:",e.message)}};let I=!1;const pe=async()=>{const a=document.querySelector("#eventBtnGo");I||(I=!0,a.addEventListener("click",async()=>{const t=document.querySelector("#event-modal"),e=document.querySelector("#event-title"),o=document.querySelector("#eventImgInput"),s=document.querySelector("#event-date"),n=document.querySelector("#event-location"),r=document.querySelector("#event-description"),i=o.files[0];if(!i){l("Selecciona una imagen");return}t.close();const m=new FormData;m.append("title",e.value),m.append("img",i),m.append("date",s.value),m.append("location",n.value),m.append("description",r.value);try{c("Creando nuevo Evento");const{token:d}=JSON.parse(localStorage.getItem("user")),p=await f({method:"POST",url:"v1/events",token:d,formData:m}),v=await p.json();p.ok?(c("close"),S(),l("Evento Creado con éxito")):(c("close"),l("Error al publicar el nuevo Evento:",v.message))}catch(d){c("close"),l("Error en la conexión:",d.message)}}))},ve=()=>{const a=document.querySelector(".delete-user");a&&a.addEventListener("click",()=>{me()}),document.querySelectorAll(".ul-tasks li").forEach(e=>{const o=e.classList[0];e.addEventListener("click",()=>{switch(o){case"create-event":const s=document.querySelector("#event-modal");pe(),s.showModal();break;case"attending-events":document.querySelector("#events-modal").showModal(),ue();break;case"modify-profile":document.querySelector("#mod-profile-modal").showModal();break;case"delete-account":document.querySelector("#delete-modal").showModal();break}})}),c("close")},fe=()=>`
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
    </section>`}`,L=()=>{document.querySelector("main").innerHTML=fe(),c("Cargando tu perfil"),le(),ce(),ee(),te(),se(),ne(),ve()},ge=async()=>{const a=document.querySelector("#username").value,t=document.querySelector("#email").value,e=document.querySelector("#password").value,o=document.querySelector("#userimg").files[0];if([a,t,e].some(r=>!r.trim())){l("Faltan datos para registrarte");return}const n=new FormData;n.append("nameUser",a),n.append("email",t),n.append("password",e),o&&n.append("img",o);try{c("Creando tu Cuenta");const r=await f({method:"POST",url:"v1/users/register",formData:n}),i=await r.json();if(r.ok){D(t,e);return}else c("close"),l("Error al registrar:",i.message)}catch(r){c("close"),l("No se pudo conectar al servidor",r.message)}},ye=()=>`
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
`,he=()=>{document.querySelector("main").innerHTML=ye();const a=document.querySelector(".register > form");u({parentNode:a,text:"Crear cuenta",classNameType:"primary",id:"registerbtn"}),P(),document.querySelector("#registerbtn").addEventListener("click",t=>{t.preventDefault(),ge()})},N=()=>{var o,s,n,r,i;const a=document.querySelector(".div-nav");let t=document.querySelector(".navBar");t||(t=document.createElement("nav"),t.classList.add("navBar","flex-container"),a.appendChild(t));let e=t.querySelector("ul");e||(e=document.createElement("ul"),e.classList.add("ul-navBar","flex-container"),t.appendChild(e)),e.innerHTML=`
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
`,(o=t.querySelector("#eventsLink"))==null||o.addEventListener("click",()=>S()),(s=t.querySelector("#registerLink"))==null||s.addEventListener("click",()=>he()),(n=t.querySelector("#loginLink"))==null||n.addEventListener("click",()=>{b()}),(r=t.querySelector("#profileLink"))==null||r.addEventListener("click",()=>{L()}),(i=document.querySelector("#logoutLink"))==null||i.addEventListener("click",()=>{localStorage.removeItem("user"),document.querySelector("main").innerHTML="",b(),N(),l("Hasta pronto 🫶!",5e3)})},Se=a=>{const t=document.createElement("div");t.classList.add("toggle-container");const e=document.createElement("div");e.classList.add("sun-moon"),t.appendChild(e),a.appendChild(t),document.querySelector(".toggle-container").addEventListener("click",()=>{const s=document.querySelector("body");s.classList.toggle("night");const n=document.querySelector(".img-logo");s.classList.contains("night")?n.src="src/assets/darkLogo.png":n.src="src/assets/lightLogo.png"})},E=document.querySelector("#app");E.className="flex-container";const x=document.createElement("header");x.classList.add("header","flex-container");const w=document.createElement("div");w.classList.add("div-logo","flex-container");const q=document.createElement("img");q.className="img-logo";q.src="src/assets/darkLogo.png";q.addEventListener("click",()=>S());const C=document.createElement("div");C.classList.add("div-nav","flex-container");const T=document.createElement("h1");T.textContent="Organizador de Eventos";T.classList.add("main-title","flex-container");const O=document.createElement("main");O.classList.add("main","flex-container");const H=document.createElement("footer");H.classList.add("footer","flex-container");w.appendChild(q);C.appendChild(T);x.appendChild(w);x.appendChild(C);Se(E);E.appendChild(x);E.appendChild(O);E.appendChild(H);document.body.appendChild(E);N();S();
